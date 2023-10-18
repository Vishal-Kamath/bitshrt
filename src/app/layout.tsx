import { cn } from "@/utils/lib";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import AuthProvider from "@/components/providers/AuthProvider";
import ReduxProvider from "@/components/providers/reduxProvider";
import Modal from "@/components/ui/modal";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--montserrat-font",
});

export const metadata: Metadata = {
  title: "BitShrt - Make your URLs a bit short",
  description:
    "BitShrt is a URL Shortner that acts as a powerfull marketing tool that helps you track your customer details such as location, language, user device type and a lot more.",

  // Favicons
  icons: {
    icon: [
      {
        url: "/assets/favicon/favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },

      // dark
      {
        url: "/assets/favicon-dark/favicon.ico",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/assets/favicon-dark/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/assets/favicon-dark/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/assets/favicon/apple-touch-icon.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },

      // dark
      {
        url: "/assets/favicon-dark/apple-touch-icon.png",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    other: [
      {
        url: "/assets/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },

      // dark
      {
        url: "/assets/favicon-dark/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/assets/favicon-dark/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <ReduxProvider>
          <body className={cn(inter.variable, montserrat.variable, "relative")}>
            <Modal />
            {children}
          </body>
        </ReduxProvider>
      </AuthProvider>
    </html>
  );
}
