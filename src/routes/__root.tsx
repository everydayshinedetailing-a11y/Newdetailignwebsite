import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

function NotFoundComponent() {
  return (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-7xl font-black text-gradient">404</h1>
        <p className="mt-4 text-muted-foreground">This page took a wrong turn off the showroom floor.</p>
        <Link to="/" className="mt-6 inline-flex px-6 py-3 rounded-full bg-gradient-neon text-background font-bold tracking-widest text-xs">RETURN HOME</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-2xl font-bold">Something went sideways.</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 px-6 py-3 rounded-full bg-gradient-neon text-background text-xs font-bold tracking-widest"
        >TRY AGAIN</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Everyday Shine Detailing — Concours-Grade Auto Detailing" },
      { name: "description", content: "Luxury fully-mobile auto detailing. Ceramic coatings, paint correction, interior restoration. Servicing Massachusetts." },
      { name: "theme-color", content: "#05070d" },
      { property: "og:title", content: "Everyday Shine Detailing — Concours-Grade Auto Detailing" },
      { property: "og:description", content: "Luxury fully-mobile auto detailing. Ceramic coatings, paint correction, interior restoration. Servicing Massachusetts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Everyday Shine Detailing — Concours-Grade Auto Detailing" },
      { name: "twitter:description", content: "Luxury fully-mobile auto detailing. Ceramic coatings, paint correction, interior restoration. Servicing Massachusetts." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/400375c7-28a7-4423-859c-931084d14357/id-preview-93f62320--1480f68b-755d-4e25-9591-b8d03dcadf41.lovable.app-1779192099640.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/400375c7-28a7-4423-859c-931084d14357/id-preview-93f62320--1480f68b-755d-4e25-9591-b8d03dcadf41.lovable.app-1779192099640.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 pt-20">
          <Outlet />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </QueryClientProvider>
  );
}
