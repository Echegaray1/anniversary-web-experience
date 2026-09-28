import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Pacifico, Quicksand } from 'next/font/google'
import './globals.css'

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
})

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
})

export const metadata: Metadata = {
  title: 'Feliz 1er Mes, Amiara 💙',
  description:
    'Una sorpresa de otro planeta: noche hawaiana, tulipanes brillantes y mucho amor para Amiara.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#070b34',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${pacifico.variable} ${quicksand.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
