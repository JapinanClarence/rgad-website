import type { Metadata } from 'next'
import './globals.css'
import { ProgressProvider } from '@gad/context/progress-context'
import { SlimBar } from '@gad/components/ui/slim-bar'

export const metadata: Metadata = {
  title: { default: 'GAD Admin', template: '%s | GAD Admin' },
  description: 'GAD Research Center Content Management System',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ProgressProvider>
          <SlimBar />
          {children}
        </ProgressProvider>
      </body>
    </html>
  )
}
