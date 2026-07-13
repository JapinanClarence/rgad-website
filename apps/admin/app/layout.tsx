import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'GAD Admin', template: '%s | GAD Admin' },
  description: 'GAD Research Center Content Management System',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
