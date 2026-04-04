import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Analytics } from "@/components/Analytics";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// TODO: Confirm domain is https://cognitron.tech before launch
export const metadata: Metadata = {
  metadataBase: new URL("https://cognitron.tech"),
  icons: {
    icon: "/favicon.svg",
  },
  title: {
    default: "Cognitron | Coding, AI & Chess Coaching for Kids in Nairobi",
    template: "%s | Cognitron",
  },
  description:
    "Coding, AI, and Chess coaching for kids aged 6–17 in Nairobi, Kenya. Expert coaches come to your home or teach live online. Groups of 4 or fewer. Book a free trial lesson.",
  keywords: [
    "kids coding Nairobi",
    "AI for kids Kenya",
    "chess coaching Nairobi",
    "coding classes for children",
    "home tutoring Nairobi",
    "STEM education Kenya",
    "Cognitron",
  ],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://cognitron.tech",
    siteName: "Cognitron",
    title: "Cognitron | Coding, AI & Chess Coaching for Kids in Nairobi",
    description:
      "Expert coding, AI, and chess coaching for kids aged 6–17 in Nairobi. Home sessions or online. Groups of 4. Book a free trial.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cognitron — Coding, AI & Chess for Kids in Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cognitron | Coding, AI & Chess Coaching for Kids in Nairobi",
    description:
      "Expert coding, AI, and chess coaching for kids aged 6–17 in Nairobi. Home sessions or online. Groups of 4. Book a free trial.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Analytics />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
