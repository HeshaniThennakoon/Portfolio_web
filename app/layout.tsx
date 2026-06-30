import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { getSettings, getHero, getOgSettings } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [hero, ogSettings] = await Promise.all([getHero(), getOgSettings()]);
    const siteUrl = ogSettings.siteUrl || "https://heshani.dev";
    const tagline = ogSettings.tagline || hero.headline || `Professional portfolio of ${hero.name}, Software Engineer.`;
    
    let metadataBase: URL | undefined = undefined;
    try {
      metadataBase = new URL(siteUrl);
    } catch (e) {
      metadataBase = new URL("http://localhost:3000");
    }

    return {
      title: `${hero.name} | Professional Portfolio`,
      description: tagline,
      metadataBase,
      openGraph: {
        type: "website",
        url: siteUrl,
        siteName: ogSettings.siteName || `${hero.name} Portfolio`,
        title: `${hero.name} | Professional Portfolio`,
        description: tagline,
        images: [
          {
            url: "/api/og",
            width: 1200,
            height: 630,
            alt: `${hero.name} | Portfolio Preview`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${hero.name} | Professional Portfolio`,
        description: tagline,
        images: ["/api/og"],
        creator: ogSettings.twitterHandle || undefined,
      },
    };
  } catch (err) {
    return {
      title: "Heshani Thennakoon | Software Engineer Portfolio",
      description: "Professional portfolio of Heshani Thennakoon, Software Engineer.",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const theme = settings.theme;

  const isCyberAccent = theme.primary === "#00D4B4" || theme.primary === "#00F5FF";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: ${isCyberAccent ? "#0089A8" : theme.primary};
            --secondary: ${theme.secondary};
            --accent: ${theme.accent};
            --background: ${theme.lightBg || "#FFFFFF"};
            --card: #FFFFFF;
            --card-foreground: #0A0A0A;
            --border: #E5E7EB;
            --input: #F3F4F6;
          }
          .dark {
            --primary: ${theme.primary};
            --secondary: ${theme.secondary};
            --accent: ${theme.accent};
            --background: ${theme.darkBg === "#0A0A0A" ? "#050505" : theme.darkBg || "#050505"};
            --card: ${isCyberAccent ? "#0d0d0d" : "#111111"};
            --popover: ${isCyberAccent ? "#0d0d0d" : "#111111"};
            --border: ${isCyberAccent ? "rgba(0, 245, 255, 0.08)" : "rgba(255, 255, 255, 0.07)"};
            --input: ${isCyberAccent ? "rgba(0, 245, 255, 0.06)" : "rgba(255, 255, 255, 0.09)"};
          }
        `}} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Providers>
          {children}
          <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}

