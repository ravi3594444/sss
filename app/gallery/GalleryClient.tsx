"use client";

import { useEffect, useMemo, useState } from "react";

const photos = [
  { src: "/images/dosa.jpg", alt: "Crisp masala dosa with fresh chutneys", caption: "That first crisp crack", category: "Food", shape: "tall" },
  { src: "/images/coffee.jpg", alt: "Traditional filter coffee served frothy", caption: "Coffee, pulled properly", category: "Ritual", shape: "" },
  { src: "/images/interior.jpg", alt: "Warm Karnataka Cafe dining room", caption: "A room made for lingering", category: "Space", shape: "wide" },
  { src: "/images/idli.jpg", alt: "Soft idli and crisp medu vada", caption: "Soft meets golden", category: "Food", shape: "" },
  { src: "/images/thali.jpg", alt: "Colourful South Indian thali", caption: "A little of everything", category: "Food", shape: "wide" },
  { src: "/images/uttapam.jpg", alt: "Fresh vegetable uttapam", caption: "Colour from the tawa", category: "Food", shape: "tall" },
  { src: "/images/snacks.jpg", alt: "Freshly fried South Indian snacks", caption: "Made for sharing", category: "Food", shape: "" },
  { src: "/images/biryani.jpg", alt: "Fragrant vegetable biryani", caption: "Aromatic comfort", category: "Food", shape: "" },
  { src: "/images/dessert.jpg", alt: "Traditional Indian dessert", caption: "Always save room", category: "Food", shape: "wide" },
  { src: "/images/hero.jpg", alt: "A complete meal at Karnataka Cafe", caption: "Come to the table", category: "Ritual", shape: "tall" },
];

const filters = ["All", "Food", "Space", "Ritual"];

export default function GalleryClient() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const visible = useMemo(() => photos.filter((photo) => filter === "All" || photo.category === filter), [filter]);

  useEffect(() => {
    if (selected === null) return;
    document.body.classList.add("locked");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((current) => current === null ? null : (current + 1) % visible.length);
      if (event.key === "ArrowLeft") setSelected((current) => current === null ? null : (current - 1 + visible.length) % visible.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, visible.length]);

  const chooseFilter = (value: string) => {
    setFilter(value);
    setSelected(null);
  };

  return (
    <section className="section full-gallery-section">
      <div className="site-container">
        <div className="gallery-toolbar reveal">
          <div><span className="eyebrow">Inside the cafe</span><h2 className="section-title">Moments, plated.</h2></div>
          <div role="group" aria-label="Gallery filters">{filters.map((item) => <button className={filter === item ? "active" : ""} type="button" onClick={() => chooseFilter(item)} key={item}>{item}</button>)}</div>
        </div>
        <div className="gallery-masonry">
          {visible.map((photo, index) => (
            <button className={`gallery-photo ${photo.shape} reveal delay-${(index % 3) + 1}`} type="button" key={`${photo.caption}-${filter}`} onClick={() => setSelected(index)}>
              <img src={photo.src} alt={photo.alt} />
              <span><small>{photo.category}</small><strong>{photo.caption}</strong></span>
              <i>+</i>
            </button>
          ))}
        </div>
      </div>

      <div className={`lightbox ${selected !== null ? "is-open" : ""}`} aria-hidden={selected === null}>
        <button className="lightbox-shade" type="button" aria-label="Close image" onClick={() => setSelected(null)} />
        {selected !== null && visible[selected] && (
          <div className="lightbox-card" role="dialog" aria-modal="true" aria-label={visible[selected].caption}>
            <button className="lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <button className="lightbox-prev" type="button" onClick={() => setSelected((selected - 1 + visible.length) % visible.length)} aria-label="Previous image">←</button>
            <img src={visible[selected].src} alt={visible[selected].alt} />
            <button className="lightbox-next" type="button" onClick={() => setSelected((selected + 1) % visible.length)} aria-label="Next image">→</button>
            <div><span>{String(selected + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}</span><strong>{visible[selected].caption}</strong></div>
          </div>
        )}
      </div>
    </section>
  );
}
