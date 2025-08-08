'use client'

import { useState } from 'react'

export default function MobileHelp() {
  const [copied, setCopied] = useState(false)
  const networkUrl = 'http://192.168.0.112:3000'

  const copyUrl = () => {
    navigator.clipboard.writeText(networkUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">
            📱 Mobile Access Guide
          </h1>
          
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="font-semibold text-green-800 mb-2">📱 Mobile URL</h2>
              <div className="bg-white p-3 rounded border font-mono text-sm break-all">
                {networkUrl}
              </div>
              <button
                onClick={copyUrl}
                className="mt-2 w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {copied ? '✅ Copied!' : '📋 Copy URL'}
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="font-semibold text-blue-800 mb-2">🖥️ Desktop URL</h2>
              <div className="bg-white p-3 rounded border font-mono text-sm">
                http://localhost:3000
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Common Issues:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Use port <strong>3000</strong> (not 3001)</li>
                <li>• Both devices on same WiFi</li>
                <li>• Allow camera/microphone</li>
                <li>• Use Chrome/Safari</li>
              </ul>
            </div>

            <div className="space-y-3">
              <a 
                href={networkUrl}
                className="block w-full text-center py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                🚀 Open Mobile App
              </a>
              
              <a 
                href={`${networkUrl}/room/mobile-test`}
                className="block w-full text-center py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                🎥 Join Test Room
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
