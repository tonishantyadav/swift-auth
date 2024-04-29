import QueryClientProvider from '@/app/QueryClientProvider'
import ThemeProvider from '@/app/ThemeProvider'
import { Inter } from 'next/font/google'
import AuthProvider from './AuthProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-[radial-gradient(#ffffff33_1px,#000000_1px)] bg-[size:20px_20px]`}
      >
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <QueryClientProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
