import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "./components/SiteShell";

export const metadata: Metadata = {
  title: {
    default: "Karnataka Cafe Patna",
    template: "%s | Karnataka Cafe Patna",
  },
  description:
    "Authentic South Indian dining in Saguna, Patna — crisp dosas, soft idlis, generous thalis and traditional filter coffee.",
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
