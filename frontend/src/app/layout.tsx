import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Synexa Growth OS — AI Executive Operating System",
  description: "An AI-powered Business Growth Operating System using a crew of specialized executive AI agents to drive revenue, strategy, and growth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bg-primary text-txt-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
