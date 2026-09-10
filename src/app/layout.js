import "./globals.css";
import { Inter } from 'next/font/google'
import Header from "../components/Header";

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  title: "Sumit Gusain - Full-Stack Developer",
  description:
    "Portfolio of Sumit Gusain, full-stack developer - React, Next.js, TypeScript, React Native, PHP, REST/GraphQL APIs and MySQL. Nearly two years shipping and supporting production web and mobile platforms, plus self-directed work in offline-first PWAs, real-time multiplayer and AI integration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}