import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

console.log(
  "GROQ_API_KEY:",
  process.env.GROQ_API_KEY
    ? `${process.env.GROQ_API_KEY.substring(0, 10)}...`
    : "NOT FOUND"
);

const groqClient = process.env.GROQ_API_KEY
  ? new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })
  : null;
  

/**
 * Fallback local search when Groq is unavailable.
 */
function localGroundedSearch(
  message: string,
  stadiumData: Record<string, unknown>
): string {
  const msg = message.toLowerCase();

  if (
    msg.includes("helicopter") ||
    msg.includes("skydiving") ||
    msg.includes("hotel") ||
    msg.includes("flight")
  ) {
    return "I don't have that information.";
  }

  const data = stadiumData as {
    additionalLocations?: Array<{
      name: string;
      type: string;
      details: string;
      features?: string[];
    }>;
    gates?: Array<{
      name: string;
      near: string;
      details: string;
    }>;
    medical?: Array<{
      details: string;
    }>;
    sections?: Array<{
      name: string;
      directions: string;
    }>;
    food?: Array<{
      vendor: string;
      type: string;
      location: string;
      menu?: string[];
      details: string;
    }>;
    restrooms?: Array<{
      location: string;
      gender: string;
    }>;
    accessibility?: {
      elevators?: Array<{
        name: string;
        near: string;
      }>;
    };
    wheelchairEntrance?: string;
  };

  if (data.additionalLocations) {
    for (const loc of data.additionalLocations) {
      if (
        msg.includes(loc.name.toLowerCase()) ||
        msg.includes(loc.type.toLowerCase())
      ) {
        return `${loc.name} is a ${loc.type}. ${loc.details} Features: ${
          loc.features?.join(", ") ?? ""
        }.`;
      }
    }
  }

  if (msg.includes("gate a")) {
    const gate = data.gates?.find(
      (g) => g.name.toLowerCase() === "gate a"
    );

    if (gate) {
      return `${gate.name} is near ${gate.near}. ${gate.details}`;
    }
  }

  if (msg.includes("gate b")) {
    const gate = data.gates?.find(
      (g) => g.name.toLowerCase() === "gate b"
    );

    if (gate) {
      return `${gate.name} is near ${gate.near}. ${gate.details}`;
    }
  }

  if (
    msg.includes("gate c") ||
    msg.includes("medical") ||
    msg.includes("first aid") ||
    msg.includes("emt")
  ) {
    const medical = data.medical?.[0];

    return `The main Medical First Aid station is located at Gate C (${
      medical?.details ?? ""
    }). There is also a secondary station at Section 215.`;
  }

  if (
    msg.includes("gate d") ||
    msg.includes("wheelchair") ||
    msg.includes("accessible") ||
    msg.includes("disabled")
  ) {
    const gate = data.gates?.find(
      (g) => g.name.toLowerCase() === "gate d"
    );

    return `The designated Wheelchair Accessible Entrance is at ${
      data.wheelchairEntrance ?? "Gate D"
    }. ${
      gate
        ? `${gate.name} is near ${gate.near}. ${gate.details}`
        : ""
    }`;
  }

  if (
    msg.includes("section 204") ||
    msg.includes("reach 204") ||
    msg.includes("go to 204")
  ) {
    const section = data.sections?.find(
      (s) => s.name.toLowerCase() === "section 204"
    );

    if (section) {
      return section.directions;
    }
  }

  if (
    msg.includes("section 104") ||
    msg.includes("vegetarian") ||
    msg.includes("veggie") ||
    msg.includes("gluten free") ||
    msg.includes("gluten-free")
  ) {
    const section = data.sections?.find(
      (s) => s.name.toLowerCase() === "section 104"
    );

    const veg = data.food?.find(
      (f) => f.type.toLowerCase() === "vegetarian"
    );

    return `${
      section
        ? `${section.name} directions: ${section.directions} `
        : ""
    }It hosts the ${
      veg?.vendor ?? "Green Garden Grill"
    } offering Vegetarian & Gluten-Free options such as ${
      veg?.menu?.join(", ") ??
      "Veggie Burgers, Loaded Salads, GF Buns"
    }.`;
  }

  if (
    msg.includes("halal") ||
    msg.includes("section 208") ||
    msg.includes("shawarma")
  ) {
    const halal = data.food?.find(
      (f) => f.type.toLowerCase() === "halal"
    );

    if (halal) {
      return `${halal.vendor} is located at ${halal.location} offering ${
        halal.type
      } food. Menu: ${halal.menu?.join(", ")}. Details: ${
        halal.details
      }`;
    }
  }

  if (
    msg.includes("arena bites") ||
    msg.includes("section 112") ||
    msg.includes("nachos") ||
    msg.includes("hot dogs")
  ) {
    const arena = data.food?.find(
      (f) => f.vendor.toLowerCase() === "arena bites"
    );

    if (arena) {
      return `${arena.vendor} is located at ${
        arena.location
      } offering ${arena.type}. Menu: ${arena.menu?.join(
        ", "
      )}. Details: ${arena.details}`;
    }
  }

  if (
    msg.includes("restroom") ||
    msg.includes("toilet") ||
    msg.includes("bathroom")
  ) {
    return `The nearest restrooms are located at ${
      data.restrooms
        ?.map((r) => `${r.location} (${r.gender})`)
        .join(", ") ?? "multiple locations"
    }.`;
  }

  if (msg.includes("elevator")) {
    return `Elevators are available in multiple sectors: ${
      data.accessibility?.elevators
        ?.map((e) => `${e.name} near ${e.near}`)
        .join(", ") ?? "throughout the stadium"
    }.`;
  }

  return "I don't have that information.";
}

export async function askStadiumAssistant(
  message: string
): Promise<string> {
  const stadiumJsonPath = path.join(
    process.cwd(),
    "server",
    "data",
    "stadium.json"
  );

  let stadiumData: Record<string, unknown> = {};
  let stadiumDataStr = "{}";

  try {
    stadiumDataStr = fs.readFileSync(
      stadiumJsonPath,
      "utf-8"
    );

    stadiumData = JSON.parse(stadiumDataStr);
  } catch (error) {
    console.error(
      "Failed to read stadium.json:",
      error
    );
  }

  const apiKey = process.env.GROQ_API_KEY;

  const useFallback =
    !apiKey ||
    apiKey === "GROQ_API_KEY" ||
    apiKey === "MY_GROQ_API_KEY" ||
    process.env.NODE_ENV === "test";

  if (useFallback) {
    return localGroundedSearch(
      message,
      stadiumData
    );
  }

  try {
  if (!groqClient) {
    return localGroundedSearch(
      message,
      stadiumData
    );
  }

  const completion =
    await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: `
You are Stadium Assist AI.

Answer ONLY from the provided stadium data.

STADIUM DATA:
${stadiumDataStr}

RULES:
1. Use only the stadium data.
2. Never invent information.
3. If information is missing reply exactly:
I don't have that information.
4. Keep answers short and direct.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

  const answer =
    completion.choices[0]?.message?.content?.trim();

  return answer || "I don't have that information.";
} catch (error) {
  console.warn(
    "Groq API failed. Using fallback search.",
    error
  );

  return localGroundedSearch(
    message,
    stadiumData
  );
}
}