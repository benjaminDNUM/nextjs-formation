import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import clsx from 'clsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'h-screen')}>
        <SessionProvider>
          <ToastContainer />

          <div className="bg-gray-400 flex flex-col min-h-screen ">
            <Header />
            <Nav />
            <div className="flex-grow p-10">{children}</div>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
