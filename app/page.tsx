'use client'

import { useToken } from '../hooks/useToken'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { data: token } = useToken()
  const router = useRouter()

  function handleClick() {
    if (token) {
      router.push(
        `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/approved`
      )
    }
  }

  return (
    <main>
      <button onClick={handleClick}>Access</button>
    </main>
  )
}
