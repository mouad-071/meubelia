import { Hero } from "@/components/home/Hero";
import { Collection } from "@/components/home/Collection";
import { BestSellers } from "@/components/home/BestSellers";
import { Sustainability } from "@/components/home/Sustainability";
import { WelcomeDialog } from "@/components/home/WelcomeDialog";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Collection />
        <BestSellers />
        <Sustainability />
      </main>
      <Footer />
      <WelcomeDialog />
    </>
  );
}
