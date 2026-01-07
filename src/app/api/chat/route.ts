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

  const SYSTEM_PROMT = `You are an expert SQL agent that helps users to query their database using natural language.

  ${new Date().toLocaleString('sv-SE')}


  You have access to following tools:
 
  1. db tool - call this tool to query the database.
  2. schema tool - call this tool to get the database schema which will help you to write sql query.

  Rules:
  -generate only SELECT queries (no INSERT,UPDATE,DELETE,DROP)
  - Pass in valid SQL syntax in db tool.
  - Important : To query database call db tool, Don't return just SQL query.
  - Can't return direct query , just give me short answer.

  Always respond in a helpful, conversational tone while being technically accurate.
  `;

  const result = streamText({
    model: openai("gpt-4o"),
    messages: await convertToModelMessages(messages),
    system: SYSTEM_PROMT,
    stopWhen: stepCountIs(5),
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
