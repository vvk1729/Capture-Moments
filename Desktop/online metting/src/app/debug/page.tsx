'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function DebugPage() {
  const [info, setInfo] = useState<any>({})

  useEffect(() => {
    setInfo({
      hostname: window.location.hostname,
      port: window.location.port,
      protocol: window.location.protocol,
      pathname: window.location.pathname,
      href: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Debug Info</h1>
          
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="font-semibold mb-2">Current Access Info:</h2>
              <pre className="text-sm">{JSON.stringify(info, null, 2)}</pre>
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <h2 className="font-semibold mb-2">Correct URLs:</h2>
              <ul className="text-sm space-y-1">
                <li>🖥️ Desktop: <code>http://localhost:3000</code></li>
                <li>📱 Mobile: <code>http://192.168.0.112:3000</code></li>
                <li>🔌 Socket.IO: Port 3001 (backend only)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Link 
                href="/"
                className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Go to Home
              </Link>
              <Link 
                href="/room/test123"
                className="block w-full text-center py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Test Room (test123)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
