import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Sparkles, Upload, X, ArrowRight, Loader2, Wand2 } from "lucide-react";

export const Route = createFileRoute("/quote")({
  head: () => ({ meta: [
    { title: "AI Quote Estimator Everyday Shine Detailing" },
    { name: "description", content: "Get an instant AI-powered price estimate for your detail. Upload photos and answer a few questions." },
  ] }),
  component: Quote,
});

type Photo = { id: string; url: string };

const vehicleTypes = ["Sedan", "Coupe", "SUV", "Truck", "Van", "Exotic"] as const;
const conditions = [
  { id: "pristine", n: "Pristine", w: 0 },
  { id: "average", n: "Average", w: 0.15 },
  { id: "dirty", n: "Heavily soiled", w: 0.35 },
  { id: "neglected", n: "Neglected / detail overdue", w: 0.6 },
] as const;
const wants = [
  { id: "interior", n: "Deep interior", w: 60 },
  { id: "pet", n: "Pet hair", w: 40 },
  { id: "odor", n: "Odor removal", w: 50 },
  { id: "polish", n: "Paint correction", w: 200 },
  { id: "ceramic", n: "Ceramic protection", w: 150 },
  { id: "engine", n: "Engine bay", w: 50 },
  { id: "headlights", n: "Headlight restoration", w: 60 },
] as const;

type Estimate = {
  low: number;
  high: number;
  hours: string;
  pkg: "basic" | "premium" | "ultimate";
  pkgName: string;
  notes: string[];
};

