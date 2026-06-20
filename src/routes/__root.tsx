import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Disclaimer } from "@/components/afs/Disclaimer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AFS Legal — Advocates & Legal Consultants | Tiruchirappalli" },
      { name: "description", content: "AFS Legal is a multidisciplinary law firm in Tiruchirappalli providing litigation, dispute resolution and advisory services for individuals, businesses and institutions across Tamil Nadu." },
      { name: "author", content: "AFS Legal" },
      { property: "og:site_name", content: "AFS Legal" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "AFS Legal — Advocates & Legal Consultants | Tiruchirappalli" },
      { property: "og:description", content: "AFS Legal is a multidisciplinary law firm in Tiruchirappalli providing litigation, dispute resolution and advisory services for individuals, businesses and institutions across Tamil Nadu." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#f8f6f2" },
      { name: "twitter:title", content: "AFS Legal — Advocates & Legal Consultants | Tiruchirappalli" },
      { name: "twitter:description", content: "AFS Legal is a multidisciplinary law firm in Tiruchirappalli providing litigation, dispute resolution and advisory services for individuals, businesses and institutions across Tamil Nadu." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/65d5c6b5-b789-4352-b182-7315d5649c95/id-preview-93e2951e--27ebacac-fe45-4b92-9185-d36b505f1120.lovable.app-1781946188833.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/65d5c6b5-b789-4352-b182-7315d5649c95/id-preview-93e2951e--27ebacac-fe45-4b92-9185-d36b505f1120.lovable.app-1781946188833.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "AFS Legal",
          description: "A multidisciplinary law firm in Tiruchirappalli providing litigation, dispute resolution and advisory services.",
          areaServed: "Tiruchirappalli, Tamil Nadu, India",
          address: {
            "@type": "PostalAddress",
            streetAddress: "No. 11, Madurai Road, Palakarai",
            addressLocality: "Tiruchirappalli",
            postalCode: "620008",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN",
          },
          telephone: "+91-94423-50036",
          email: "support@afslegal.in",
          url: "https://www.afslegal.in",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
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
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Disclaimer />
    </QueryClientProvider>
  );
}
