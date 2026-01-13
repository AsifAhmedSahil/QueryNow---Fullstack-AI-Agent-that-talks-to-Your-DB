// app/page.tsx

import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Integration from "@/components/integration";
import Navbar from "@/components/nav";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <Hero />
      {/* <SocialProof /> */}
      <Features />
      <Integration />
      <Pricing />
      <Footer />
    </div>
  );
}
