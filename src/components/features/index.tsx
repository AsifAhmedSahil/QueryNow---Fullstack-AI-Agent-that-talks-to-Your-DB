import { Database, ShieldCheck, Zap } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section id="features" className="pt-10 pb-32 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl text-white mb-6">Built for real data</h2>
      <p className="text-zinc-500 max-w-xl mb-20">
        QueryNow never guesses. Every response is generated directly from your database.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 border border-white/5 rounded-3xl">
          <Database className="mb-4 text-zinc-300" />
          <h3 className="text-white mb-2">Natural language to SQL</h3>
          <p className="text-zinc-400 text-sm">
            Ask questions in plain English. QueryNow converts them into safe SQL queries.
          </p>
        </div>

        <div className="p-8 border border-white/5 rounded-3xl">
          <ShieldCheck className="mb-4 text-zinc-300" />
          <h3 className="text-white mb-2">Safe by design</h3>
          <p className="text-zinc-400 text-sm">
            Read-only queries only. No INSERT, UPDATE, DELETE — guaranteed.
          </p>
        </div>

        <div className="p-8 border border-white/5 rounded-3xl">
          <Zap className="mb-4 text-zinc-300" />
          <h3 className="text-white mb-2">Live database access</h3>
          <p className="text-zinc-400 text-sm">
            Always fresh data from your production or analytics database.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
