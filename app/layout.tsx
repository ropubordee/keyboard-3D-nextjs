import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ecommerse shop KeyBoard 3D",
  description: "Ecommerse shop KeyBoard 3D app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-stone-950">
      <body>{children}</body>
    </html>
  );
}
