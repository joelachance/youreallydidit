import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "You Fucking Did It!",
  description: "Created for you. Write it all down, every last detail!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body>
          <Theme>
            {children}
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
