import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/membership")({
  head: () => ({ meta: [
    { title: "Membership — Everyday Shine Detailing" },
    { name: "description", content: "Year-round detailing memberships with monthly basic, premium, or ultimate service." },
  ] }),
  component: Membership,
});

const plans = [
  {
    id: "basic", n: "Shine Basic", p: 89, period: "/mo",
    tag: "Built on the Basic Detail",
    f: [
      "1 Basic Detail per month",
      "10% off all add-ons",
      "Priority booking",
      "Free top-up spray wax between visits",
    ],
    pkg: "basic" as const,
  },
  {
    id: "premium", n: "Shine Premium", p: 179, period: "/mo", feat: true,
    tag: "Built on the Premium Detail",
    f: [
      "1 Premium Detail per month",
      "15% off all services & add-ons",
      "Free pickup & delivery (in-zone)",
      "Quarterly headlight refresh",
      "Members-only scheduling window",
    ],
    pkg: "premium" as const,
  },
  {
    id: "ultimate", n: "Shine Ultimate", p: 349, period: "/mo",
    tag: "Built on the Ultimate Showroom Package",
    f: [
      "1 Ultimate Showroom service every 6 weeks",
      "25% off all services & add-ons",
      "Annual ceramic coating top-up",
      "Concierge support & loaner pickup",
      "Complimentary scratch inspection",
    ],
    pkg: "ultimate" as const,
  },
];

function Membership() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <p className="font-display tracking-[0.3em] text-xs text-neon">MEMBERSHIP</p>
      <h1 className="font-display text-5xl sm:text-7xl font-black mt-3">Year-round <span className="text-gradient">perfection</span>.</h1>
      <p className="mt-6 max-w-xl text-muted-foreground">
        Maintenance plans engineered to keep your finish concours-fresh every week of the year. Built around our three core packages. Cancel anytime.
      </p>

      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.id}
            className={`relative rounded-2xl p-8 border bg-surface/60 hover-lift flex flex-col ${
              p.feat ? "border-neon glow-soft" : "border-border"
            }`}>
            {p.feat && (
              <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-gradient-neon text-background text-[10px] font-display tracking-widest">
                MOST POPULAR
              </span>
            )}
            <h3 className="font-display text-2xl">{p.n}</h3>
            <p className="text-xs text-muted-foreground mt-1">{p.tag}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-display font-black">${p.p}</span>
              <span className="text-muted-foreground">{p.period}</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm flex-1">
              {p.f.map((x) => <li key={x} className="flex gap-2"><Check className="w-4 h-4 text-neon shrink-0 mt-0.5" />{x}</li>)}
            </ul>
            <Link to="/booking" search={{ package: p.pkg }}
              className="mt-8 block text-center px-5 py-3 rounded-full bg-gradient-neon text-background text-xs font-bold tracking-widest">
              ENROLL & BOOK FIRST DETAIL
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-20 p-8 rounded-2xl border border-border bg-surface/40">
        <h2 className="font-display text-3xl">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-6 mt-6 text-sm text-muted-foreground">
          {["Pick your plan and schedule.", "We service your car on your terms with our mobile detail.", "Earn rewards points with every visit, redeem on next service."].map((s, i) => (
            <div key={i}><span className="text-neon font-display text-2xl">0{i + 1}</span><p className="mt-2">{s}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}
