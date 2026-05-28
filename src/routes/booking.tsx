import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Droplets, Zap } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  package: z.enum(["basic", "premium", "ultimate", "scratch"]).optional(),
});

export const Route = createFileRoute("/booking")({
  head: () => ({ meta: [{ title: "Book — Everyday Shine Detailing" }] }),
  validateSearch: searchSchema,
  component: Booking,
});

type Service = { id: string; n: string; p: number; time: string; blurb: string; custom?: boolean };
const services: Service[] = [
  { id: "basic", n: "Basic Detail", p: 99, time: "1–2 hr", blurb: "Maintenance & weekly drivers." },
  { id: "premium", n: "Premium Detail", p: 199, time: "3–4 hr", blurb: "Most popular complete detail." },
  { id: "ultimate", n: "Ultimate Showroom Package", p: 399, time: "1 day", blurb: "Full luxury experience." },
  { id: "scratch", n: "Scratch Removal", p: 0, time: "Custom", blurb: "Custom quote — we'll inspect and price.", custom: true },
];

const addons = [
  { id: "pet", n: "Pet Hair Removal", p: 40 },
  { id: "engine", n: "Engine Bay Cleaning", p: 50 },
  { id: "head", n: "Headlight Restoration", p: 60 },
  { id: "ceramic", n: "Ceramic Spray Upgrade", p: 75 },
  { id: "odor", n: "Odor Removal", p: 50 },
];

const steps = ["Vehicle", "Service", "Schedule", "Details", "Confirm"];

