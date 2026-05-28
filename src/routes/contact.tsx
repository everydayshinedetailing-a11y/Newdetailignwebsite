import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Instagram, Youtube, Facebook, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Everyday Shine Detailing" }] }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-7xl px-5 py-20">
      <p className="font-display tracking-[0.3em] text-xs text-neon">CONTACT</p>
      <h1 className="font-display text-5xl sm:text-7xl font-black mt-3">Let's <span className="text-gradient">talk shine</span>.</h1>

      <div className="mt-12 grid lg:grid-cols-3 gap-5">
        {[
          { Icon: Phone, t: "Call", v: "(508) 505-6188", href: "tel:+15082330213" },
          { Icon: Mail, t: "Email", v: "everydayshinedetailing@gmail.com", href: "mailto:everydayshinedetailing@gmail.com" },
          { Icon: MapPin, t: "Service Area", v: "Massachusetts · Fully mobile · By appointment" },
        ].map(({ Icon, t, v, href }) => (
          <a key={t} href={href} className="p-6 rounded-2xl border border-border bg-surface/60 hover:border-neon/50 hover-lift">
            <Icon className="w-5 h-5 text-neon" />
            <p className="mt-4 text-xs font-display tracking-widest text-muted-foreground">{t.toUpperCase()}</p>
            <p className="mt-1 font-display break-all">{v}</p>
          </a>
        ))}
      </div>

      <div className="mt-12 grid lg:grid-cols-2 gap-8">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-2xl border border-border bg-surface/40 p-8 space-y-4">
          <h2 className="font-display text-2xl">Send a message</h2>
          {["Name", "Email", "Subject"].map((l) => (
            <div key={l}>
              <label className="text-xs font-display tracking-widest text-muted-foreground">{l.toUpperCase()}</label>
              <input required className="mt-2 w-full bg-input/60 border border-border rounded-md px-3 py-2.5 focus:ring-1 focus:ring-neon focus:outline-none" />
            </div>
          ))}
          <div>
            <label className="text-xs font-display tracking-widest text-muted-foreground">MESSAGE</label>
            <textarea required rows={5} className="mt-2 w-full bg-input/60 border border-border rounded-md p-3 focus:ring-1 focus:ring-neon focus:outline-none" />
          </div>
          <button className="px-6 py-3 rounded-full bg-gradient-neon text-background text-sm font-bold tracking-widest inline-flex gap-2 items-center">
            <Send className="w-4 h-4" /> SEND
          </button>
          {sent && <p className="text-neon text-sm">Message received. We'll be in touch within 24 hours.</p>}
        </form>

        <div className="space-y-5">
          <div className="p-6 rounded-2xl border border-border bg-surface/40">
            <h3 className="font-display text-xl flex items-center gap-2"><Clock className="w-4 h-4 text-neon" /> Hours</h3>
            <ul className="mt-3 text-sm text-muted-foreground space-y-1">
              <li className="flex justify-between"><span>Mon – Fri</span><span>8:00 – 19:00</span></li>
              <li className="flex justify-between"><span>Saturday</span><span>9:00 – 17:00</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>By appointment</span></li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-neon/40 bg-gradient-to-br from-neon/10 to-transparent glow-soft">
            <h3 className="font-display text-xl">Emergency Detailing</h3>
            <p className="mt-2 text-sm text-muted-foreground">Spilled coffee? Pre-sale showing? Storm damage? Call us 24/7.</p>
            <a href="tel:+15082330213" className="mt-4 inline-flex items-center gap-2 text-neon font-display tracking-widest text-sm">CALL NOW →</a>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden border border-border">
            <iframe title="Map" src="https://www.openstreetmap.org/export/embed.html?bbox=-71.4%2C42.0%2C-70.9%2C42.5&layer=mapnik" className="w-full h-full grayscale invert opacity-80" loading="lazy" />
          </div>
          <div className="flex gap-2">
            {[Instagram, Youtube, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="grid place-items-center w-12 h-12 rounded-lg glass hover:bg-neon hover:text-background transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
