import '../styles/globals.css'
import React, { ReactNode } from 'react'
import QueryProvider from '../components/QueryProvider'
import { Sono } from 'next/font/google'

const sono = Sono({
  subsets: ['latin'],
  variable: '--sono-font',
})

export const metadata = {
  title: 'FilmFavs',
  description: 'Explore who your favourite actors and directors are.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={`font-sans ${sono.variable} text-white bg-gray-900`}>{children}</body>
      </html>
    </QueryProvider>
  )
}
