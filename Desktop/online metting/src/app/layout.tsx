import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Capture Moments - Video Conferencing',
  description: 'Professional video conferencing platform with HD quality and advanced features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
