import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  italic?: string;
  description: string;
  image: string;
  crumb: string;
};

export default function PageHero({ eyebrow, title, italic, description, image, crumb }: PageHeroProps) {
  return (
    <section className="page-hero">
      <img className="page-hero-image" src={image} alt="" data-parallax="" />
      <div className="page-hero-shade" />
      <div className="page-orbit orbit-one" />
      <div className="page-orbit orbit-two" />
      <div className="site-container page-hero-content">
        <div className="breadcrumbs"><Link href="/">Home</Link><span>•</span>{crumb}</div>
        <span className="eyebrow eyebrow-light">{eyebrow}</span>
        <h1>{title}{italic && <><br /><em>{italic}</em></>}</h1>
        <p>{description}</p>
      </div>
      <div className="hero-scroll"><span /> Scroll to explore</div>
    </section>
  );
}
