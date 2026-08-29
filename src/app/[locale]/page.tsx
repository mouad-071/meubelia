import { Hero } from "@/components/home/Hero";
import { Collection } from "@/components/home/Collection";
import { BestSellers } from "@/components/home/BestSellers";
import { Sustainability } from "@/components/home/Sustainability";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Collection />
      <BestSellers />
      <Sustainability />
    </>
  );
}
