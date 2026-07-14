import "./globals.css";
import { Inter } from 'next/font/google'
import Header from "../components/Header";

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  title: "Sumit Gusain - Commerce Developer",
  description:
    "Portfolio of Sumit Gusain, Commerce Developer at 18th Digitech - Adobe Commerce (Magento 2), WordPress, PHP and JavaScript engineering: platform migrations, REST integrations, security forensics and e-commerce analytics.",
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