'use client'

import { useToken } from '../hooks/useToken'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

type LandingProps = {
  sessionId?: RequestCookie
}

export const Landing = ({ sessionId }: LandingProps) => {
  const [clicked, setClicked] = useState(false)
  const router = useRouter()
  const { data: token, status, fetchStatus } = useToken(clicked)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  useEffect(() => {
    if (status === 'success') {
      router.push(
        `https://www.themoviedb.org/authenticate/${token}?redirect_to=${baseUrl}/most-seen`
      )
      setClicked(false)
    }
    if (status === 'error') {
      setClicked(false)
    }
  }, [status])

  return (
    <main>
      <div className="container grid place-content-center h-screen mx-auto">
        <h1 className="mb-8 text-7xl font-black">Your ratings and favourites</h1>
        <div>
          <button
            onClick={() => (sessionId ? router.push('/most-seen') : setClicked(true))}
            className="bg-white text-black/90 px-4 py-2 text-lg disabled:opacity-50"
            disabled={fetchStatus === 'fetching'}
          >
            Let&apos;s Go!
          </button>
        </div>
      </div>
    </main>
  )
}
