import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { metadata as pageMetadata } from './page-metadata'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = pageMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-100">
        <Header />
        {children}
      </body>
    </html>
  )
}