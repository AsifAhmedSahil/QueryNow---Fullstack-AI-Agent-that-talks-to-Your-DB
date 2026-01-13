// app/chat/page.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

type AIInput = {
  query: string;
};

type AIOutputput = {
  rows: string[];
};

export default function ChatPage() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap mb-4">
          <div className="font-bold mb-2">
            {message.role === 'user' ? '💁🏻' : '🤖'}
          </div>

          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={i}>{part.text}</div>;

              case 'tool-db':
                return (
                  <div key={i} className="p-3 my-2 bg-blue-50 rounded">
                    <pre className="text-xs">{(part.input as AIInput).query}</pre>
                    {part.state === 'output-available' && (
                      <div className="text-sm">
                        Returned {(part.output as AIOutputput).rows.length} rows
                      </div>
                    )}
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your database..."
        />
      </form>
    </div>
  );
}
