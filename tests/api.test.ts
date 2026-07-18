import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import { Server } from "http";
import { createApp } from "../server";

describe("Stadium Assist AI API Tests", () => {
  let server: Server;
  let baseUrl: string;

  before(async () => {
    // Force NODE_ENV to test to prevent server.ts from starting its own listener
    process.env.NODE_ENV = "test";
    
    // Create the Express app without Vite for extremely fast tests
    const app = await createApp(true);
    
    return new Promise<void>((resolve) => {
      server = app.listen(0, "127.0.0.1", () => {
        const address = server.address();
        if (address && typeof address !== "string") {
          baseUrl = `http://127.0.0.1:${address.port}`;
        }
        resolve();
      });
    });
  });

  after(() => {
    if (server) {
      server.close();
    }
  });

  test("Health endpoint works (GET /api/health)", async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.strictEqual(res.status, 200);
    const body = await res.json() as any;
    assert.strictEqual(body.status, "healthy");
    assert.ok(body.timestamp);
  });

  test("Chat endpoint returns 200 and correctly grounds answers", async () => {
    const res = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Where is Gate A?" })
    });
    assert.strictEqual(res.status, 200);
    const body = await res.json() as any;
    assert.ok(body.reply);
    // Should ground correctly to Parking P1
    assert.match(body.reply, /Gate A|Parking/i);
  });

  test("Empty prompt returns 400", async () => {
    const res = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "" })
    });
    assert.strictEqual(res.status, 400);
    const body = await res.json() as any;
    assert.strictEqual(body.error, "Message must be a non-empty string");
  });

  test("Missing prompt returns 400", async () => {
    const res = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    assert.strictEqual(res.status, 400);
    const body = await res.json() as any;
    assert.strictEqual(body.error, "Message must be a non-empty string");
  });

  test("Unknown query is handled and does not hallucinate", async () => {
    const res = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Can I buy a helicopter ride from Gate D?" })
    });
    assert.strictEqual(res.status, 200);
    const body = await res.json() as any;
    // Strictly adheres to standard reply
    assert.strictEqual(body.reply, "I don't have that information.");
  });

  test("Invalid JSON payload is handled gracefully", async () => {
    const res = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{malformed-json-payload"
    });
    assert.strictEqual(res.status, 400);
    const body = await res.json() as any;
    assert.strictEqual(body.error, "Invalid JSON payload");
  });

  test("Tabs endpoint returns 200 and matches the 5-tab schema (GET /api/tabs)", async () => {
    const res = await fetch(`${baseUrl}/api/tabs`);
    assert.strictEqual(res.status, 200);
    const body = await res.json() as any;
    assert.ok(body.tabs);
    assert.strictEqual(body.tabs.length, 5);

    const expectedTabs = ["home", "chat", "dashboard", "faq", "ai-insights"];
    body.tabs.forEach((tab: any, idx: number) => {
      assert.strictEqual(tab.id, expectedTabs[idx]);
      assert.ok(tab.label);
      assert.ok(tab.icon);
      assert.strictEqual(tab.active, true);
    });
  });
});
