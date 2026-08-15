"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/visit", label: "Visit" },
];

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timer = window.setTimeout(() => {
      const items = document.querySelectorAll<HTMLElement>(".reveal");
      const io = new IntersectionObserver(
        (entries, self) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              self.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -30px" },
      );
      observer = io;
      items.forEach((item) => io.observe(item));
    }, 40);
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const root = document.documentElement;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let pointerFrame = 0;
    let scrollFrame = 0;

    const updateParallax = () => {
      scrollFrame = 0;
      const viewportCenter = window.innerHeight / 2;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
        const distance = rect.top + rect.height / 2 - viewportCenter;
        const range = window.innerHeight + rect.height;
        const progress = Math.max(-1, Math.min(1, distance / range));
        item.style.setProperty("--parallax-y", `${progress * -34}px`);
      });
    };

    const scheduleParallax = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateParallax);
    };

    const updatePointer = (event: PointerEvent) => {
      if (!finePointer) return;
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        root.style.setProperty("--pointer-x", `${x * -12}px`);
        root.style.setProperty("--pointer-y", `${y * -8}px`);
        root.style.setProperty("--pointer-x-reverse", `${x * 16}px`);
        root.style.setProperty("--pointer-y-reverse", `${y * 10}px`);
      });
    };

    updateParallax();
    window.addEventListener("scroll", scheduleParallax, { passive: true });
    window.addEventListener("resize", scheduleParallax);
    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", scheduleParallax);
      window.removeEventListener("pointermove", updatePointer);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      root.style.removeProperty("--pointer-x");
      root.style.removeProperty("--pointer-y");
      root.style.removeProperty("--pointer-x-reverse");
      root.style.removeProperty("--pointer-y-reverse");
    };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("locked", reserveOpen || navOpen);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setReserveOpen(false);
        setNavOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    if (reserveOpen) window.setTimeout(() => modalRef.current?.focus(), 50);
    return () => {
      document.body.classList.remove("locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [reserveOpen, navOpen]);

  const reserve = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hello Karnataka Cafe Patna! I would like to reserve a table.",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Date: ${data.get("date")}`,
      `Time: ${data.get("time")}`,
      `Guests: ${data.get("guests")}`,
    ].join("\n");
    window.open(`https://wa.me/918130384879?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setReserveOpen(false);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className="opening-strip">
        <div className="site-container opening-inner">
          <span><i /> Open today · 7:00 AM–10:30 PM</span>
          <span>Pure vegetarian · Saguna, Patna</span>
        </div>
      </div>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-container nav-wrap">
          <Link className="brand" href="/" aria-label="Karnataka Cafe Patna home">
            <span className="brand-seal">KC</span>
            <span>Karnataka Cafe<small>Patna</small></span>
          </Link>
          <nav className={`nav-links ${navOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setNavOpen(false)} aria-current={pathname === link.href ? "page" : undefined}>
                {link.label}
              </Link>
            ))}
            <button className="nav-reserve" type="button" onClick={() => setReserveOpen(true)}>
              Reserve a table
            </button>
          </nav>
          <button
            className={`menu-toggle ${navOpen ? "is-open" : ""}`}
            type="button"
            aria-label={navOpen ? "Close menu" : "Open menu"}
            aria-expanded={navOpen}
            onClick={() => setNavOpen((open) => !open)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      {children}

      <section className="footer-cta">
        <div className="site-container footer-cta-inner reveal">
          <div>
            <span className="eyebrow">Your table is waiting</span>
            <h2>Come hungry.<br /><em>Leave happy.</em></h2>
          </div>
          <button className="button button-light" type="button" onClick={() => setReserveOpen(true)}>
            Reserve your table <span>↗</span>
          </button>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-container footer-grid">
          <div className="footer-brand">
            <Link className="brand brand-light" href="/">
              <span className="brand-seal">KC</span>
              <span>Karnataka Cafe<small>Patna</small></span>
            </Link>
            <p>South Indian comfort, made fresh and served warmly in Patna.</p>
          </div>
          <div>
            <h3>Explore</h3>
            {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </div>
          <div>
            <h3>Visit</h3>
            <p>Opp. Dwarkapuri Residency<br />Near Devlok Mandir, PGS Road<br />Saguna-Khagaul Road, Patna 801503</p>
          </div>
          <div>
            <h3>Contact</h3>
            <a href="tel:+918130384879">+91 81303 84879</a>
            <a href="mailto:care@karnatakacafe.in">care@karnatakacafe.in</a>
            <a href="https://wa.me/918130384879" target="_blank" rel="noreferrer">WhatsApp us ↗</a>
          </div>
        </div>
        <div className="site-container footer-bottom">
          <span>© {new Date().getFullYear()} Karnataka Cafe Patna</span>
          <span>Pure vegetarian · Made with care</span>
        </div>
      </footer>

      <a className="whatsapp-float" href="https://wa.me/918130384879?text=Hi%20Karnataka%20Cafe%20Patna!" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <span>Chat &amp; order</span><b>WA</b>
      </a>

      <div className={`modal-layer ${reserveOpen ? "is-open" : ""}`} aria-hidden={!reserveOpen}>
        <button className="modal-shade" type="button" aria-label="Close reservation form" onClick={() => setReserveOpen(false)} />
        <div className="reserve-modal" role="dialog" aria-modal="true" aria-labelledby="reserveTitle" tabIndex={-1} ref={modalRef}>
          <div className="modal-heading">
            <div>
              <span className="eyebrow">Reserve in a minute</span>
              <h2 id="reserveTitle">Book your table</h2>
            </div>
            <button type="button" onClick={() => setReserveOpen(false)} aria-label="Close">×</button>
          </div>
          <form onSubmit={reserve}>
            <label>Full name<input name="name" type="text" placeholder="Your name" required /></label>
            <label>Phone number<input name="phone" type="tel" placeholder="+91 98765 43210" required /></label>
            <div className="form-row">
              <label>Date<input name="date" type="date" required /></label>
              <label>Time<select name="time" defaultValue="8:00 PM"><option>12:30 PM</option><option>1:30 PM</option><option>7:00 PM</option><option>8:00 PM</option><option>9:00 PM</option></select></label>
            </div>
            <label>Guests<select name="guests" defaultValue="2 people"><option>1 person</option><option>2 people</option><option>4 people</option><option>6 people</option><option>8+ people</option></select></label>
            <button className="button button-primary button-full" type="submit">Confirm on WhatsApp ↗</button>
            <small>No payment needed. We&apos;ll confirm your table on WhatsApp.</small>
          </form>
        </div>
      </div>
    </>
  );
}
