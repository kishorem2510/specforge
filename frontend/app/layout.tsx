import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpecForge AI",
  description: "Requirements → Developer Specifications in seconds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f1a] text-white antialiased">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}