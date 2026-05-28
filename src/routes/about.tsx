import { createFileRoute } from "@tanstack/react-router";
import showcase from "@/assets/showcase1.jpg";
import interior from "@/assets/interior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Everyday Shine Detailing" }, { name: "description", content: "The craft and obsession behind Everyday Shine Detailing — fully mobile luxury auto detailing in Massachusetts." }] }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <p className="font-display tracking-[0.3em] text-xs text-neon">OUR STORY</p>
      <h1 className="font-display text-5xl sm:text-7xl font-black mt-3 leading-[1] max-w-3xl">
        Built on an <span className="text-gradient">obsession</span> with finish.
      </h1>
      <div className="grid lg:grid-cols-2 gap-12 mt-16 items-center">
        <img src={showcase} alt="Mobile detailing in progress" className="rounded-2xl shadow-lux" />
        <div className="space-y-5 text-muted-foreground">
          <p>Everyday Shine Detailing was founded on a simple belief: a car is more than transportation it's a statement, an investment, a sanctuary. We treat every vehicle like the irreplaceable object it is.</p>
          <p>We're a mobile operation.We bring our pro-grade detailing chemistry directly to your driveway concours-level care without ever leaving home.</p>
          <p>From the daily driver to the garage queen, every appointment receives the same surgical care.</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-8 mt-24">
        {[
          { t: "Craft", d: "Tooling and chemistry sourced from the world's leading concours houses." },
          { t: "Care", d: "Obsessed with protecting your investment." },
          { t: "Concierge", d: "Pickup, delivery, and maintenance plans that fit your life." },
        ].map((b) => (
          <div key={b.t} className="rounded-2xl border border-border p-6 bg-surface/60">
            <h3 className="font-display text-2xl text-neon">{b.t}</h3>
            <p className="text-sm text-muted-foreground mt-2">{b.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-4xl font-bold">Built for <span className="text-gradient">the long run</span>.</h2>
          <p className="mt-4 text-muted-foreground">Detailing isn't a one-time service it's a relationship. Our maintenance plans keep your finish concours-fresh, year after year or month after month.</p>
        </div>
        <img src={interior} alt="Interior" loading="lazy" className="rounded-2xl shadow-lux" />
      </div>
    </div>
  );
}
