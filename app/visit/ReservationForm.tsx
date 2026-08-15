"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function ReservationForm() {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const message = [
      "Hello Karnataka Cafe Patna! I would like to reserve a table.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Date: ${data.get("date")}`,
      `Time: ${data.get("time")}`,
      `Guests: ${data.get("guests")}`,
      `Note: ${data.get("note") || "None"}`,
    ].join("\n");
    window.open(`https://wa.me/918130384879?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <div className="reservation-card reveal delay-one" id="reserve">
      <div className="reservation-card-head"><span className="eyebrow">Quick reservation</span><h2>Book a table</h2><p>Share the details below and finish your booking on WhatsApp.</p></div>
      <form onSubmit={submit}>
        <div className="form-row"><label>Your name<input name="name" type="text" placeholder="Full name" required /></label><label>Phone<input name="phone" type="tel" placeholder="+91 98765 43210" required /></label></div>
        <div className="form-row"><label>Date<input name="date" type="date" required /></label><label>Preferred time<select name="time" defaultValue="8:00 PM"><option>12:30 PM</option><option>1:30 PM</option><option>7:00 PM</option><option>8:00 PM</option><option>9:00 PM</option></select></label></div>
        <label>Party size<select name="guests" defaultValue="2 people"><option>1 person</option><option>2 people</option><option>4 people</option><option>6 people</option><option>8+ people</option></select></label>
        <label>Anything we should know?<textarea name="note" placeholder="High chair, birthday, Jain preparation…" rows={3} /></label>
        <button className="button button-primary button-full" type="submit">Request reservation <span>↗</span></button>
        {sent ? <p className="form-success"><i /> WhatsApp opened—send the message to confirm.</p> : <small>Reservations are confirmed personally by our team.</small>}
      </form>
    </div>
  );
}
