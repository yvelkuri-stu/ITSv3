import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Ideal Technosoft',
  description: process.env.NEXT_PUBLIC_COMPANY_TAGLINE || 'Innovating Tomorrow\'s Digital Solutions',
  keywords: ['technology', 'software development', 'web development', 'mobile apps', 'AI', 'innovation'],
  authors: [{ name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Ideal Technosoft' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#6366f1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}