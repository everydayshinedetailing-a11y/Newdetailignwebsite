import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
// Sticky luxury navbar with glass effect, scroll shrink, and mobile drawer
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/quote", label: "Quote" },
  { to: "/membership", label: "Membership" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Everyday Shine Detailing" className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover ring-1 ring-neon/40 group-hover:ring-neon transition" />
          <span className="hidden sm:inline font-display font-bold tracking-widest text-sm sm:text-base">
            EVERYDAY <span className="text-neon">SHINE</span> DETAILING
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group relative px-4 py-2 text-sm tracking-wide text-muted-foreground hover:text-foreground transition"
              activeProps={{ className: "text-foreground" }}
            >
              <span>{l.label}</span>
              <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-neon scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+15082330213"
            className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground hover:text-neon transition"
          >
            <Phone className="w-3.5 h-3.5" /> (508) 505-6188
          </a>
          <Link
            to="/booking"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-gradient-neon text-background text-xs font-bold tracking-widest uppercase hover:scale-[1.03] transition glow-soft"
          >
            Book Now
          </Link>
          <button
            aria-label="Menu"
            className="lg:hidden p-2 rounded-md glass"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden glass-strong border-t border-border animate-fade-up">
          <div className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-muted-foreground hover:text-neon transition"
                activeProps={{ className: "text-neon" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="mt-2 text-center py-3 rounded-full bg-gradient-neon text-background font-bold tracking-widest text-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
