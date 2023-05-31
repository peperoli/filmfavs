import { Landing } from '@/components/Landing'
import { cookies } from 'next/headers'

export default function Home() {
  const cookieStore = cookies()
  const sessionId = cookieStore.get('session_id')
  return <Landing sessionId={sessionId} />
}
