'use client'

import { useState } from 'react'
import { Copy, Calendar, Clock, Users, Video, Phone, X, Check } from 'lucide-react'

interface MeetingInfoModalProps {
  isOpen: boolean
  onClose: () => void
  meetingData: {
    roomId: string
    title: string
    date: string
    time: string
    duration: number
    url: string
  }
}

export default function MeetingInfoModal({ isOpen, onClose, meetingData }: MeetingInfoModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  if (!isOpen) return null

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const formatDateTime = () => {
    const dateObj = new Date(`${meetingData.date}T${meetingData.time}`)
    return dateObj.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const inviteText = `Join Capture Moments Meeting

${meetingData.title}

📅 ${formatDateTime()}
⏱️ Duration: ${meetingData.duration} minutes

🔗 Join URL: ${meetingData.url}
🆔 Meeting ID: ${meetingData.roomId}

📞 Phone Numbers:
US: +1 (555) 123-4567
UK: +44 20 1234 5678
IN: +91 80 1234 5678

Meeting ID: ${meetingData.roomId}#`

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Meeting Scheduled</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900">{meetingData.title}</h4>
            <p className="text-gray-600 mt-1">{formatDateTime()}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Meeting URL</label>
                <button
                  onClick={() => copyToClipboard(meetingData.url, 'url')}
                  className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
                >
                  {copiedField === 'url' ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="text-sm text-blue-600 font-mono break-all">{meetingData.url}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Meeting ID</label>
                <button
                  onClick={() => copyToClipboard(meetingData.roomId, 'id')}
                  className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
                >
                  {copiedField === 'id' ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="text-lg font-mono font-semibold text-gray-900">{meetingData.roomId}</div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Full Invitation</label>
                <button
                  onClick={() => copyToClipboard(inviteText, 'invite')}
                  className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
                >
                  {copiedField === 'invite' ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy All
                    </>
                  )}
                </button>
              </div>
              <div className="text-xs text-gray-600">Copy complete invitation to share with participants</div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <a
                href={meetingData.url}
                className="flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Video className="h-4 w-4 mr-2" />
                Join Now
              </a>
              <button className="flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                <Calendar className="h-4 w-4 mr-2" />
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
