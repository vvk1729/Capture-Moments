'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Video, 
  Users, 
  BarChart3, 
  Camera, 
  Mic, 
  Settings,
  Calendar,
  Clock,
  Shield,
  Monitor,
  MessageSquare,
  Phone
} from 'lucide-react'
import ScheduleModal from '../components/ScheduleModal'
import MeetingInfoModal from '../components/MeetingInfoModal'

export default function HomePage() {
  const [roomId, setRoomId] = useState('')
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showMeetingInfo, setShowMeetingInfo] = useState(false)
  const [scheduledMeeting, setScheduledMeeting] = useState<any>(null)
  const router = useRouter()

  const createMeeting = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8)
    router.push(`/room/${newRoomId}`)
  }

  const joinMeeting = () => {
    if (roomId.trim()) {
      router.push(`/room/${roomId}`)
    }
  }

  const scheduleMeeting = () => {
    setShowScheduleModal(true)
  }

  const handleScheduleMeeting = (meetingData: any) => {
    const meetingUrl = `${window.location.origin}/room/${meetingData.roomId}`
    const fullMeetingData = {
      ...meetingData,
      url: meetingUrl
    }
    setScheduledMeeting(fullMeetingData)
    setShowScheduleModal(false)
    setShowMeetingInfo(true)
  }

  const shareScreen = () => {
    // Start a meeting with screen sharing enabled
    const newRoomId = Math.random().toString(36).substring(2, 8)
    router.push(`/room/${newRoomId}?screenShare=true`)
  }

  const joinByPhone = () => {
    // Show a more professional phone dial-in modal
    const phoneNumbers = [
      { country: 'United States', flag: '🇺🇸', number: '+1 (555) 123-4567' },
      { country: 'United Kingdom', flag: '🇬🇧', number: '+44 20 1234 5678' },
      { country: 'India', flag: '🇮🇳', number: '+91 80 1234 5678' },
      { country: 'Canada', flag: '🇨🇦', number: '+1 (555) 987-6543' },
      { country: 'Australia', flag: '🇦🇺', number: '+61 2 1234 5678' }
    ]

    const phoneInfo = `📞 Join by Phone

Choose a number to dial:

${phoneNumbers.map(p => `${p.flag} ${p.country}: ${p.number}`).join('\n')}

📋 Instructions:
1. Dial any number above
2. Enter the Meeting ID when prompted
3. Press # to join the meeting

💡 Tip: You can also enter a Meeting ID above to get the dial-in details for that specific meeting.`
    
    alert(phoneInfo)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Capture Moments</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium">Solutions</a>
              <a href="#plans" className="text-gray-600 hover:text-blue-600 font-medium">Plans & Pricing</a>
              <a href="#download" className="text-gray-600 hover:text-blue-600 font-medium">Download</a>
              <a href="#support" className="text-gray-600 hover:text-blue-600 font-medium">Support</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 font-medium">Sign In</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                Sign Up Free
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 sm:text-6xl">
            One platform to
            <span className="text-blue-600"> connect</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Bring teams together with HD video meetings, phone, messaging, and events in one platform you can trust.
          </p>
        </div>

        {/* Meeting Actions */}
        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Start or join a meeting</h3>
            </div>
            <div className="space-y-4">
              <button
                onClick={createMeeting}
                className="w-full flex items-center justify-center px-6 py-4 text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Video className="h-6 w-6 mr-3" />
                New Meeting
              </button>
              
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={scheduleMeeting}
                  className="flex flex-col items-center p-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Schedule</span>
                </button>
                <button 
                  onClick={shareScreen}
                  className="flex flex-col items-center p-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Monitor className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Share Screen</span>
                </button>
                <button 
                  onClick={joinByPhone}
                  className="flex flex-col items-center p-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Phone className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Join by Phone</span>
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or join with meeting ID</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Enter Meeting ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value.replace(/\s/g, ''))}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-mono"
                  onKeyPress={(e) => e.key === 'Enter' && joinMeeting()}
                  maxLength={6}
                />
                <button
                  onClick={joinMeeting}
                  disabled={!roomId.trim()}
                  className="px-6 py-3 text-lg font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div id="features" className="mt-24">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Simplified video conferencing and messaging across any device
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Capture Moments is a communications platform that transforms how people connect
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video Meetings */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <Video className="h-6 w-6" />
                  </div>
                  <h4 className="text-2xl font-bold">HD Video Meetings</h4>
                </div>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    Host up to 1000 participants
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    Screen sharing and annotation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    Breakout rooms for collaboration
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    Recording and transcription
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Video className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">Video Meeting Preview</p>
                </div>
              </div>
            </div>

            {/* Team Chat */}
            <div>
              <div className="bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">Team Chat Interface</p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h4 className="text-2xl font-bold">Team Chat</h4>
                </div>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    Persistent chat channels
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    File sharing and search
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    Integration with meetings
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    Voice and video messages
                  </li>
                </ul>
              </div>
            </div>

            {/* Analytics */}
            <div className="order-2">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h4 className="text-2xl font-bold">Advanced Analytics</h4>
                </div>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    Meeting engagement metrics
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    Participant activity tracking
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    Usage reports and insights
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-300 rounded-full mr-3"></span>
                    Custom dashboards
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1">
              <div className="bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">Analytics Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Preview */}
        <div id="analytics" className="mt-20">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h3 className="text-2xl font-extrabold text-gray-900">
                Meeting Statistics
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Track meeting performance and participant activity
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">Active Participants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">45m</div>
                <div className="text-sm text-gray-600">Meeting Duration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">28</div>
                <div className="text-sm text-gray-600">Chat Messages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">3</div>
                <div className="text-sm text-gray-600">Screen Shares</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm">
              © 2025 Capture Moments. Professional video conferencing platform.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSchedule={handleScheduleMeeting}
      />
      
      {scheduledMeeting && (
        <MeetingInfoModal
          isOpen={showMeetingInfo}
          onClose={() => setShowMeetingInfo(false)}
          meetingData={scheduledMeeting}
        />
      )}
    </div>
  )
}
