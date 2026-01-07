import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
import { openai } from "@ai-sdk/openai";
import z from "zod";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
const SYSTEM_PROMPT = `
You are a SQL query agent.

Database tables:
- products(id, name, category, price, stock, created_at)
- sales(id, product_id, quantity, total_amount, sale_date, customer_name, region)

Rules:
- Generate only SELECT queries
- Never use INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE
- Always use the db tool to execute queries
- Never return raw SQL to the user
- Give short, clear answers only

Query behavior:
- Always perform case-insensitive matching for text fields
- Use ILIKE or LOWER() when filtering by name, category, or region
- Prefer partial matching using ILIKE '%value%' for product names
- If an exact match returns no rows, retry once using partial match

Safety:
- Do not guess or fabricate data
- If no data is found, clearly say so

Style:
- Be precise and deterministic
- Do not add explanations or extra commentary
`;


  const result = streamText({
    model: openai("gpt-4o-mini"), // model ta sosta 4o theke
    maxOutputTokens:300, // cost kom hoi aita dile
      temperature: 0, // un necessary kichu blbe na, 
    messages: await convertToModelMessages(messages),
    system: SYSTEM_PROMPT,
    stopWhen: stepCountIs(3),
    tools: {
      schema: tool({
        description: "call this tool to get database schema information",
        inputSchema: z.object({}),
        execute: async () => {
          return `
          CREATE TABLE products (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
)

CREATE TABLE sales (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"total_amount" numeric(12, 2) NOT NULL,
	"sale_date" timestamp DEFAULT now(),
	"customer_name" text NOT NULL,
	"region" text NOT NULL
)
          `;
        },
      }),
      db: tool({
        description: "call this tool to query a database",
        inputSchema: z.object({
          query: z.string().describe("The SQL query to be ran"),
        }),
        execute: async ({ query }) => {
          console.log("Query", query);

          // Safety check: allow only SELECT queries - Guardrails
          const forbidden = /(insert|update|delete|drop|alter|truncate)/i;
          if (forbidden.test(query)) throw new Error("Unsafe query blocked");

          // make db call
          return await db.execute(query);
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
