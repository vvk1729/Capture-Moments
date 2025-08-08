'use client'

import Link from 'next/link'
import { Video, Home, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Page Not Found
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            The room or page you're looking for doesn't exist.
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="text-center">
              <Video className="mx-auto h-8 w-8 text-blue-500 mb-4" />
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Join a Video Meeting
              </h2>
              
              <div className="space-y-4">
                <Link 
                  href="/"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go to Home Page
                </Link>
                
                <div className="text-sm text-gray-500">
                  <p className="mb-2"><strong>Correct URLs:</strong></p>
                  <div className="bg-gray-100 p-3 rounded text-left">
                    <p>🖥️ Desktop: <code>http://localhost:3000</code></p>
                    <p>📱 Mobile: <code>http://192.168.0.112:3000</code></p>
                  </div>
                  <p className="mt-3 text-xs">
                    ⚠️ Make sure to use port <strong>3000</strong> for the web interface
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
