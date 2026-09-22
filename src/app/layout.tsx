import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/content/site";
import { ConversionTracker } from "@/components/layout/ConversionTracker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { BackToTop } from "@/components/motion/BackToTop";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { GA_ID } from "@/lib/analytics";
import { isIndexable } from "@/lib/contact";
import "./globals.css";

// latin-ext + vietnamese cover the dotted/accented letters used in Yorùbá (Ẹ, ọ, ṣ, à…).
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Living Hope Hospital | Private Hospital in Parakin, Ile-Ife",
  description: site.description,
  applicationName: site.name,
  // No canonical here on purpose: each page sets its own via buildMetadata().
  openGraph: {
    title: "Living Hope Hospital | Private Hospital in Parakin, Ile-Ife",
    description: site.description,
    siteName: site.name,
    locale: "en_NG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  // Stays noindex while sample data is on, or until real contact details + a live URL are configured.
  robots: isIndexable ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1d3d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        {/* Scroll-reveal elements start hidden; without JavaScript they must simply be visible. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink antialiased">
        <MotionProvider>
          <ScrollProgress />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-900 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
          {GA_ID && (
            <>
              <GoogleAnalytics gaId={GA_ID} />
              <ConversionTracker />
            </>
          )}
        </MotionProvider>
      </body>
    </html>
  );
}
