import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Clock3, SprayCan, Gem, Star, Plus, Minus, Instagram, MapPin } from "lucide-react";
import { useState } from "react";
import heroCar from "@/assets/hero-car.jpg";
import showcase1 from "@/assets/showcase1.jpg";
import detailPolish from "@/assets/detail-polish.jpg";
import ceramic from "@/assets/ceramic.jpg";
import interior from "@/assets/interior.jpg";
import wheel from "@/assets/wheel.jpg";
import serviceArea from "@/assets/service-area.png";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Everyday Shine Detailing — Everyday Shine Detailing" },
      { name: "description", content: "Auto detailing. Interior restoration & Exterior restoration. Detailing service in RI and parts of MA & CT" },
    ],
  }),
  component: Home,
});

// =========================
// HOME — cinematic single-scroll experience
// =========================
function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <MarqueeBrands />
      <Stats />
      <Packages />
      <BeforeAfterSection />
      <Showcase />
      <WhyUs />
      <Reviews />
      <FAQ />
      <SocialFeed />
      <MapBlock />
      <FinalCTA />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden noise">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroCar} alt="Detailed luxury car" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 grid-lines opacity-30" />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-neon/60 animate-float"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${5 + (i % 5)}s`,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-5 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[10px] sm:text-xs tracking-[0.3em] font-display mb-8 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          MOBILE DETAILING · RI & PARTS OF MA & CT
        </div>
        <h1 className="font-display font-black uppercase leading-[0.95] text-5xl sm:text-7xl lg:text-[8.5rem] animate-fade-up" style={{ animationDelay: "0.1s" }}>
          EVERYDAY <br className="sm:hidden" />
          <span className="text-gradient">SHINE</span>
          <br />
          DETAILING
        </h1>
        <p className="mt-8 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "0.25s" }}>
          We don't wash cars. We restore obsession.
          finished to a depth you can fall into.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <Link to="/booking" className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-neon text-background font-bold text-sm tracking-widest uppercase glow-neon hover:scale-[1.03] transition">
            Book Your Detail <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
          <Link to="/services" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full glass border-neon/30 text-sm font-display tracking-widest uppercase hover:border-neon transition">
            Explore Packages
          </Link>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-muted-foreground font-display">
        <div className="flex flex-col items-center gap-2">
          SCROLL
          <span className="w-px h-10 bg-gradient-to-b from-neon to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ---------- MARQUEE ---------- */
