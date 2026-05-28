import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";

// Premium footer with grid columns, neon brand bar, and social
export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-surface">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-neon opacity-70" />
      <div className="mx-auto max-w-7xl px-5 py-16 grid gap-12 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-10 h-10 rounded-md bg-gradient-neon">
              <span className="font-display font-black text-background">ES</span>
            </span>
            <span className="font-display font-bold tracking-widest">
              EVERYDAY <span className="text-neon">SHINE</span> DETAILING
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Museum-grade detailing for drivers who refuse to compromise. Concours-level
            finish, every appointment.
          </p>
          <div className="flex gap-2 pt-2">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: TikTokIcon, label: "TikTok" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Youtube, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid place-items-center w-10 h-10 rounded-md glass hover:bg-neon hover:text-background transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Explore" items={[
          { to: "/services", label: "Services" },
          { to: "/gallery", label: "Gallery" },
          { to: "/quote", label: "AI Quote" },
          { to: "/membership", label: "Membership" },
          { to: "/booking", label: "Book a Detail" },
        ]} />

        <FooterCol title="Account" items={[
          { to: "/dashboard", label: "Customer Dashboard" },
          { to: "/admin", label: "Admin Panel" },
          { to: "/about", label: "Our Story" },
          { to: "/contact", label: "Contact" },
        ]} />

        <div className="space-y-3 text-sm">
          <h4 className="font-display tracking-widest text-xs text-neon">CONTACT</h4>
          <a href="tel:+15082330213" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <Phone className="w-4 h-4" /> (508) 505-6188
          </a>
          <a href="mailto:everydayshinedetailing@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground break-all">
            <Mail className="w-4 h-4" /> everydayshinedetailing@gmail.com
          </a>
          <p className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            Servicing Rhode Island &amp; surrounding areas
          </p>
        </div>
      </div>

      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Everyday Shine Detailing. All rights reserved.</p>
          <p className="tracking-widest">CRAFTED · POLISHED · PROTECTED</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { to: string; label: string }[] }) {
  return (
    <div className="space-y-3 text-sm">
      <h4 className="font-display tracking-widest text-xs text-neon">{title.toUpperCase()}</h4>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="text-muted-foreground hover:text-foreground transition">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 3a5 5 0 0 0 4.5 4v3a8 8 0 0 1-4.5-1.4V15a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3h3z" />
    </svg>
  );
}
