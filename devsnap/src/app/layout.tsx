import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "DevSnap - Share Your Dev Setup With One Link",
  description: "Capture your complete development environment and share it instantly. Stop explaining your setup. Start sharing it.",
  keywords: ["developer tools", "dev environment", "dotfiles", "vscode extensions", "developer onboarding"],
  authors: [{ name: "DevSnap" }],
  openGraph: {
    title: "DevSnap - Share Your Dev Setup With One Link",
    description: "Capture your complete development environment and share it instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevSnap - Share Your Dev Setup With One Link",
    description: "Capture your complete development environment and share it instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
