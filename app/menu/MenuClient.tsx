"use client";

import { useMemo, useState } from "react";

type Dish = {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
};

const dishes: Dish[] = [
  { name: "Masala Dosa", description: "Golden crisp dosa filled with fragrant potato masala.", price: 110, category: "Dosa", image: "/images/dosa.jpg", tag: "Bestseller" },
  { name: "Mysore Masala Dosa", description: "Spicy red chutney, potato masala and a crisp roast.", price: 130, category: "Dosa", image: "/images/dosa.jpg", tag: "House pick" },
  { name: "Ghee Roast Dosa", description: "Paper-thin dosa roasted with aromatic pure ghee.", price: 135, category: "Dosa", image: "/images/dosa.jpg" },
  { name: "Paneer Dosa", description: "A crisp dosa generously filled with creamy spiced paneer.", price: 150, category: "Dosa", image: "/images/dosa.jpg" },
  { name: "Idli & Vada Combo", description: "Soft idli, crisp medu vada, sambar and fresh chutneys.", price: 120, category: "Idli & Vada", image: "/images/idli.jpg", tag: "Popular" },
  { name: "Ghee Podi Idli", description: "Steamed idlis tossed with ghee and fiery house podi.", price: 110, category: "Idli & Vada", image: "/images/idli.jpg" },
  { name: "Mini Sambar Idli", description: "Bite-sized idlis soaking in warm, tangy sambar.", price: 95, category: "Idli & Vada", image: "/images/idli.jpg" },
  { name: "Medu Vada", description: "Golden outside, fluffy inside, served piping hot.", price: 85, category: "Idli & Vada", image: "/images/idli.jpg" },
  { name: "Onion Uttapam", description: "Soft rice pancake topped with onions and green chilli.", price: 130, category: "Uttapam", image: "/images/uttapam.jpg" },
  { name: "Mixed Veg Uttapam", description: "Onion, tomato, capsicum and fresh coriander.", price: 150, category: "Uttapam", image: "/images/uttapam.jpg", tag: "Colourful" },
  { name: "KC Special Uttapam", description: "Our loaded signature uttapam with a house spice finish.", price: 185, category: "Uttapam", image: "/images/uttapam.jpg", tag: "Signature" },
  { name: "Cheese Uttapam", description: "Soft uttapam finished with vegetables and melted cheese.", price: 170, category: "Uttapam", image: "/images/uttapam.jpg" },
  { name: "KC Executive Thali", description: "Rice, sambar, rasam, curries, curd, papad and sweet.", price: 220, category: "Meals", image: "/images/thali.jpg", tag: "Bestseller" },
  { name: "KC Deluxe Thali", description: "Our grand thali with paneer, dessert and extra sides.", price: 280, category: "Meals", image: "/images/thali.jpg", tag: "Weekend pick" },
  { name: "South Indian Veg Biryani", description: "Aromatic rice with seasonal vegetables and Southern spices.", price: 180, category: "Meals", image: "/images/biryani.jpg" },
  { name: "Lemon Rice", description: "A bright, tangy classic tempered with mustard and peanuts.", price: 110, category: "Meals", image: "/images/biryani.jpg" },
  { name: "Paneer Pakoda", description: "Crisp gram-flour paneer bites with mint chutney.", price: 160, category: "Snacks", image: "/images/snacks.jpg" },
  { name: "Gobi Manchurian", description: "Crisp cauliflower in a tangy, spicy house sauce.", price: 140, category: "Snacks", image: "/images/snacks.jpg", tag: "Spicy" },
  { name: "Veg Spring Rolls", description: "Crunchy rolls packed with fresh seasoned vegetables.", price: 150, category: "Snacks", image: "/images/snacks.jpg" },
  { name: "Chilli Paneer", description: "Paneer and peppers tossed in a lively chilli glaze.", price: 190, category: "Snacks", image: "/images/snacks.jpg" },
  { name: "Hot Filter Coffee", description: "Strong, frothy and poured the traditional way.", price: 80, category: "Drinks & Sweet", image: "/images/coffee.jpg", tag: "Must try" },
  { name: "Cold Coffee", description: "Chilled, creamy coffee blended until smooth.", price: 120, category: "Drinks & Sweet", image: "/images/coffee.jpg" },
  { name: "Rasmalai", description: "Soft paneer in saffron milk with pistachio.", price: 120, category: "Drinks & Sweet", image: "/images/dessert.jpg", tag: "Popular" },
  { name: "Gulab Jamun", description: "Warm, soft dumplings in fragrant sugar syrup.", price: 90, category: "Drinks & Sweet", image: "/images/dessert.jpg" },
];

const categories = ["All", "Dosa", "Idli & Vada", "Uttapam", "Meals", "Snacks", "Drinks & Sweet"];

export default function MenuClient() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Dish | null>(null);

  const shown = useMemo(() => dishes.filter((dish) => {
    const inCategory = category === "All" || dish.category === category;
    const term = query.trim().toLowerCase();
    const matches = !term || `${dish.name} ${dish.description} ${dish.category}`.toLowerCase().includes(term);
    return inCategory && matches;
  }), [category, query]);

  return (
    <section className="section menu-section">
      <div className="site-container">
        <div className="menu-control reveal">
          <label className="menu-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dosa, coffee, thali…" aria-label="Search menu" /></label>
          <div className="menu-count"><b>{shown.length}</b> dishes ready to discover</div>
        </div>
        <div className="category-tabs reveal" role="group" aria-label="Menu categories">
          {categories.map((item) => (
            <button key={item} className={category === item ? "active" : ""} type="button" onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>

        {shown.length ? (
          <div className="dish-grid">
            {shown.map((dish, index) => (
              <button className={`dish-card reveal delay-${(index % 3) + 1}`} type="button" key={dish.name} onClick={() => setSelected(dish)}>
                <span className="dish-photo"><img src={dish.image} alt={dish.name} />{dish.tag && <b>{dish.tag}</b>}<i>View plate ↗</i></span>
                <span className="dish-details"><span><strong>{dish.name}</strong><em>₹{dish.price}</em></span><small>{dish.description}</small></span>
              </button>
            ))}
          </div>
        ) : (
          <div className="no-dishes"><span>🍽</span><h2>No plate found</h2><p>Try another search or category.</p><button type="button" onClick={() => { setCategory("All"); setQuery(""); }}>Show everything</button></div>
        )}
        <div className="menu-note reveal"><span>Good to know</span><p>All dishes are vegetarian. Jain preparation and allergy guidance are available—please ask our team before ordering.</p><a href="https://wa.me/918130384879" target="_blank" rel="noreferrer">Ask us on WhatsApp ↗</a></div>
      </div>

      <div className={`dish-modal-layer ${selected ? "is-open" : ""}`} aria-hidden={!selected}>
        <button className="dish-modal-shade" type="button" aria-label="Close dish preview" onClick={() => setSelected(null)} />
        {selected && (
          <article className="dish-modal" role="dialog" aria-modal="true" aria-label={`${selected.name} details`}>
            <button className="dish-close" type="button" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <img src={selected.image} alt={selected.name} />
            <div><span className="eyebrow">{selected.category}</span><h2>{selected.name}</h2><p>{selected.description}</p><div className="modal-price"><strong>₹{selected.price}</strong><small>Inclusive of taxes</small></div><a className="button button-primary button-full" href={`https://wa.me/918130384879?text=${encodeURIComponent(`Hi! I would like to order ${selected.name}.`)}`} target="_blank" rel="noreferrer">Order this on WhatsApp ↗</a></div>
          </article>
        )}
      </div>
    </section>
  );
}
