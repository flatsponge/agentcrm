import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentCRM UI Demo",
  description: "Browser-only CRM UI demo with hardcoded data.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
