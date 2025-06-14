import type { Metadata } from "next";
import { Babylonica, Lato, Raleway, Geist, Geist_Mono, Italianno } from "next/font/google";
import "./globals.css";
import RsvpButton from "@/ui/RsvpButton/RsvpButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const babylonica = Babylonica({
  weight: '400',
  variable: '--font-babylonica',
  subsets: ['latin'],
});

const lato = Lato({
  weight: ['300', '400', '700', '900'], // Pick weights you need
  subsets: ['latin'],
  variable: '--font-lato', // Optional CSS variable
});


const raleway = Raleway({
  weight: ['200','400', '500', '600', '700'], // Pick weights you need
  subsets: ['latin'],
  variable: '--font-raleway',
});

const italianno = Italianno({
  weight: ['400'], // Pick weights you need
  subsets: ['latin'],
  variable: '--font-italianno',
})
export const metadata: Metadata = {
  title: "Celebrate Amara's Baptism & 1st Birthday Celebration RSVP",
  description: "Join us for a special day as we celebrate Amara’s baptism and 1st birthday! View event details, locations, and RSVP online today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${babylonica.variable}
        ${lato.variable}
        ${raleway.variable}
        ${italianno.variable}
        `}
      >
        {children}

        <RsvpButton />
      </body>
    </html>
  );
}
