import '@/styles/global.css'
import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt'>
      <body className='antialiased'>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
