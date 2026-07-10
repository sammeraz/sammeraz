import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/motion/Cursor";
import { Preloader } from "@/components/motion/Preloader";
import { PageTransition } from "@/components/motion/PageTransition";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/store/CartDrawer";
import { HeroFocusProvider } from "@/lib/hero-focus-context";
import { ThemeProvider } from "@/lib/theme-context";
import { site } from "@/data/site";
import "./globals.css";

// Runs before hydration (beforeInteractive) so the stored theme is applied
// to <html> before the first paint — reading it in a useEffect instead
// would mean a flash of the wrong theme every time a dark-mode visitor
// loads the page, since React can't apply the class before its own render.
const THEME_INIT_SCRIPT = `
try {
  if (localStorage.getItem("aim-imports-theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
} catch (e) {}
`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Bold condensed display face for headlines — motorsport/racing-livery energy,
// used uppercase (see .font-display in globals.css).
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
      </head>
      <body className="flex min-h-full flex-col bg-ink text-cream">
        <ThemeProvider>
          <CartProvider>
            <HeroFocusProvider>
              <Preloader />
              <Cursor />
              <Header />
              <main className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <CartDrawer />
            </HeroFocusProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
