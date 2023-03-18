"use client"

import { useToken } from "../hooks/useToken"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [clicked, setClicked] = useState(false)
  const { data: token, status, fetchStatus } = useToken(clicked)
  const router = useRouter()

  useEffect(() => {
    if (status === 'success') {
      router.push(
        `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/approved`
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
            onClick={() => setClicked(true)}
            className="bg-black text-white px-4 py-2 text-lg disabled:opacity-50"
            disabled={fetchStatus === 'fetching'}
          >
            Let&apos;s Go!
          </button>
        </div>
      </div>
    </main>
  )
}
