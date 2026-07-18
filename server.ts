import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { createServer as createViteServer } from "vite";
import { askStadiumAssistant } from "./server/ai";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." }
});

export async function createApp(disableVite = false) {
  const app = express();

  // Security Middlewares
  app.use(helmet({
    contentSecurityPolicy: false, // Keep disabled to allow seamless integration with the AI Studio iframe preview
  }));
  app.use(cors());
  app.use(express.json());

  // Error handler for invalid JSON payloads
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && "status" in err && err.status === 400 && "body" in err) {
      res.status(400).json({ error: "Invalid JSON payload" });
      return;
    }
    next(err);
  });

  // Health API
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Tabs API
  app.get("/api/tabs", (req: Request, res: Response) => {
    res.json({
      tabs: [
        { id: "home", label: "Home", icon: "MapPin", active: true },
        { id: "chat", label: "AI Chat", icon: "Bot", active: true },
        { id: "dashboard", label: "Dashboard", icon: "Activity", active: true },
        { id: "faq", label: "FAQ", icon: "HelpCircle", active: true },
        { id: "ai-insights", label: "AI Insights", icon: "Sparkles", active: true }
      ]
    });
  });

  // Chat API
  app.post("/api/chat", limiter, async (req: Request, res: Response): Promise<void> => {
    try {
      const { message } = req.body;

      if (typeof message !== "string" || message.trim() === "") {
        res.status(400).json({ error: "Message must be a non-empty string" });
        return;
      }

      const reply = await askStadiumAssistant(message);
      res.json({ reply });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite Integration
  if (!disableVite) {
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  }

  return app;
}

async function startServer() {
  // If we are in testing mode, let the test suite control the lifecycle
  if (process.env.NODE_ENV === "test") {
    return;
  }
  const PORT = 3000;
  const app = await createApp();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
