'usimport CaptureMomentsVideoRoom from "@/components/CaptureMomentsVideoRoom" client'

import { useParams, useSearchParams } from 'next/navigation'
import JitsiVideoRoom from '@/components/JitsiVideoRoom'

export default function VideoRoom() {
  const params = useParams()
  const searchParams = useSearchParams()
  const roomId = params.roomId as string
  const shouldStartScreenShare = searchParams.get('screenShare') === 'true'
  
  // Generate a user name from URL params or random
  const userName = searchParams.get('name') || `User_${Date.now().toString().slice(-4)}`

  const handleLeave = () => {
    // Redirect to home page
    window.location.href = '/'
  }

  if (!roomId) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Room ID</h1>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <CaptureMomentsVideoRoom 
      roomId={roomId}
      userName={userName}
      onLeave={handleLeave}
    />
  )
}
