
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "La Buena Mesa | Menú Digital",
    template: "%s | La Buena Mesa",
  },
  description:
    "Descubrí la carta de La Buena Mesa: cocina tradicional, sabores caseros y platos preparados para disfrutar.",
  applicationName: "La Buena Mesa",
  openGraph: {
    title: "La Buena Mesa | Menú Digital",
    description:
      "Explorá nuestra carta y descubrí tus próximos platos favoritos.",
    type: "website",
    locale: "es_AR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
