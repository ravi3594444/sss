import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ReservationForm from "./ReservationForm";

export const metadata: Metadata = {
  title: "Visit & Reserve",
  description: "Find Karnataka Cafe in Saguna, Patna, see opening hours and reserve your table.",
};

const mapQuery = "Karnataka Cafe Near Devlok Mandir PGS Road Saguna Khagaul Road Patna 801503";

export default function VisitPage() {
  return (
    <main id="main-content" className="page-enter">
      <PageHero
        eyebrow="We saved you a seat"
        title="Meet us"
        italic="at the table."
        description="Breakfast with the family, a quick coffee or an unhurried dinner—come as you are. We will take care of the rest."
        image="/images/coffee.jpg"
        crumb="Visit"
      />

      <section className="section contact-section">
        <div className="site-container contact-grid">
          <div className="contact-copy reveal">
            <span className="eyebrow">Karnataka Cafe · Saguna</span>
            <h2 className="section-title">Easy to find.<br /><em>Hard to leave.</em></h2>
            <p>Find us opposite Dwarkapuri Residency, close to Devlok Mandir on PGS Road. There is comfortable seating for families, small groups and coffee catch-ups.</p>
            <div className="contact-details">
              <div><span>01</span><p><small>Address</small>Opp. Dwarkapuri Residency<br />Near Devlok Mandir, PGS Road<br />Saguna-Khagaul Road, Patna 801503</p></div>
              <div><span>02</span><p><small>Opening hours</small>Monday–Sunday<br />7:00 AM–10:30 PM</p></div>
              <div><span>03</span><p><small>Phone & WhatsApp</small><a href="tel:+918130384879">+91 81303 84879</a><br /><a href="mailto:care@karnatakacafe.in">care@karnatakacafe.in</a></p></div>
            </div>
            <a className="button button-primary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noreferrer">Get directions <span>↗</span></a>
          </div>
          <ReservationForm />
        </div>
      </section>

      <section className="map-section">
        <div className="site-container">
          <div className="map-heading reveal"><div><span className="eyebrow">Find your way</span><h2 className="section-title">Right here in Saguna.</h2></div><p>Use the map to plan your route. Tap “Get directions” for turn-by-turn navigation in Google Maps.</p></div>
          <div className="map-frame reveal">
            <iframe
              title="Google Map showing Karnataka Cafe Saguna in Patna"
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map-label"><i /><span><small>Karnataka Cafe Patna</small>Open daily · 7 AM–10:30 PM</span></div>
          </div>
        </div>
      </section>

      <section className="section before-visit">
        <div className="site-container">
          <div className="section-heading reveal"><div><span className="eyebrow">Before you visit</span><h2 className="section-title">Good to know.</h2></div><p>A few quick answers so your meal is effortless from the moment you arrive.</p></div>
          <div className="faq-grid">
            <article className="reveal"><span>01</span><h3>Do I need a reservation?</h3><p>Walk-ins are always welcome. Reservations are helpful for groups and weekend dinner.</p></article>
            <article className="reveal delay-one"><span>02</span><h3>Is the menu vegetarian?</h3><p>Yes. Our kitchen and complete menu are vegetarian. Jain options are available on request.</p></article>
            <article className="reveal delay-two"><span>03</span><h3>Do you offer takeaway?</h3><p>Yes. Call or message us on WhatsApp and we will prepare your order fresh.</p></article>
          </div>
        </div>
      </section>
    </main>
  );
}
