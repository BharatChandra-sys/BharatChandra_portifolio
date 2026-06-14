import localFont from "next/font/local";
import "./globals.css";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Providers/Theme";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: "Bharat Chandra | AI/ML Engineer & Aerospace Systems Builder",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
  description: "Bharat Chandra is an AI/ML engineer and final-year CSE student at GITAM University Hyderabad building production AI systems, rocketry telemetry backends, and autonomous underwater vehicle control stacks.",
  keywords: "Bharat Chandra, Bharat Chandra GITAM, Bharat Chandra AI engineer, BharatChandra-sys, GITAM Hyderabad CSE, GARI rocketry, CAN-7USAT, AUVBrain, MedVision AI, BHEL AI portal",
  authors: [{ name: "Bharat Chandra", url: "https://bharatchandra.me" }],
  robots: "index, follow, max-snippet:-1, max-image-preview:large",
  openGraph: {
    type: "website",
    url: "https://bharatchandra.me",
    title: "Bharat Chandra | AI/ML Engineer",
    description: "Building production AI systems, rocketry telemetry backends, and AUV stacks. Final-year CSE @ GITAM Hyderabad.",
    siteName: "Bharat Chandra",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Chandra | AI/ML Engineer",
    description: "Building production AI systems, rocketry backends, and AUV control stacks. Final-year CSE @ GITAM Hyderabad.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader />
          <Header />

          {children}

          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'font-semibold backdrop-blur-md text-black rounded-3xl',
            }}
          />

          <GridPattern
            width={200}
            height={200}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom,white,transparent)]",
            )}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
