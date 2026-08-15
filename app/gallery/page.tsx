import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description: "See the food, coffee and warm dining experience at Karnataka Cafe Patna.",
};

export default function GalleryPage() {
  return (
    <main id="main-content" className="page-enter">
      <PageHero
        eyebrow="Food looks this good"
        title="A feast for"
        italic="more than taste."
        description="A glimpse of mornings at the tawa, colourful tables, quiet coffee breaks and the warm room that holds it all."
        image="/images/dosa.jpg"
        crumb="Gallery"
      />
      <GalleryClient />
      <section className="gallery-social">
        <div className="site-container reveal"><span className="eyebrow eyebrow-light">Share your table</span><h2>Tag your Karnataka Cafe moment.</h2><p>From the first coffee pour to the last bite of dosa—we love seeing the meal through your eyes.</p><a className="button button-light" href="https://www.instagram.com/" target="_blank" rel="noreferrer">Follow on Instagram ↗</a></div>
      </section>
    </main>
  );
}
