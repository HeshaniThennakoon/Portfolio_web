import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { getSettings } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Heshani Thennakoon | Software Engineer Portfolio",
  description: "Professional portfolio of Heshani Thennakoon, Software Engineer specializing in Full-Stack development, AI, Cloud, and Web systems.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const theme = settings.theme;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: ${theme.primary};
            --secondary: ${theme.secondary};
            --accent: ${theme.accent};
            --background: ${theme.lightBg};
          }
          .dark {
            --primary: ${theme.primary};
            --secondary: ${theme.secondary};
            --accent: ${theme.accent};
            --background: ${theme.darkBg};
            --card: color-mix(in srgb, ${theme.darkBg} 90%, white);
            --popover: color-mix(in srgb, ${theme.darkBg} 90%, white);
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

