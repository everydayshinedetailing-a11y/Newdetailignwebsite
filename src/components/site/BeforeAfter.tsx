import { useRef, useState } from "react";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

// Draggable before/after image slider
export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement | null>(null);

  const move = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  };

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden select-none shadow-lux border border-border"
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onClick={(e) => move(e.clientX)}
    >
      <img src={afterImg} alt="After detailing" className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={beforeImg}
          alt="Before detailing"
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
        />
      </div>
      {/* divider */}
      <div
        className="absolute top-0 bottom-0 w-px bg-neon glow-neon"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-2 border-neon glow-neon grid place-items-center cursor-grab">
          <span className="text-neon text-xs">◀▶</span>
        </div>
      </div>
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs font-display tracking-widest">BEFORE</div>
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-neon text-background text-xs font-display tracking-widest">AFTER</div>
    </div>
  );
}
