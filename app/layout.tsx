import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALUMINA At Home",
  description: "Your personal longevity and biohacking protocol companion. Transform your home into a wellness sanctuary with evidence-based protocols.",
  keywords: ["longevity", "biohacking", "wellness", "health optimization", "protocols"],
  authors: [{ name: "Alumina" }],
  creator: "Alumina",
  publisher: "Alumina",
  applicationName: "ALUMINA At Home",
  appleWebApp: {
    capable: true,
    title: "ALUMINA",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "ALUMINA At Home",
    title: "ALUMINA At Home",
    description: "Your personal longevity and biohacking protocol companion",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#235B4E",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/alumina-isotipo.webp" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased touch-pan-y`}
        suppressHydrationWarning
      >
        <Providers>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
