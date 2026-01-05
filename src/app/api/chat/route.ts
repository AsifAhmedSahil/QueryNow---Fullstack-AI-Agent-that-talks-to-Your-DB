import { streamText, UIMessage, convertToModelMessages, tool } from 'ai';
import { openai } from "@ai-sdk/openai";
import z from 'zod';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const SYSTEM_PROMT= `You are an expert SQL agent that helps users to query their database using natural language.
  You have access to following tools:
 
  1. db tool - call this tool to query the database.

  Rules:
  -generate only SELECT queries (no INSERT,UPDATE,DELETE,DROP)
  - return valid SQLite systax

  Always respond in a helpful, conversational tone while being technically accurate.
  `

  const result = streamText({
    model: openai("gpt-4o"),
    messages: await convertToModelMessages(messages),
    system:SYSTEM_PROMT,
    tools: {
      db: tool({
        description: 'call this tool to query a database',
        inputSchema: z.object({
          query: z.string().describe('The SQL query to be ran'),
        }),
        execute: async ({ query }) => {
          console.log("Query",query)

          return ""
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}