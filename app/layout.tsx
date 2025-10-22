import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'x402 BrandKit - Generate Brand Assets',
  description: 'Use x402 to generate all brand needs: Logo, favicon, description and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