function Quote() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [vehicle, setVehicle] = useState<string>("Sedan");
  const [condition, setCondition] = useState<string>("average");
  const [selectedWants, setSelectedWants] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files).slice(0, 6 - photos.length).map((f) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(f),
    }));
    setPhotos((p) => [...p, ...next]);
  };

  const toggleWant = (id: string) =>
    setSelectedWants((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const run = () => {
    setLoading(true);
    setEstimate(null);
    setTimeout(() => {
      const cond = conditions.find((c) => c.id === condition)!;
      const sizeMult = vehicle === "SUV" || vehicle === "Truck" || vehicle === "Van" ? 1.15 : vehicle === "Exotic" ? 1.35 : 1;
      const wantAdds = wants.filter((w) => selectedWants.includes(w.id)).reduce((s, w) => s + w.w, 0);

      const heavyWant = selectedWants.includes("polish") || selectedWants.includes("ceramic");
      const pkg: Estimate["pkg"] = heavyWant || cond.w >= 0.5
        ? "ultimate"
        : selectedWants.length >= 2 || cond.w >= 0.25
        ? "premium"
        : "basic";
      const base = pkg === "ultimate" ? 399 : pkg === "premium" ? 199 : 99;
      const pkgName = pkg === "ultimate" ? "Ultimate Showroom Package" : pkg === "premium" ? "Premium Detail" : "Basic Detail";

      const mid = Math.round((base + wantAdds) * (1 + cond.w) * sizeMult);
      const low = Math.round(mid * 0.9);
      const high = Math.round(mid * 1.18);

      const hours = pkg === "ultimate" ? "6–8 hrs" : pkg === "premium" ? "3–4 hrs" : "1–2 hrs";

      const notes: string[] = [];
      if (cond.w >= 0.35) notes.push("Heavy soiling detected extra decontamination time included.");
      if (selectedWants.includes("polish")) notes.push("Paint correction adds significant labor and product cost.");
      if (vehicle === "Exotic") notes.push("Exotic surcharge applied for premium materials and care protocols.");
      if (photos.length > 0) notes.push(`${photos.length} photo${photos.length > 1 ? "s" : ""} analyzed for surface assessment.`);
      if (!notes.length) notes.push("Vehicle appears in standard condition for the selected package.");

      setEstimate({ low, high, hours, pkg, pkgName, notes });
      setLoading(false);
    }, 1600);
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-20">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] tracking-[0.3em] font-display">
        <Sparkles className="w-3 h-3 text-neon" /> AI ESTIMATOR
      </div>
      <h1 className="font-display text-5xl sm:text-7xl font-black mt-4">Instant <span className="text-gradient">quote</span>.</h1>
      <p className="mt-4 text-muted-foreground max-w-xl">Upload photos and tell us what you need our system returns an estimated range, recommended package, and completion time in seconds.</p>

      <div className="mt-12 grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-8 space-y-8">
          {/* Photos */}
          <div>
            <p className="text-xs font-display tracking-widest text-neon">1 · UPLOAD PHOTOS</p>
            <p className="text-xs text-muted-foreground mt-1">Up to 6 images exterior, interior, problem areas.</p>
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {photos.map((p) => (
                <div key={p.id} className="relative aspect-square rounded-lg overflow-hidden border border-border group">
                  <img src={p.url} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => setPhotos((ps) => ps.filter((x) => x.id !== p.id))}
                    className="absolute top-1 right-1 grid place-items-center w-6 h-6 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {photos.length < 6 && (
                <button onClick={() => inputRef.current?.click()}
                  className="aspect-square rounded-lg border border-dashed border-neon/40 grid place-items-center hover:border-neon hover:bg-neon/5 transition">
                  <Upload className="w-5 h-5 text-neon" />
                </button>
              )}
            </div>
            <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(e) => onFiles(e.target.files)} />
          </div>

          {/* Vehicle type */}
          <div>
            <p className="text-xs font-display tracking-widest text-neon">2 · VEHICLE TYPE</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {vehicleTypes.map((v) => (
                <button key={v} onClick={() => setVehicle(v)}
                  className={`px-4 py-2 rounded-full text-xs font-display tracking-widest transition ${
                    vehicle === v ? "bg-gradient-neon text-background glow-soft" : "glass hover:border-neon"
                  }`}>{v.toUpperCase()}</button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <p className="text-xs font-display tracking-widest text-neon">3 · CURRENT CONDITION</p>
            <div className="mt-3 grid sm:grid-cols-2 gap-2">
              {conditions.map((c) => (
                <button key={c.id} onClick={() => setCondition(c.id)}
                  className={`p-3 rounded-lg text-sm text-left border transition ${
                    condition === c.id ? "border-neon bg-neon/5 glow-soft" : "border-border hover:border-neon/40"
                  }`}>{c.n}</button>
              ))}
            </div>
          </div>

          {/* Wants */}
          <div>
            <p className="text-xs font-display tracking-widest text-neon">4 · WHAT DO YOU NEED?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {wants.map((w) => {
                const on = selectedWants.includes(w.id);
                return (
                  <button key={w.id} onClick={() => toggleWant(w.id)}
                    className={`px-3 py-2 rounded-full text-xs border transition ${
                      on ? "border-neon bg-neon/10 text-neon" : "border-border hover:border-neon/40"
                    }`}>{w.n}</button>
                );
              })}
            </div>
          </div>

          <button onClick={run} disabled={loading}
            className="w-full px-6 py-4 rounded-full bg-gradient-neon text-background font-bold tracking-widest text-sm glow-neon inline-flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> ANALYZING...</> : <><Wand2 className="w-4 h-4" /> GENERATE ESTIMATE</>}
          </button>
        </div>

        {/* Result */}
        <aside className="rounded-2xl border border-border bg-surface/60 p-6 h-fit lg:sticky lg:top-28 min-h-[300px]">
          <p className="font-display tracking-widest text-xs text-neon">ESTIMATE</p>
          {!estimate && !loading && (
            <div className="mt-6 text-sm text-muted-foreground">
              Fill out the form and tap <span className="text-neon">Generate Estimate</span> to receive your AI-powered quote.
            </div>
          )}
          {loading && (
            <div className="mt-10 flex flex-col items-center gap-3 text-muted-foreground text-sm animate-fade-up">
              <Loader2 className="w-6 h-6 text-neon animate-spin" />
              Analyzing vehicle & conditions...
            </div>
          )}
          {estimate && (
            <div className="mt-4 animate-fade-up">
              <p className="text-xs text-muted-foreground">Estimated price range</p>
              <p className="text-4xl font-display font-black text-gradient mt-1">
                ${estimate.low}–${estimate.high}
              </p>
              <div className="mt-5 p-4 rounded-xl border border-neon/40 bg-neon/5">
                <p className="text-xs tracking-widest font-display text-neon">RECOMMENDED</p>
                <p className="font-display text-lg mt-1">{estimate.pkgName}</p>
                <p className="text-xs text-muted-foreground mt-1">Completion: {estimate.hours}</p>
              </div>
              <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
                {estimate.notes.map((n, i) => <li key={i} className="flex gap-2"><span className="text-neon">›</span>{n}</li>)}
              </ul>
              <Link to="/booking" search={{ package: estimate.pkg }}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-neon text-background text-xs font-bold tracking-widest">
                BOOK THIS PACKAGE <ArrowRight className="w-3 h-3" />
              </Link>
              <p className="text-[10px] text-muted-foreground mt-3 text-center">Final price confirmed on inspection.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
