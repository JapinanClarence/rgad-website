import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: {
    default: 'GAD Research Center | Gender and Development',
    template: '%s | GAD Research Center',
  },
  description:
    'The Gender and Development Research Center advances knowledge and practice in gender equity through rigorous research, advocacy, and community engagement.',
  keywords: ['gender and development', 'GAD', 'gender equity', 'research', 'Philippines', 'women empowerment'],
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://gadresearch.org',
    siteName: 'GAD Research Center',
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
