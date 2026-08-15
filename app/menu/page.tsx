import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu",
  description: "Explore dosas, idli, vada, uttapam, thalis, rice, snacks, beverages and desserts at Karnataka Cafe Patna.",
};

export default function MenuPage() {
  return (
    <main id="main-content" className="page-enter">
      <PageHero
        eyebrow="Fresh from our kitchen"
        title="Made fresh."
        italic="Served generously."
        description="From golden dosas to complete thalis and filter coffee—find your comfort food, then tap any plate for a closer look."
        image="/images/thali.jpg"
        crumb="Menu"
      />
      <MenuClient />
    </main>
  );
}
