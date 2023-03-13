'use client'

import { useToken } from '../hooks/useToken'
import Link from 'next/link'

export default function Home() {
  const { data: token } = useToken()
  return (
    <main>
      {token && (
        <Link href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/approved`}>Access</Link>
      )}
    </main>
  )
}
