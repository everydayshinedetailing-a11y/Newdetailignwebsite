import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import showcase from "@/assets/showcase1.jpg";
import ceramic from "@/assets/ceramic.jpg";
import interior from "@/assets/interior.jpg";
import detail from "@/assets/detail-polish.jpg";
import wheel from "@/assets/wheel.jpg";
import after from "@/assets/after.jpg";
import before from "@/assets/before.jpg";
import { BeforeAfter } from "@/components/site/BeforeAfter";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Everyday Shine Detailing" }] }),
  component: Gallery,
});

const items = [
  { src: heroCar, tag: "Exterior" }, { src: ceramic, tag: "Ceramic" },
  { src: interior, tag: "Interior" }, { src: showcase, tag: "Mobile" },
  { src: detail, tag: "Polish" }, { src: wheel, tag: "Wheels" },
  { src: after, tag: "Exterior" }, { src: before, tag: "Before" },
];
const filters = ["All", "Exterior", "Interior", "Ceramic", "Wheels", "Mobile"];

function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = filter === "All" ? items : items.filter((i) => i.tag === filter);

  return (
    <div className="mx-auto max-w-7xl px-5 py-20">
      <p className="font-display tracking-[0.3em] text-xs text-neon">GALLERY</p>
      <h1 className="font-display text-5xl sm:text-7xl font-black mt-3">The <span className="text-gradient">portfolio</span>.</h1>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-display tracking-widest transition ${
              filter === f ? "bg-gradient-neon text-background" : "glass hover:border-neon"
            }`}
          >{f.toUpperCase()}</button>
        ))}
      </div>

      <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((it, i) => (
          <button
            key={i}
            onClick={() => setLightbox(it.src)}
            className="block w-full break-inside-avoid relative group rounded-xl overflow-hidden border border-border"
            style={{ aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "1/1" : "3/4" }}
          >
            <img src={it.src} alt={it.tag} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition" />
            <span className="absolute bottom-3 left-3 px-2 py-1 rounded glass text-xs">{it.tag}</span>
          </button>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="font-display text-3xl font-bold mb-6">Before / After</h2>
        <BeforeAfter />
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur grid place-items-center p-6 animate-fade-up" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 glass rounded-full p-2"><X className="w-5 h-5" /></button>
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-2xl shadow-lux" />
        </div>
      )}
    </div>
  );
}
