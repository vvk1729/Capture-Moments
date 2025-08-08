'use client'

import { useState } from 'react'
import { X, UserPlus, Mail, Phone, Copy, Share } from 'lucide-react'

interface InviteModalProps {
  isOpen: boolean
  onClose: () => void
  roomId: string
  meetingUrl: string
}

export default function InviteModal({ isOpen, onClose, roomId, meetingUrl }: InviteModalProps) {
  const [emails, setEmails] = useState<string[]>([''])
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([''])
  const [personalMessage, setPersonalMessage] = useState('Join my video meeting on Capture Moments!')
  const [inviteMethod, setInviteMethod] = useState<'email' | 'phone' | 'link'>('link')

  if (!isOpen) return null

  const addEmailField = () => {
    setEmails([...emails, ''])
  }

  const removeEmailField = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index))
  }

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails]
    newEmails[index] = value
    setEmails(newEmails)
  }

  const addPhoneField = () => {
    setPhoneNumbers([...phoneNumbers, ''])
  }

  const removePhoneField = (index: number) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index))
  }

  const updatePhone = (index: number, value: string) => {
    const newPhones = [...phoneNumbers]
    newPhones[index] = value
    setPhoneNumbers(newPhones)
  }

  const generateInviteText = () => {
    return `${personalMessage}

📅 Meeting Details:
Meeting ID: ${roomId}
Meeting Link: ${meetingUrl}

📱 How to Join:
1. Click the link above, or
2. Go to the meeting app and enter Meeting ID: ${roomId}

💻 For best experience:
• Use Chrome, Safari, or Edge browser
• Allow camera and microphone access
• Ensure stable internet connection

See you in the meeting! 🎉`
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(generateInviteText())
    alert('Invite message copied to clipboard!')
  }

  const shareInvite = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my video meeting',
          text: generateInviteText(),
          url: meetingUrl
        })
      } catch (error) {
        console.log('Share canceled or failed')
      }
    } else {
      copyInviteLink()
    }
  }

  const sendEmailInvites = () => {
    const validEmails = emails.filter(email => email.trim() && email.includes('@'))
    if (validEmails.length === 0) {
      alert('Please enter at least one valid email address')
      return
    }

    const subject = encodeURIComponent('Join my video meeting')
    const body = encodeURIComponent(generateInviteText())
    const mailtoLink = `mailto:${validEmails.join(',')}?subject=${subject}&body=${body}`
    
    window.open(mailtoLink, '_blank')
    alert(`Email invites prepared for ${validEmails.length} recipients!`)
  }

  const sendSMSInvites = () => {
    const validPhones = phoneNumbers.filter(phone => phone.trim())
    if (validPhones.length === 0) {
      alert('Please enter at least one phone number')
      return
    }

    const message = encodeURIComponent(`${personalMessage}\n\nJoin my meeting: ${meetingUrl}\nMeeting ID: ${roomId}`)
    const smsLink = `sms:${validPhones.join(',')}?body=${message}`
    
    window.open(smsLink, '_blank')
    alert(`SMS invites prepared for ${validPhones.length} recipients!`)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <UserPlus className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Invite People</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {/* Invite Method Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setInviteMethod('link')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                inviteMethod === 'link'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Share Link
            </button>
            <button
              onClick={() => setInviteMethod('email')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                inviteMethod === 'email'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Email Invite
            </button>
            <button
              onClick={() => setInviteMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                inviteMethod === 'phone'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              SMS Invite
            </button>
          </div>

          {/* Personal Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Personal Message
            </label>
            <textarea
              value={personalMessage}
              onChange={(e) => setPersonalMessage(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              placeholder="Add a personal message..."
            />
          </div>

          {/* Share Link Method */}
          {inviteMethod === 'link' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meeting Link
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={meetingUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(meetingUrl)
                      alert('Meeting link copied!')
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meeting ID
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={roomId}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white font-mono"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(roomId)
                      alert('Meeting ID copied!')
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={copyInviteLink}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy Full Invite</span>
                </button>
                <button
                  onClick={shareInvite}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Share className="h-4 w-4" />
                  <span>Share Invite</span>
                </button>
              </div>
            </div>
          )}

          {/* Email Method */}
          {inviteMethod === 'email' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Addresses
                </label>
                {emails.map((email, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => updateEmail(index, e.target.value)}
                      placeholder="Enter email address"
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {emails.length > 1 && (
                      <button
                        onClick={() => removeEmailField(index)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addEmailField}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  + Add another email
                </button>
              </div>

              <button
                onClick={sendEmailInvites}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Send Email Invites</span>
              </button>
            </div>
          )}

          {/* SMS Method */}
          {inviteMethod === 'phone' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Numbers
                </label>
                {phoneNumbers.map((phone, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => updatePhone(index, e.target.value)}
                      placeholder="Enter phone number"
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {phoneNumbers.length > 1 && (
                      <button
                        onClick={() => removePhoneField(index)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addPhoneField}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  + Add another phone
                </button>
              </div>

              <button
                onClick={sendSMSInvites}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Send SMS Invites</span>
              </button>
            </div>
          )}

          {/* Preview */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Invite Preview
            </label>
            <div className="bg-gray-700 rounded-lg p-4 text-sm text-gray-300 whitespace-pre-line max-h-40 overflow-y-auto">
              {generateInviteText()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
