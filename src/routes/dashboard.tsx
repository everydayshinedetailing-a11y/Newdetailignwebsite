import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Car, Award, Download, User, Gift, Receipt } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Everyday Shine Detailing" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20">
      <div className="flex justify-between items-end flex-wrap gap-4">
        <div>
          <p className="font-display tracking-[0.3em] text-xs text-neon">CUSTOMER</p>
          <h1 className="font-display text-4xl sm:text-6xl font-black mt-3">Welcome back, <span className="text-gradient">Marco</span>.</h1>
        </div>
        <div className="flex items-center gap-3 glass px-4 py-2.5 rounded-full">
          <div className="w-9 h-9 rounded-full bg-gradient-neon grid place-items-center font-bold text-background">M</div>
          <div className="text-sm"><p className="font-display">Gold Member</p><p className="text-xs text-muted-foreground">2,340 pts</p></div>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-4 gap-4">
        {[
          { Icon: Calendar, l: "Next Appointment", v: "Sat · 2:00 PM" },
          { Icon: Award, l: "Membership", v: "Gold · 18 mo" },
          { Icon: Gift, l: "Reward Points", v: "2,340" },
          { Icon: Car, l: "Saved Vehicles", v: "3" },
        ].map(({ Icon, l, v }) => (
          <div key={l} className="p-5 rounded-2xl border border-border bg-surface/60">
            <Icon className="w-5 h-5 text-neon" />
            <p className="mt-3 text-xs text-muted-foreground font-display tracking-widest">{l.toUpperCase()}</p>
            <p className="font-display text-xl mt-1">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-surface/60">
          <h2 className="font-display text-2xl">Upcoming Bookings</h2>
          <div className="mt-5 space-y-3">
            {[
              { d: "Sat, Apr 12 · 2:00 PM", s: "Premium Detail", c: "911 Turbo S" },
              { d: "Fri, Apr 25 · 10:00 AM", s: "Ceramic Top-Up", c: "Model S" },
            ].map((b, i) => (
              <div key={i} className="flex flex-wrap justify-between items-center gap-3 p-4 rounded-lg border border-border bg-surface">
                <div><p className="font-display">{b.s}</p><p className="text-xs text-muted-foreground">{b.c} · {b.d}</p></div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-full glass text-xs">Reschedule</button>
                  <button className="px-3 py-1.5 rounded-full bg-neon text-background text-xs font-bold">Details</button>
                </div>
              </div>
            ))}
          </div>
          <h2 className="font-display text-2xl mt-10">Order History</h2>
          <div className="mt-5 space-y-3 text-sm">
            {[
              { d: "Mar 18, 2026", s: "Ceramic Reserve", t: "$1,800" },
              { d: "Feb 02, 2026", s: "Premium Detail", t: "$450" },
              { d: "Jan 12, 2026", s: "Express Shine", t: "$120" },
            ].map((o, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-border">
                <div><p>{o.s}</p><p className="text-xs text-muted-foreground">{o.d}</p></div>
                <div className="flex items-center gap-4"><span className="text-neon font-display">{o.t}</span><button className="text-xs flex items-center gap-1 text-muted-foreground hover:text-neon"><Download className="w-3 h-3" /> Invoice</button></div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-surface/60">
            <h3 className="font-display text-lg flex gap-2"><Car className="w-4 h-4 text-neon" /> Saved Vehicles</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {["2024 Porsche 911 Turbo S", "2023 Tesla Model S Plaid", "2019 Range Rover SV"].map((v) => (
                <li key={v} className="p-3 rounded-lg bg-surface border border-border">{v}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-neon/40 bg-gradient-to-br from-neon/10 to-transparent glow-soft">
            <h3 className="font-display text-lg flex gap-2"><Gift className="w-4 h-4 text-neon" /> Reward Tier</h3>
            <p className="text-sm text-muted-foreground mt-2">660 pts until <b className="text-foreground">Platinum</b></p>
            <div className="h-2 mt-3 rounded-full bg-surface overflow-hidden"><div className="h-full bg-gradient-neon" style={{ width: "78%" }} /></div>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-surface/60 space-y-3 text-sm">
            <h3 className="font-display text-lg flex gap-2"><User className="w-4 h-4 text-neon" /> Profile</h3>
            <input defaultValue="Marco D." className="w-full bg-input/60 border border-border rounded-md px-3 py-2" />
            <input defaultValue="marco@example.com" className="w-full bg-input/60 border border-border rounded-md px-3 py-2" />
            <button className="w-full px-4 py-2 rounded-full bg-gradient-neon text-background text-xs font-bold tracking-widest">SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
