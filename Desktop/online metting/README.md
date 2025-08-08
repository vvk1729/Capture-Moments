# Capture Moments - AI-Powered Video Conferencing

A modern video conferencing application with real-time facial emotion detection and engagement analysis, similar to Zoom and Google Meet, but with advanced AI capabilities.

## 🚀 Features

### Core Video Conferencing
- **HD Video Calling** - Crystal clear video and audio quality
- **Multi-participant Support** - Support for multiple users in one room
- **Screen Sharing** - Share your screen with participants
- **Chat System** - Real-time messaging during meetings
- **Media Controls** - Toggle video/audio on/off

### AI-Powered Analytics (Your ML Project Integration)
- **Real-time Emotion Detection** - Detects emotions like engaged, bored, confused, neutral
- **Engagement Analytics** - Track participant engagement levels
- **Interest Analysis** - Monitor audience interest throughout meetings
- **Detailed Insights** - Comprehensive analytics dashboard
- **Meeting Reports** - Post-meeting engagement summaries

### Technical Features
- **WebRTC Integration** - Peer-to-peer video communication
- **Real-time Signaling** - Socket.IO for instant communication
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, intuitive interface built with Tailwind CSS

## 🛠 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

### AI/ML Integration Ready
- **TensorFlow.js** - Ready for ML model integration
- **WebRTC** - Real-time video stream processing
- **Canvas API** - For video frame processing
- **MediaPipe** - (Can be integrated) For advanced face detection

## 📁 Project Structure

```
capture-moments/
├── src/
│   ├── app/
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   └── room/
│   │       └── [roomId]/
│   │           └── page.tsx      # Video room interface
├── server/
│   └── index.js                  # Socket.IO server
├── package.json                  # Dependencies
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Modern web browser with WebRTC support

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Socket.IO Server**
   ```bash
   npm run server
   ```

3. **Start the Next.js Application**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run server` - Start Socket.IO server
- `npm run lint` - Run ESLint

## 🧠 Integrating Your ML Model

### Where to Add Your Emotion Detection Model

1. **Frontend Integration** (`src/app/room/[roomId]/page.tsx`):
   ```typescript
   // Add your emotion detection logic here
   const detectEmotion = async (videoElement: HTMLVideoElement) => {
     // Your TensorFlow.js model code
     // Process video frame
     // Return emotion data
   }
   ```

2. **Backend Processing** (`server/index.js`):
   ```javascript
   // Handle emotion updates from your ML model
   socket.on('emotion-update', (data) => {
     const { emotion, confidence } = data
     // Store and broadcast emotion data
   })
   ```

### Integration Steps for Your AI Model

1. **Install TensorFlow.js**:
   ```bash
   npm install @tensorflow/tfjs @tensorflow/tfjs-node
   ```

2. **Load Your Trained Model**:
   ```typescript
   import * as tf from '@tensorflow/tfjs'
   
   const loadModel = async () => {
     const model = await tf.loadLayersModel('/path/to/your/model.json')
     return model
   }
   ```

3. **Process Video Frames**:
   ```typescript
   const processVideoFrame = (video: HTMLVideoElement, model: tf.LayersModel) => {
     const canvas = document.createElement('canvas')
     const ctx = canvas.getContext('2d')
     ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
     
     // Convert to tensor and predict
     const tensor = tf.browser.fromPixels(canvas)
     const prediction = model.predict(tensor)
     
     return prediction
   }
   ```

4. **Send Emotion Data**:
   ```typescript
   socket.emit('emotion-update', {
     emotion: detectedEmotion,
     confidence: confidenceScore
   })
   ```

## 🎯 Features for Your ML Project

### Real-time Emotion Detection
- **Face Detection**: Identify faces in video streams
- **Emotion Classification**: Classify emotions (engaged, bored, confused, etc.)
- **Confidence Scoring**: Provide confidence levels for predictions
- **Real-time Processing**: Process video frames in real-time

### Analytics Dashboard
- **Engagement Metrics**: Overall meeting engagement scores
- **Emotion Distribution**: Breakdown of emotions throughout meeting
- **Time-based Analysis**: Track engagement over time
- **Participant Insights**: Individual participant analysis

### Data Collection
- **Meeting Recordings**: Store video with emotion annotations
- **Analytics Export**: Export engagement data for further analysis
- **Privacy Controls**: Configurable privacy settings
- **Consent Management**: User consent for emotion detection

## 🔒 Privacy & Security

- **End-to-end Encryption**: All video streams are encrypted
- **Consent Required**: Users must consent to emotion detection
- **Data Privacy**: Emotion data is processed locally when possible
- **GDPR Compliant**: Built with privacy regulations in mind

## 🌟 Use Cases

### Education
- **Online Classes**: Monitor student engagement
- **Training Sessions**: Measure training effectiveness
- **Presentations**: Get real-time feedback

### Corporate
- **Team Meetings**: Improve meeting effectiveness
- **Training**: Assess training engagement
- **Presentations**: Optimize presentation delivery

### Research
- **User Studies**: Collect engagement data
- **Behavioral Analysis**: Study meeting dynamics
- **AI Training**: Generate training data for emotion models

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_STUN_SERVER=stun:stun.l.google.com:19302
```

### WebRTC Configuration
The app uses Google's STUN servers by default. For production, consider using TURN servers.

## 📱 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 14+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Projects

- [TensorFlow.js](https://www.tensorflow.org/js)
- [WebRTC](https://webrtc.org/)
- [Socket.IO](https://socket.io/)
- [Next.js](https://nextjs.org/)

## 📞 Support

For questions and support:
- Create an issue on GitHub
- Email: support@capturemoments.ai
- Documentation: [docs.capturemoments.ai](https://docs.capturemoments.ai)

---

**Built with ❤️ for better online communication and engagement analysis**
