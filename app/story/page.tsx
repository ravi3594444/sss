import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Discover the recipes, rituals and hospitality behind Karnataka Cafe Patna.",
};

const rituals = [
  ["05:30", "The first grind", "Rice, lentils, coconut and spices begin their journey before the city wakes."],
  ["07:00", "Doors open", "The tawa warms, coffee rises in ribbons, and breakfast begins."],
  ["12:30", "Lunch gathers", "Thalis move across the pass, each bowl finished in small batches."],
  ["18:00", "Evening rhythm", "Dosas crackle, families settle in, and the dining room comes alive."],
];

export default function StoryPage() {
  return (
    <main id="main-content" className="page-enter">
      <PageHero
        eyebrow="Recipes with a memory"
        title="Our food began"
        italic="around a family table."
        description="A story of Southern comfort, patient preparation and the simple belief that warm food deserves equally warm hospitality."
        image="/images/interior.jpg"
        crumb="Our Story"
      />

      <section className="section story-origin">
        <div className="site-container origin-grid">
          <div className="origin-copy reveal">
            <span className="eyebrow">Why we began</span>
            <h2 className="section-title">The taste of home,<br /><em>without the journey.</em></h2>
            <p className="lead">Karnataka Cafe was created for anyone who has ever missed a familiar breakfast, a proper chutney or the sound of coffee being pulled between two tumblers.</p>
            <p>In Patna, that feeling found a new address. We brought time-honoured preparations into a bright, welcoming room where first-time guests and lifelong dosa lovers sit side by side.</p>
            <p>We are proud of the details: the patience behind a fermented batter, curry leaves crackling in hot oil, a meal arriving with every colour in its place.</p>
          </div>
          <div className="origin-visual reveal delay-one">
            <img src="/images/hero.jpg" alt="A complete South Indian meal shared at the table" />
            <div className="origin-caption"><small>Our promise</small><strong>Freshly made.<br />Wholeheartedly served.</strong></div>
          </div>
        </div>
      </section>

      <section className="story-quote">
        <div className="site-container reveal">
          <span>“</span>
          <blockquote>We don&apos;t chase trends. We follow the rhythm of a Southern kitchen—and let Patna make it its own.</blockquote>
          <p>Karnataka Cafe · Patna</p>
        </div>
      </section>

      <section className="section ritual-section">
        <div className="site-container ritual-grid">
          <div className="ritual-intro reveal"><span className="eyebrow">A day in our kitchen</span><h2 className="section-title">From first grind<br /><em>to final pour.</em></h2><p>Good food is a sequence of small, careful decisions. Here is how the day moves behind our doors.</p></div>
          <div className="ritual-timeline">
            {rituals.map(([time, title, copy], index) => (
              <article className={`reveal delay-${(index % 3) + 1}`} key={time}><time>{time}</time><div><h3>{title}</h3><p>{copy}</p></div><span>{String(index + 1).padStart(2, "0")}</span></article>
            ))}
          </div>
        </div>
      </section>

      <section className="ingredient-section">
        <div className="site-container ingredient-grid">
          <div className="ingredient-photo reveal"><img src="/images/idli.jpg" alt="Fresh idli, vada and chutneys" /><span>Fresh every morning</span></div>
          <div className="ingredient-copy reveal delay-one">
            <span className="eyebrow eyebrow-light">The honest essentials</span>
            <h2>Few ingredients.<br /><em>Plenty of care.</em></h2>
            <div className="ingredient-list">
              <div><b>01</b><span><strong>Patient fermentation</strong><small>Time gives our batter its lift, flavour and delicate tang.</small></span></div>
              <div><b>02</b><span><strong>Fresh coconut</strong><small>Ground in-house for chutneys that taste bright and clean.</small></span></div>
              <div><b>03</b><span><strong>Whole spices</strong><small>Roasted, tempered and layered rather than hidden.</small></span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="site-container">
          <div className="section-heading reveal"><div><span className="eyebrow">What we stand for</span><h2 className="section-title">Simple values.<br /><em>Daily practice.</em></h2></div><p>Not slogans on a wall—habits you can taste and hospitality you can feel.</p></div>
          <div className="values-grid">
            <article className="reveal"><span>✦</span><h3>Pure vegetarian</h3><p>A focused kitchen where every plate is made with confidence and care.</p></article>
            <article className="reveal delay-one"><span>◌</span><h3>Fresh by default</h3><p>Small batches, daily chutneys and dishes cooked when you order.</p></article>
            <article className="reveal delay-two"><span>⌂</span><h3>Welcome like home</h3><p>Families, solo breakfasts and old friends all belong at our table.</p></article>
          </div>
          <div className="center-action reveal"><Link className="button button-outline-dark" href="/menu">Taste the story <span>↗</span></Link></div>
        </div>
      </section>
    </main>
  );
}
