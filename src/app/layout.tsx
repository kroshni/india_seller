import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { initDB } from "@/lib/init-db";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "India Seller Admin",
  description: "Admin panel for managing sellers in India",
};

// Initialize database but don't block rendering
// Run this in a separate scope so it's only executed once
(async () => {
  try {
    console.log('Starting database initialization...');
    await initDB();
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Failed to initialize database but continuing anyway:', error);
  }
})();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
