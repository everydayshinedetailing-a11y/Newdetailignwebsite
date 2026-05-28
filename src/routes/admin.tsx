import { createFileRoute } from "@tanstack/react-router";
import { Users, DollarSign, Calendar, Package, Star, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Everyday Shine Detailing" }] }),
  component: Admin,
});

function Admin() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20">
      <p className="font-display tracking-[0.3em] text-xs text-neon">ADMIN PANEL</p>
      <h1 className="font-display text-4xl sm:text-5xl font-black mt-3">Control <span className="text-gradient">Panel</span>.</h1>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { Icon: DollarSign, l: "Revenue (mo)", v: "$48,290", d: "+12%" },
          { Icon: Calendar, l: "Bookings (mo)", v: "127", d: "+8%" },
          { Icon: Users, l: "Active Members", v: "342", d: "+5%" },
          { Icon: Star, l: "Avg Review", v: "4.97", d: "+0.02" },
        ].map(({ Icon, l, v, d }) => (
          <div key={l} className="p-5 rounded-2xl border border-border bg-surface/60 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-neon/10 blur-2xl" />
            <Icon className="w-5 h-5 text-neon" />
            <p className="mt-3 text-xs text-muted-foreground font-display tracking-widest">{l.toUpperCase()}</p>
            <div className="mt-1 flex items-end justify-between"><p className="font-display text-2xl">{v}</p><span className="text-xs text-emerald-400">{d}</span></div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-surface/60">
          <div className="flex justify-between items-center"><h2 className="font-display text-2xl">Bookings</h2><button className="px-4 py-2 rounded-full bg-gradient-neon text-background text-xs font-bold tracking-widest">NEW</button></div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs font-display tracking-widest text-muted-foreground">
                <tr><th className="p-3">Customer</th><th className="p-3">Service</th><th className="p-3">Date</th><th className="p-3">Status</th></tr>
              </thead>
              <tbody>
                {[
                  ["Sean B.", "Interior Detail", "June 12 · 2pm", "Deposit Pending"],
                  ["Rebecca B.", "Exterior Detail", "June 13 · 9am", "Deposit Pending"],
                  ["Tyler W.", "Interior Detail", "June 14 · 11am", "Deposit Pending"],
                  ["Blake B.", "Exterior Detail", "June 16 · 10am", "Deposit Pending"],
                  ["Austin L.", "Interior Detail", "June 18 · 3pm", "Deposit Pending"],
                ].map((r, i) => (
                  <tr key={i} className="border-t border-border/40">
                    {r.map((c, j) => (
                      <td key={j} className="p-3">{j === 3 ? <span className={`px-2 py-0.5 rounded-full text-xs ${c === "Confirmed" ? "bg-neon/20 text-neon" : c === "Completed" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>{c}</span> : c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-surface/60">
            <h3 className="font-display text-lg flex gap-2"><TrendingUp className="w-4 h-4 text-neon" /> Revenue (7d)</h3>
            <div className="flex items-end gap-2 mt-5 h-32">
              {[40, 65, 50, 80, 70, 95, 88].map((v, i) => (
                <div key={i} className="flex-1 rounded-t bg-gradient-neon" style={{ height: `${v}%` }} />
              ))}
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-surface/60">
            <h3 className="font-display text-lg flex gap-2"><Package className="w-4 h-4 text-neon" /> Inventory</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[["Steam Cleaner", 0], ["Wet/Dry Vacuum", 1], ["Air Compressor", 1], ["Microfiber Set", 12], ["Leather Balm", 7], ["Quick Detailer", 31]].map(([n, q], i) => (
                <li key={i} className="flex justify-between"><span>{n}</span><span className={typeof q === "number" && q < 10 ? "text-amber-400" : "text-neon"}>{q} units</span></li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-surface/60">
            <h3 className="font-display text-lg">Staff</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {[["BB", "Blake B.", "Off"], ["SB", "Sean B.", "Off"], ["TW", "Tyler W.", "Off"]].map(([i, n, s]) => (
                <li key={n} className="flex items-center gap-3"><span className="grid place-items-center w-8 h-8 rounded-full bg-gradient-neon text-background font-bold text-xs">{i}</span><span className="flex-1">{n}</span><span className="text-xs text-muted-foreground">{s}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
