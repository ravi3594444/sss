import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Authentic South Indian Dining",
};

const signatures = [
  { name: "Mysore Masala Dosa", note: "Crisp, fiery, unforgettable", price: "₹130", image: "/images/dosa.jpg", className: "signature-wide" },
  { name: "Idli & Vada", note: "Cloud-soft with a golden crunch", price: "₹120", image: "/images/idli.jpg", className: "" },
  { name: "KC Deluxe Thali", note: "A generous taste of the South", price: "₹280", image: "/images/thali.jpg", className: "" },
];

export default function Home() {
  return (
    <main id="main-content" className="page-enter">
      <section className="home-hero">
        <div className="hero-blob blob-one" /><div className="hero-blob blob-two" />
        <div className="hero-grain" />
        <div className="site-container home-hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">South India · Now serving Patna</span>
            <h1>Flavours that<br /><em>feel like home.</em></h1>
            <p>Golden dosas, cloud-soft idlis and filter coffee with a proper froth—fresh from our kitchen to your table in Saguna.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/menu">Explore the menu <span>↗</span></Link>
              <Link className="text-link" href="/visit">Plan your visit <span>→</span></Link>
            </div>
            <div className="hero-proof">
              <div><strong>4.8</strong><span>Guest rating</span></div>
              <div><strong>100%</strong><span>Vegetarian</span></div>
              <div><strong>7 days</strong><span>Open weekly</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-main"><img src="/images/hero.jpg" alt="A fresh South Indian meal served at Karnataka Cafe" data-parallax="" /></div>
            <div className="hero-image-small"><img src="/images/dosa.jpg" alt="Crisp masala dosa" /><span>Made fresh<br /><b>all day</b></span></div>
            <div className="coffee-badge"><span>Filter</span><strong>Coffee</strong><small>always brewing</small></div>
            <div className="steam steam-one" /><div className="steam steam-two" /><div className="steam steam-three" />
          </div>
        </div>
        <div className="hero-scroll"><span /> Scroll to taste</div>
      </section>

      <section className="moving-taste" aria-label="Restaurant highlights">
        <div className="moving-track">
          <span>CRISP DOSAS</span><i>✦</i><span>FRESH CHUTNEYS</span><i>✦</i><span>FILTER COFFEE</span><i>✦</i><span>PURE VEGETARIAN</span><i>✦</i>
          <span>CRISP DOSAS</span><i>✦</i><span>FRESH CHUTNEYS</span><i>✦</i><span>FILTER COFFEE</span><i>✦</i><span>PURE VEGETARIAN</span><i>✦</i>
        </div>
      </section>

      <section className="section story-preview">
        <div className="site-container split-story">
          <div className="story-images reveal">
            <img className="story-main" src="/images/interior.jpg" alt="Warm dining interior at Karnataka Cafe" />
            <img className="story-float" src="/images/coffee.jpg" alt="Traditional South Indian filter coffee" />
            <div className="round-stamp"><span>Patna&apos;s South Indian table</span><b>KC</b></div>
          </div>
          <div className="story-copy reveal delay-one">
            <span className="eyebrow">A little piece of Karnataka</span>
            <h2 className="section-title">Rooted in tradition.<br /><em>Alive in Patna.</em></h2>
            <p className="lead">We bring familiar Southern comfort to the city with recipes that respect their roots and a dining room built for lingering.</p>
            <p>Our batter rests overnight. Our chutneys are ground every morning. Our sambar is finished in small batches. There are no shortcuts—only the small rituals that make a meal memorable.</p>
            <Link className="text-link strong" href="/story">Read our story <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="section signatures-section">
        <div className="site-container">
          <div className="section-heading reveal">
            <div><span className="eyebrow">Straight from the tawa</span><h2 className="section-title">The signatures.</h2></div>
            <p>Three plates our regulars return for, each made to order and served with unlimited warmth.</p>
          </div>
          <div className="signature-grid">
            {signatures.map((dish, index) => (
              <article className={`signature-card reveal delay-${index + 1} ${dish.className}`} key={dish.name}>
                <img src={dish.image} alt={dish.name} />
                <div className="card-wash" />
                <span className="dish-number">0{index + 1}</span>
                <div className="dish-copy"><small>{dish.note}</small><h3>{dish.name}</h3><div><b>{dish.price}</b><span>View dish ↗</span></div></div>
              </article>
            ))}
          </div>
          <div className="center-action reveal"><Link className="button button-outline-dark" href="/menu">See the full menu <span>↗</span></Link></div>
        </div>
      </section>

      <section className="craft-section">
        <img className="craft-bg" src="/images/thali.jpg" alt="" data-parallax="" />
        <div className="craft-overlay" />
        <div className="site-container craft-grid">
          <div className="craft-copy reveal">
            <span className="eyebrow eyebrow-light">What keeps the kitchen alive</span>
            <h2>Every plate has<br /><em>a rhythm.</em></h2>
            <p>Steam, sizzle, temper, serve. Our open-kitchen energy follows the pace of Southern homes—unhurried in preparation, joyful at the table.</p>
            <Link className="button button-light" href="/gallery">See the experience <span>↗</span></Link>
          </div>
          <div className="craft-notes">
            <div className="reveal"><span>01</span><h3>Fermented overnight</h3><p>For airy idlis and dosas with a delicate crisp.</p></div>
            <div className="reveal delay-one"><span>02</span><h3>Ground each morning</h3><p>Coconut, tomato and mint chutneys made in-house.</p></div>
            <div className="reveal delay-two"><span>03</span><h3>Served with generosity</h3><p>Warm hospitality and plenty of sambar, always.</p></div>
          </div>
        </div>
      </section>

      <section className="section gallery-preview">
        <div className="site-container">
          <div className="section-heading reveal">
            <div><span className="eyebrow">A table full of colour</span><h2 className="section-title">See what&apos;s cooking.</h2></div>
            <Link className="text-link strong" href="/gallery">Open gallery <span>→</span></Link>
          </div>
          <div className="home-gallery">
            <Link href="/gallery" className="gallery-tile tile-tall reveal"><img src="/images/dosa.jpg" alt="Masala dosa with chutneys" /><span>The perfect crisp</span></Link>
            <Link href="/gallery" className="gallery-tile reveal delay-one"><img src="/images/coffee.jpg" alt="Frothy filter coffee" /><span>Freshly pulled</span></Link>
            <Link href="/gallery" className="gallery-tile reveal delay-two"><img src="/images/idli.jpg" alt="Soft idli and vada" /><span>Morning comfort</span></Link>
            <Link href="/gallery" className="gallery-tile tile-wide reveal delay-three"><img src="/images/interior.jpg" alt="Karnataka Cafe dining space" /><span>Your corner in Saguna</span></Link>
          </div>
        </div>
      </section>

      <section className="guest-section">
        <div className="site-container guest-grid">
          <div className="guest-heading reveal"><span className="eyebrow eyebrow-light">From our guest book</span><h2>Kind words.<br /><em>Full hearts.</em></h2></div>
          <div className="quote-stack reveal delay-one">
            <article><div className="stars">★★★★★</div><blockquote>“The dosa had that proper Bengaluru crisp, and the filter coffee took me straight back home.”</blockquote><p>— Ananya S. · Patna</p></article>
            <article><div className="stars">★★★★★</div><blockquote>“Warm service, generous portions and a beautiful space. Our new family breakfast spot.”</blockquote><p>— Rohan K. · Saguna</p></article>
          </div>
        </div>
      </section>

      <section className="section visit-preview">
        <div className="site-container visit-preview-grid">
          <div className="visit-card reveal">
            <span className="eyebrow">Find your way here</span>
            <h2 className="section-title">Right here<br /><em>in Saguna.</em></h2>
            <p>Opposite Dwarkapuri Residency, near Devlok Mandir, PGS Road, Saguna-Khagaul Road, Patna 801503.</p>
            <div className="visit-facts"><span><small>Open daily</small>7:00 AM–10:30 PM</span><span><small>Call us</small>+91 81303 84879</span></div>
            <Link className="button button-primary" href="/visit">Map &amp; reservations <span>↗</span></Link>
          </div>
          <div className="visit-image reveal delay-one"><img src="/images/interior.jpg" alt="Welcoming Karnataka Cafe interior" data-parallax="" /><div className="live-pin"><i /> We&apos;re open today</div></div>
        </div>
      </section>
    </main>
  );
}
