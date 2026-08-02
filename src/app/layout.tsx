import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aman Sood — Portfolio",
  description:
    "Software engineer and AI builder at Punjab Engineering College. Projects in multi-agent systems, RAG, edge AI, and full-stack apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var m=t||(d?'dark':'light');document.documentElement.classList.toggle('dark',m==='dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${display.variable} ${body.variable}`}>
        <ThemeProvider>
          <div className="atmosphere" aria-hidden />
          <div className="site">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
