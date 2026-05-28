import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Services — Everyday Shine Detailing" },
    { name: "description", content: "Basic, Premium, and Ultimate Showroom detail packages plus add-ons and custom scratch removal." },
  ] }),
  component: Services,
});

type Tier = { id: "basic"|"premium"|"ultimate"; tier: string; name: string; price: number; time: string; sub: string; features: string[]; best: string[]; feat?: boolean };
const tiers: Tier[] = [
  {
    id: "basic", tier: "Tier 1", name: "Basic Detail", price: 99, time: "1–2 hr",
    sub: "Perfect for maintenance & weekly drivers.",
    features: [
      "Exterior hand wash", "Wheel & tire cleaning", "Tire shine", "Spray wax protection",
      "Interior vacuum", "Wipe down of surfaces", "Window cleaning", "Door jamb cleaning",
    ],
    best: ["Regular upkeep", "Lightly used vehicles"],
  },
  {
    id: "premium", tier: "Tier 2", name: "Premium Detail", price: 199, time: "3–4 hr", feat: true,
    sub: "Our most popular complete detail package.",
    features: [
      "Everything in Basic Detail", "Deep interior cleaning", "Steam cleaning", "Carpet & seat shampoo",
      "Leather conditioning", "Clay bar treatment", "Paint sealant protection", "Bug & tar removal", "Trim restoration",
    ],
    best: ["Daily drivers", "Seasonal refreshes", "Selling your vehicle"],
  },
  {
    id: "ultimate", tier: "Tier 3", name: "Ultimate Showroom Package", price: 399, time: "1 day",
    sub: "The full luxury detailing experience.",
    features: [
      "Everything in Premium Detail", "One-step paint correction", "Ceramic coating protection",
      "Engine bay detail", "Headlight restoration", "Odor elimination", "Premium gloss enhancement",
      "Full exterior decontamination", "Final showroom finish inspection",
    ],
    best: ["Luxury vehicles", "Car enthusiasts", "Show vehicles", "Long-term paint protection"],
  },
];

const addons = [
  { n: "Pet Hair Removal", p: "40+" },
  { n: "Engine Bay Cleaning", p: "50" },
  { n: "Headlight Restoration", p: "60" },
  { n: "Ceramic Spray Upgrade", p: "75" },
  { n: "Odor Removal", p: "50" },
];

function Services() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20">
      <p className="font-display tracking-[0.3em] text-xs text-neon">SERVICES</p>
      <h1 className="font-display text-5xl sm:text-7xl font-black mt-3 leading-[1]">
        Built around <span className="text-gradient">your vehicle</span>.
      </h1>
      <p className="mt-6 max-w-xl text-muted-foreground">
        Three signature tiers, premium add-ons, and custom work all engineered to bring your vehicle back to its absolute best.
      </p>

      {/* Package cards */}
      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div key={t.id}
            className={`relative rounded-2xl p-7 border bg-surface/60 hover-lift flex flex-col ${
              t.feat ? "border-neon glow-soft" : "border-border"
            }`}>
            {t.feat && (
              <span className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-gradient-neon text-background text-[10px] font-display tracking-widest">
                MOST POPULAR
              </span>
            )}
            <p className="text-xs text-muted-foreground font-display tracking-widest">{t.tier.toUpperCase()}</p>
            <h3 className="font-display text-2xl mt-1">{t.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t.sub}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-display font-black">${t.price}</span>
              <span className="text-sm text-muted-foreground">starting</span>
            </div>
            <p className="text-xs text-muted-foreground">~ {t.time}</p>

            <ul className="mt-5 space-y-1.5 text-sm flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2"><Check className="w-4 h-4 text-neon shrink-0 mt-0.5" />{f}</li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-border/60">
              <p className="text-[10px] tracking-widest font-display text-muted-foreground">BEST FOR</p>
              <p className="text-xs text-muted-foreground mt-1">{t.best.join(" · ")}</p>
            </div>

            <Link to="/booking" search={{ package: t.id }}
              className="mt-6 block text-center px-5 py-3 rounded-full bg-gradient-neon text-background text-xs font-bold tracking-widest">
              BOOK {t.name.split(" ")[0].toUpperCase()}
            </Link>
          </div>
        ))}
      </div>

      {/* Scratch removal */}
      <div className="mt-10 p-7 rounded-2xl border border-neon/40 bg-gradient-to-r from-neon/10 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-display tracking-widest text-neon">CUSTOM WORK</p>
          <h3 className="font-display text-2xl mt-1">Scratch Removal</h3>
          <p className="text-sm text-muted-foreground mt-1">Every scratch is different we'll inspect and price it right. Custom quote.</p>
        </div>
        <Link to="/booking" search={{ package: "scratch" }}
          className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-gradient-neon text-background text-xs font-bold tracking-widest">
          REQUEST QUOTE
        </Link>
      </div>

      {/* AI estimator promo */}
      <div className="mt-10 p-7 rounded-2xl border border-border bg-surface/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="grid place-items-center w-12 h-12 rounded-lg bg-gradient-neon text-background"><Sparkles className="w-5 h-5" /></div>
          <div>
            <h3 className="font-display text-xl">Not sure what you need?</h3>
            <p className="text-sm text-muted-foreground mt-1">Use our AI estimator upload photos and get an instant price range.</p>
          </div>
        </div>
        <Link to="/quote" className="inline-flex items-center px-5 py-3 rounded-full glass border-neon/40 hover:border-neon text-xs font-display tracking-widest">
          OPEN ESTIMATOR
        </Link>
      </div>

      {/* Add-ons */}
      <h2 className="mt-24 font-display text-4xl font-bold">Optional <span className="text-gradient">add-ons</span></h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {addons.map((a) => (
          <div key={a.n} className="flex items-center justify-between p-4 rounded-lg border border-border bg-surface/40 hover:border-neon/40 transition">
            <span>{a.n}</span><span className="text-neon font-display">+${a.p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