function Booking() {
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    make: "", model: "", year: "", color: "",
    service: (search.package as string) || "premium",
    addons: [] as string[],
    date: "", time: "",
    water: "" as "" | "yes" | "no",
    name: "", email: "", phone: "", address: "", notes: "", payment: "card",
  });

  useEffect(() => {
    if (search.package) setData((d) => ({ ...d, service: search.package as string }));
  }, [search.package]);

  const subtotal = useMemo(() => {
    const svc = services.find((x) => x.id === data.service);
    if (svc?.custom) return 0;
    const s = svc?.p || 0;
    const a = addons.filter((x) => data.addons.includes(x.id)).reduce((sum, x) => sum + x.p, 0);
    return s + a;
  }, [data]);

  const isCustom = services.find((x) => x.id === data.service)?.custom;

  const stepValid = useMemo(() => {
    if (step === 0) return !!(data.make && data.model && data.year && data.color);
    if (step === 2) return !!(data.date && data.time);
    if (step === 3) return !!(data.name && data.email && data.phone && data.address && data.water);
    return true;
  }, [step, data]);

  const next = () => { if (stepValid) setStep((s) => Math.min(steps.length - 1, s + 1)); };
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <p className="font-display tracking-[0.3em] text-xs text-neon">BOOKING</p>
      <h1 className="font-display text-5xl sm:text-6xl font-black mt-3">Reserve <span className="text-gradient">your slot</span>.</h1>

      <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-10">
          {/* Stepper */}
          <div className="flex items-center gap-2 sm:gap-4 mb-10 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2 shrink-0">
                <div className={`grid place-items-center w-8 h-8 rounded-full border text-xs font-display ${
                  i <= step ? "bg-gradient-neon text-background border-transparent glow-soft" : "border-border text-muted-foreground"
                }`}>{i + 1}</div>
                <span className={`text-xs tracking-widest ${i === step ? "text-neon" : "text-muted-foreground"}`}>{s.toUpperCase()}</span>
                {i < steps.length - 1 && <span className="w-6 h-px bg-border" />}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="grid sm:grid-cols-2 gap-4 animate-fade-up">
              <Field label="Make" required v={data.make} on={(v) => setData({ ...data, make: v })} ph="Porsche" />
              <Field label="Model" required v={data.model} on={(v) => setData({ ...data, model: v })} ph="911 Turbo S" />
              <Field label="Year" required v={data.year} on={(v) => setData({ ...data, year: v })} ph="2024" />
              <Field label="Color" required v={data.color} on={(v) => setData({ ...data, color: v })} ph="Jet Black" />
            </div>
          )}
          {step === 1 && (
            <div className="space-y-3 animate-fade-up">
              {services.map((s) => (
                <button key={s.id} onClick={() => setData({ ...data, service: s.id })}
                  className={`w-full text-left p-5 rounded-xl border flex justify-between items-center gap-4 transition ${
                    data.service === s.id ? "border-neon glow-soft bg-neon/5" : "border-border bg-surface/60 hover:border-neon/40"
                  }`}>
                  <div>
                    <p className="font-display">{s.n}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.blurb} · {s.time}</p>
                  </div>
                  <span className="text-neon font-display whitespace-nowrap">{s.custom ? "Custom" : `from $${s.p}`}</span>
                </button>
              ))}
              <p className="mt-6 text-xs tracking-widest text-muted-foreground font-display">ADD-ONS</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {addons.map((a) => {
                  const on = data.addons.includes(a.id);
                  return (
                    <button key={a.id} onClick={() => setData({ ...data, addons: on ? data.addons.filter((x) => x !== a.id) : [...data.addons, a.id] })}
                      className={`flex justify-between items-center p-4 rounded-lg border transition ${
                        on ? "border-neon bg-neon/5" : "border-border hover:border-neon/40"
                      }`}>
                      <span className="text-sm">{a.n}</span>
                      <span className="text-xs text-neon">+${a.p}{on && <Check className="inline w-3 h-3 ml-1" />}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="grid sm:grid-cols-2 gap-4 animate-fade-up">
              <Field type="date" required label="Date" v={data.date} on={(v) => setData({ ...data, date: v })} />
              <Field type="time" required label="Time" v={data.time} on={(v) => setData({ ...data, time: v })} />
              <div className="sm:col-span-2 p-4 rounded-lg glass text-xs text-muted-foreground">
                Slots sync with our calendar — you'll receive an SMS &amp; email confirmation within minutes of booking.
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="grid sm:grid-cols-2 gap-4 animate-fade-up">
              <Field label="Full name" required v={data.name} on={(v) => setData({ ...data, name: v })} />
              <Field label="Email" required type="email" v={data.email} on={(v) => setData({ ...data, email: v })} />
              <Field label="Phone" required v={data.phone} on={(v) => setData({ ...data, phone: v })} />
              <Field label="Service address" required v={data.address} on={(v) => setData({ ...data, address: v })} ph="Street, City, ZIP" />

              {/* Water & electricity access question */}
              <div className="sm:col-span-2 p-5 rounded-xl border border-neon/30 bg-neon/5">
                <p className="text-xs font-display tracking-widest text-neon flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5" /> <Zap className="w-3.5 h-3.5" /> ON-SITE ACCESS
                </p>
                <p className="mt-2 text-sm">Is there access to water and electricity within 100 feet of the house?</p>
                <div className="mt-3 flex gap-3">
                  {(["yes", "no"] as const).map((opt) => (
                    <button key={opt} onClick={() => setData({ ...data, water: opt })}
                      className={`flex-1 px-4 py-3 rounded-lg border text-sm font-display tracking-widest transition ${
                        data.water === opt ? "border-neon bg-neon/10 text-neon glow-soft" : "border-border hover:border-neon/40"
                      }`}>
                      {opt.toUpperCase()}
                    </button>
                  ))}
                </div>
                {data.water === "no" && (
                  <p className="mt-3 text-xs text-muted-foreground">No problem — we will contact you to gain further information about the situation.</p>
                )}
              </div>

              <div className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <label className="text-xs font-display tracking-widest text-muted-foreground">NOTES</label>
                <textarea value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })}
                  rows={4} className="mt-2 w-full bg-input/60 border border-border rounded-md p-3 focus:ring-1 focus:ring-neon focus:outline-none" />
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="animate-fade-up space-y-4">
              <div className="p-6 rounded-xl border border-neon/40 bg-neon/5 glow-soft">
                <h3 className="font-display text-2xl">
                  {isCustom ? "Request your custom quote" : "Confirm & pay deposit"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {isCustom
                    ? "We'll review your scratch removal request and reply with a tailored quote within hours."
                    : "A 20% refundable deposit secures your slot."}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <Detail l="Vehicle" v={`${data.year} ${data.make} ${data.model}`} />
                <Detail l="Service" v={services.find((s) => s.id === data.service)?.n || ""} />
                <Detail l="Date" v={`${data.date} ${data.time}`} />
                <Detail l="Customer" v={data.name} />
                <Detail l="Water/Power access" v={data.water ? data.water.toUpperCase() : "—"} />
                <Detail l="Address" v={data.address} />
              </div>
              {!isCustom && (
                <div className="space-y-3">
                  <p className="text-xs font-display tracking-widest text-muted-foreground">PAYMENT METHOD</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "card", label: "Card" },
                      { id: "paypal", label: "PayPal" },
                      { id: "venmo", label: "Venmo" },
                      { id: "cashapp", label: "Cash App" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setData({ ...data, payment: m.id })}
                        className={`px-4 py-3 rounded-lg border text-sm font-display tracking-widest transition ${
                          data.payment === m.id
                            ? "border-neon bg-neon/10 text-neon glow-soft"
                            : "border-border hover:border-neon/40"
                        }`}
                      >
                        {m.label.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    PayPal, Venmo &amp; Cash App coming soon — choose Card to pay your deposit today.
                  </p>
                </div>
              )}
              <button
                disabled={!isCustom && data.payment !== "card"}
                className="w-full mt-4 px-6 py-4 rounded-full bg-gradient-neon text-background font-bold tracking-widest text-sm glow-neon disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isCustom ? "REQUEST QUOTE" : `PAY DEPOSIT · $${Math.round(subtotal * 0.2)}`}
              </button>
            </div>
          )}


          <div className="mt-10 flex justify-between">
            <button onClick={back} disabled={step === 0} className="px-5 py-2.5 rounded-full glass text-sm disabled:opacity-30">Back</button>
            {step < steps.length - 1 && (
              <button onClick={next} disabled={!stepValid}
                className="px-6 py-2.5 rounded-full bg-gradient-neon text-background text-sm font-bold tracking-widest inline-flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Live summary */}
        <aside className="rounded-2xl border border-border bg-surface/60 p-6 h-fit lg:sticky lg:top-28">
          <p className="font-display tracking-widest text-xs text-neon">LIVE SUMMARY</p>
          <div className="mt-4 space-y-2 text-sm">
            <Row l="Vehicle" v={`${data.year || "—"} ${data.make || ""}`.trim()} />
            <Row l="Service" v={services.find((s) => s.id === data.service)?.n || "—"} />
            <Row l="Add-ons" v={data.addons.length ? `${data.addons.length} selected` : "None"} />
            <Row l="Date" v={data.date || "—"} />
            <Row l="Water/Power" v={data.water ? data.water.toUpperCase() : "—"} />
          </div>
          <div className="mt-6 pt-6 border-t border-border flex justify-between items-baseline">
            <span className="text-xs font-display tracking-widest text-muted-foreground">TOTAL</span>
            <span className="text-3xl font-display font-black text-gradient transition-all">
              {isCustom ? "TBD" : `$${subtotal}`}
            </span>
          </div>
          
          {isCustom && <p className="text-xs text-muted-foreground mt-2">Scratch removal is priced per inspection.</p>}
        </aside>
      </div>
    </div>
  );
}

function Field({ label, v, on, type = "text", ph = "", required = false }: { label: string; v: string; on: (v: string) => void; type?: string; ph?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs font-display tracking-widest text-muted-foreground">
        {label.toUpperCase()}{required && <span className="text-neon ml-1">*</span>}
      </label>
      <input type={type} value={v} placeholder={ph} required={required} onChange={(e) => on(e.target.value)}
        className="mt-2 w-full bg-input/60 border border-border rounded-md px-3 py-2.5 focus:ring-1 focus:ring-neon focus:outline-none" />
    </div>
  );
}
function Row({ l, v }: { l: string; v: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{l}</span><span>{v}</span></div>;
}
function Detail({ l, v }: { l: string; v: string }) {
  return <div className="p-3 rounded-lg bg-surface border border-border"><p className="text-xs text-muted-foreground">{l}</p><p className="font-display mt-0.5">{v || "—"}</p></div>;
}