function MarqueeBrands() {
  const items = ["FORD", "HONDA", "TOYOTA", "CHEVROLET", "NISSAN", "HYUNDAI", "KIA", "SUBARU", "MAZDA", "VOLKSWAGEN", "BMW", "MERCEDES-BENZ", "AUDI", "LEXUS", "ACURA", "INFINITI", "TESLA", "JEEP", "DODGE", "RAM", "GMC", "CADILLAC", "CHRYSLER", "VOLVO", "PORSCHE", "JAGUAR", "LAND ROVER", "MINI", "BUICK", "LINCOLN"];
  return (
    <section className="border-y border-border overflow-hidden py-6 bg-surface/50">
      <div className="flex gap-16 whitespace-nowrap animate-marquee">
        {[...items, ...items].map((b, i) => (
          <span key={i} className="font-display text-2xl sm:text-3xl tracking-[0.3em] text-muted-foreground/40 hover:text-neon transition">
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- STATS ---------- */
function Stats() {
  const stats = [
    { v: 100, s: "+", l: "Vehicles Detailed" },
    { v: 75, s: "+", l: "Repeat Customers" },
    { v: 1, s: "yr", l: "Industry Experience" },
    { v: 98, s: "%", l: "Satisfaction Rate" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((s) => (
        <div key={s.l} className="text-center">
          <Counter to={s.v} suffix={s.s} />
          <p className="mt-2 text-xs sm:text-sm tracking-[0.25em] uppercase text-muted-foreground font-display">{s.l}</p>
        </div>
      ))}
    </section>
  );
}

/* ---------- PACKAGES ---------- */
const packages = [
  {
    id: "basic" as const,
    name: "Basic Detail",
    price: "$99",
    blurb: "Best for regular upkeep & lightly used vehicles",
    features: ["Exterior hand wash", "Wheel & tire cleaning", "Tire shine", "Interior vacuum", "Wipe down of surfaces", "Window cleaning", "Door jamb cleaning"],
    accent: false,
  },
  {
    id: "premium" as const,
    name: "Premium Detail",
    price: "$199",
    blurb: "Best for daily drivers, car refreshes, selling your vehicle",
    features: ["Everything in Basic Detail", "Deep interior cleaning", "Steam cleaning", "Carpet & seat shampoo", "Leather conditioning", "Clay bar treatment",  "Bug & tar removal", "Trim restoration"],
    accent: true,
  },
  {
    id: "ultimate" as const,
    name: "Ultimate Showroom Package",
    price: "$399",
    blurb: "Best for luxury vehicles, car enthusiasts, show vehicles, long-term paint protection.",
    features: ["Everything in Premium Detail", "One-step paint correction", "Ceramic coating protection", "Engine bay detail", "Seat Removal", "Odor elimination", "Premium gloss enhancement", "Full exterior decontamination", "Final showroom finish inspection"],
    accent: false,
  },
];

function Packages() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24">
      <SectionHeader eyebrow="Featured Packages" title={<>Choose your <span className="text-gradient">finish</span>.</>} />
      <div className="grid gap-6 md:grid-cols-3 mt-14">
        {packages.map((p) => (
          <div
            key={p.name}
            className={`relative group rounded-2xl p-8 border transition hover-lift ${
              p.accent
                ? "border-neon/60 bg-gradient-to-b from-neon/10 to-transparent glow-soft"
                : "border-border bg-surface/60"
            }`}
          >
            {p.accent && (
              <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-gradient-neon text-background text-[10px] font-display tracking-widest">
                MOST BOOKED
              </span>
            )}
            <h3 className="font-display text-2xl">{p.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-display font-black">{p.price}</span>
              <span className="text-muted-foreground text-sm">/ starting</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{p.blurb}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-2 w-1 h-1 rounded-full bg-neon" /> {f}
                </li>
              ))}
            </ul>
            <Link
              to="/booking"
              search={{ package: p.id }}
              className={`mt-8 inline-flex items-center gap-2 text-sm font-display tracking-widest uppercase ${
                p.accent ? "text-neon" : "text-foreground"
              } group-hover:text-neon transition`}
            >
              Reserve <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- BEFORE / AFTER ---------- */
function BeforeAfterSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeader eyebrow="Transformation" title={<>The <span className="text-gradient">before</span> &amp; the impossible.</>} />
      <div className="mt-12">
        <BeforeAfter />
      </div>
    </section>
  );
}

/* ---------- SHOWCASE ---------- */
function Showcase() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img src={showcase1} alt="Showcase" className="rounded-2xl shadow-lux animate-float" loading="lazy" />
          <div className="absolute -inset-4 rounded-3xl border border-neon/20 -z-10" />
        </div>
        <div>
          <p className="font-display tracking-[0.3em] text-xs text-neon mb-4">WE ARE MOBILE</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            We come to you.<br />
            <span className="text-gradient">Driveway-ready.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            We come to you, we bring all of our equipment the only things we need from you is water access and power access.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[detailPolish, ceramic, wheel].map((src, i) => (
              <img key={i} src={src} alt="Detail" loading="lazy" className="aspect-square object-cover rounded-lg border border-border hover:border-neon transition" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY US ---------- */
function WhyUs() {
  const items = [
    { Icon: ShieldCheck, t: "Professional-Level Results", d: "Every vehicle is detailed with precision, premium products, and attention to every small detail for a true showroom-quality finish." },
    { Icon: Clock3, t: "Convenient & Reliable Service", d: "We make the process easy with flexible scheduling, fast response times, and dependable appointments you can count on." },
    { Icon: SprayCan, t: "Premium Products & Protection", d: "We use high-quality detailing chemicals, ceramic protection, and safe wash methods to protect your vehicle’s paint and interior." },
    { Icon: Gem, t: "Passion for Cars", d: "We treat every vehicle like it’s our own whether it’s a daily driver, luxury car, truck, or weekend show car." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeader eyebrow="Why Everyday Shine Detailing" title={<>An <span className="text-gradient">unfair</span> attention to detail.</>} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {items.map(({ Icon, t, d }) => (
          <div key={t} className="group p-6 rounded-2xl border border-border bg-surface/60 hover:border-neon/60 hover-lift">
            <div className="w-12 h-12 grid place-items-center rounded-lg bg-gradient-neon text-background mb-5 group-hover:scale-110 transition">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- REVIEWS ---------- */
function Reviews() {
  const r = [
    { n: "Rebecca B.", c: "2025 Honda CRV", q: "They turned my black car into a black hole. Depth like glass. Worth every cent." },
    { n: "Aisha K.", c: "Model S Plaid", q: "Picked up filthy. Returned showroom. Their ceramic is the real deal." },
    { n: "James T.", c: "Aston DB11", q: "I've used five detailers in Boston. Nobody is in their league." },
    { n: "Priya R.", c: "Range Rover SV", q: "The interior smelled new again. My wife thought I'd traded the car in." },
    { n: "Lucas V.", c: "Huracán EVO", q: "Surgical. Professional. I won't trust anyone else with the Lambo." },
  ];
  return (
    <section className="py-24 border-y border-border bg-surface/30 overflow-hidden">
      <SectionHeader eyebrow="Said by our clients" title={<>Trusted by <span className="text-gradient">enthusiasts</span>.</>} />
      <div className="mt-14 flex gap-6 animate-marquee">
        {[...r, ...r].map((rev, i) => (
          <div key={i} className="shrink-0 w-[340px] glass rounded-2xl p-6">
            <div className="flex gap-1 mb-3">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-neon text-neon" />)}</div>
            <p className="text-sm leading-relaxed">"{rev.q}"</p>
            <div className="mt-4 pt-4 border-t border-border/50 flex justify-between text-xs">
              <span className="font-display">{rev.n}</span>
              <span className="text-muted-foreground">{rev.c}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const faqs = [
  { q: "Do you come to me?", a: "Yes. We come to you we service all of Rhode Island & parts of Massachusetts & Connecticut." },
  { q: "How long does a full detail take?", a: "Most detail's take around 1-4 hours. However can vary based on condition of the vehicle contact us if you would like to know exactly how long." },
  { q: "Do you use our water & electricity?", a: "Yes we do use your water & electricity however you are not required to give us an extension cord or a water hose we take care of that." },
  { q: "What forms of payment do you accept?", a: "All major cards, Venmo, Paypal, Apple Pay, Credit Cards, Debit Cards and cash. A deposit holds your slot and is put towards the total cost of the service at the end." },
  { q: "Motorcycle & boat detailing?", a: "Absolutely see our Services page for two-wheel and marine packages." },
];
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <SectionHeader eyebrow="FAQ" title={<>Answers, <span className="text-gradient">polished</span>.</>} />
      <div className="mt-12 space-y-3">
        {faqs.map((f, i) => (
          <button
            key={i}
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left rounded-2xl border border-border bg-surface/60 px-6 py-5 hover:border-neon/40 transition"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-base sm:text-lg">{f.q}</span>
              {open === i ? <Minus className="w-4 h-4 text-neon" /> : <Plus className="w-4 h-4 text-neon" />}
            </div>
            <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
              <p className="overflow-hidden text-sm text-muted-foreground">{f.a}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------- SOCIAL FEED ---------- */
function SocialFeed() {
  const imgs = [showcase1, ceramic, wheel, interior, detailPolish, heroCar];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <SectionHeader eyebrow="@everydayshine" title={<>Follow the <span className="text-gradient">grind</span>.</>} />
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {imgs.map((src, i) => (
          <a key={i} href="#" className="group relative aspect-square overflow-hidden rounded-lg border border-border">
            <img src={src} alt="Social" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition grid place-items-center">
              <Instagram className="w-6 h-6 opacity-0 group-hover:opacity-100 text-neon transition" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- MAP BLOCK ---------- */
function MapBlock() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="font-display tracking-[0.3em] text-xs text-neon mb-4">FIND US</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            We service <span className="text-gradient">closer</span> than you think.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            Mobile service across Rhode Island aswell as parts of Massachusetts and Connecticut.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-neon" /> Rhode Island · Massachusetts · Connecticut
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-border glow-soft bg-surface">
          <img
            src={serviceArea}
            alt="Everyday Shine Detailing service area map covering Rhode Island, parts of Massachusetts and Connecticut"
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="relative rounded-3xl overflow-hidden border border-neon/30 p-12 sm:p-20 text-center bg-gradient-to-br from-surface to-background glow-soft">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <div className="relative">
          <p className="font-display tracking-[0.3em] text-xs text-neon mb-4">READY?</p>
          <h2 className="font-display text-4xl sm:text-6xl font-black leading-tight">
            Your car deserves <br />
            <span className="text-gradient">the standard.</span>
          </h2>
          <Link to="/booking" className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-neon text-background font-bold text-sm tracking-widest uppercase glow-neon hover:scale-105 transition">
            Book Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Shared ---------- */
function SectionHeader({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className="font-display tracking-[0.3em] text-xs text-neon mb-4 uppercase">{eyebrow}</p>
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">{title}</h2>
    </div>
  );
}
