import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ProgressProvider } from '@gad/context/progress-context'
import { SlimBar } from '@gad/components/ui/slim-bar'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: {
    default: 'RGAN XI | GAD Advocates Network',
    template: '%s | RGAN XI',
  },
  description:
    'The Region XI Gender and Development Advocates Network (RGAN XI Inc.) is a non-stock, non-profit, non-sectarian, and apolitical organization dedicated to advancing gender equality, diversity, equity, and social inclusion through research, education, policy engagement, and community partnerships.',
  keywords: ['gender and development', 'GAD', 'gender equity', 'research', 'Philippines', 'women empowerment'],
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://rganxi.org',
    siteName: 'RGAN XI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ProgressProvider>
          <SlimBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ProgressProvider>
        <Analytics />
      </body>
    </html>
  )
}
