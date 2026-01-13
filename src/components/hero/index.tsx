import { ArrowRight, Send, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-xs text-zinc-300">QueryNow v1.0 is live</span>
        </div>

        <h1 className=" sm:text-8xl font-medium tracking-tight text-white mb-8">
          Ask your database,
          <br />
          <span className="text-zinc-500 sm:text-6xl ">Get answers instantly.</span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 font-light mb-10 max-w-2xl mx-auto">
          QueryNow lets you chat with your database using plain English. No SQL,
          no dashboards — just real answers from real data.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <Link href="/chat">
            <button className="h-11 px-8 rounded-full bg-white text-black cursor-pointer">
              Start querying for free
            </button>
          </Link>

          <button className="h-11 px-8 rounded-full border border-white/20 text-zinc-300 text-sm">
            View live demo
          </button>
        </div>
      </div>

      {/* Demo Chat */}
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl p-2 bg-[#0a0a0a] ring-1 ring-white/10">
          <div className="flex flex-col h-[520px] bg-[#0a0a0e] rounded-xl">
            <div className="h-14 border-b border-white/5 flex items-center px-6 bg-[#0E0E12] gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className=" text-sm text-zinc-300">QueryNow AI</span>
            </div>

            <div className="flex-1 p-6 space-y-6 bg-zinc-950/30">
              <div className="flex gap-3 max-w-[85%]">
                 <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <Image
                    src="https://res.cloudinary.com/djbpo9xg5/image/upload/v1725030217/qnheigwgqbwldduangmo.jpg"
                    alt="Support agent"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>

                
                <div className="p-4 bg-white text-black rounded-2xl">
                  Hi! Ask me anything about your database.
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex gap-3 flex-row-reverse max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <User className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="p-4 bg-zinc-800 text-zinc-200 rounded-2xl">
                    Show me total sales for last 30 days
                  </div>
                </div>
              </div>

              <div className="flex gap-3 max-w-[85%]">
                 <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <Image
                    src="https://res.cloudinary.com/djbpo9xg5/image/upload/v1725030217/qnheigwgqbwldduangmo.jpg"
                    alt="Support agent"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 bg-white text-black rounded-2xl">
                  Your total sales in the last 30 days are $124,560 across 1,284
                  orders.
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/5">
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm"
                  placeholder="Ask your database..."
                />
                <button className="w-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <Send className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
