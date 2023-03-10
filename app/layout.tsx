import './globals.css'
import React, { ReactNode } from 'react'
import QueryProvider from '../components/QueryProvider'

export const metadata = {
  title: 'FilmFavs',
  description: 'Explore who your favourite actory and directors are.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </QueryProvider>
  )
}
