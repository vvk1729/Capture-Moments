const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:3000", 
      "http://192.168.0.112:3000",
      "http://localhost:3001", 
      "http://192.168.0.112:3001"
    ],
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())

// Store room information
const rooms = new Map()
const participants = new Map()

// API endpoints
app.get('/api/rooms/:roomId', (req, res) => {
  const { roomId } = req.params
  const room = rooms.get(roomId)
  
  if (room) {
    res.json({
      roomId,
      participants: Array.from(room.participants.values()),
      participantCount: room.participants.size,
      isEmpty: room.participants.size === 0,
      createdAt: room.createdAt
    })
  } else {
    res.status(404).json({ error: 'Room not found' })
  }
})

// Check if someone is in a specific room
app.get('/api/rooms/:roomId/check-participant/:participantId', (req, res) => {
  const { roomId, participantId } = req.params
  const room = rooms.get(roomId)
  
  if (room) {
    const isInRoom = room.participants.has(participantId)
    const participant = room.participants.get(participantId)
    
    res.json({
      roomId,
      participantId,
      isInRoom,
      participant: participant || null,
      totalParticipants: room.participants.size
    })
  } else {
    res.status(404).json({ error: 'Room not found' })
  }
})

app.post('/api/rooms', (req, res) => {
  const roomId = Math.random().toString(36).substring(2, 8)
  
  rooms.set(roomId, {
    participants: new Map(),
    createdAt: new Date()
  })
  
  res.json({ roomId })
})

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // Join room
  socket.on('join-room', (data) => {
    const { roomId, userName } = data
    
    // Create room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        participants: new Map(),
        createdAt: new Date()
      })
    }
    
    const room = rooms.get(roomId)
    const participant = {
      id: socket.id,
      name: userName || `User ${socket.id.substring(0, 4)}`,
      joinedAt: new Date(),
      videoEnabled: true,
      audioEnabled: true
    }
    
    // Add participant to room
    room.participants.set(socket.id, participant)
    participants.set(socket.id, { roomId, ...participant })
    
    // Join socket room
    socket.join(roomId)
    
    // Notify others in the room
    socket.to(roomId).emit('participant-joined', participant)
    
    // Send current participants to the new user
    socket.emit('room-participants', Array.from(room.participants.values()))
    
    console.log(`${participant.name} joined room ${roomId}`)
  })

  // Handle WebRTC signaling
  socket.on('offer', (data) => {
    const { targetId, offer } = data
    socket.to(targetId).emit('offer', {
      senderId: socket.id,
      offer
    })
  })

  socket.on('answer', (data) => {
    const { targetId, answer } = data
    socket.to(targetId).emit('answer', {
      senderId: socket.id,
      answer
    })
  })

  socket.on('ice-candidate', (data) => {
    const { targetId, candidate } = data
    socket.to(targetId).emit('ice-candidate', {
      senderId: socket.id,
      candidate
    })
  })

  // Handle media control updates
  socket.on('media-control', (data) => {
    const { type, enabled } = data // type: 'video' or 'audio'
    const participant = participants.get(socket.id)
    
    if (participant) {
      const { roomId } = participant
      const room = rooms.get(roomId)
      
      if (room) {
        const roomParticipant = room.participants.get(socket.id)
        if (roomParticipant) {
          roomParticipant[`${type}Enabled`] = enabled
          
          // Broadcast media control change to room
          socket.to(roomId).emit('participant-media-changed', {
            participantId: socket.id,
            type,
            enabled
          })
        }
      }
    }
  })

  // Handle chat messages
  socket.on('chat-message', (data) => {
    const { message } = data
    const participant = participants.get(socket.id)
    
    if (participant) {
      const { roomId, name } = participant
      
      // Broadcast message to room
      io.to(roomId).emit('chat-message', {
        id: Date.now().toString(),
        senderId: socket.id,
        senderName: name,
        message,
        timestamp: new Date()
      })
    }
  })

  // Get room analytics
  socket.on('get-analytics', () => {
    const participant = participants.get(socket.id)
    
    if (participant) {
      const { roomId } = participant
      const room = rooms.get(roomId)
      
      if (room) {
        // Calculate basic analytics
        const totalParticipants = room.participants.size
        const meetingDuration = Date.now() - room.createdAt.getTime()
        
        socket.emit('analytics-data', {
          totalParticipants,
          meetingDuration,
          roomCreated: room.createdAt
        })
      }
    }
  })

  // Check if someone is in the room
  socket.on('check-room-occupancy', (data) => {
    const { roomId } = data
    const room = rooms.get(roomId)
    
    if (room) {
      const participantList = Array.from(room.participants.values())
      socket.emit('room-occupancy-status', {
        roomId,
        hasParticipants: room.participants.size > 0,
        participantCount: room.participants.size,
        participants: participantList,
        isEmpty: room.participants.size === 0
      })
    } else {
      socket.emit('room-occupancy-status', {
        roomId,
        hasParticipants: false,
        participantCount: 0,
        participants: [],
        isEmpty: true,
        roomExists: false
      })
    }
  })

  // Check if specific participant is in room
  socket.on('check-participant-in-room', (data) => {
    const { roomId, participantId } = data
    const room = rooms.get(roomId)
    
    if (room) {
      const isInRoom = room.participants.has(participantId)
      const participant = room.participants.get(participantId)
      
      socket.emit('participant-room-status', {
        roomId,
        participantId,
        isInRoom,
        participant: participant || null,
        lastSeen: participant ? participant.joinedAt : null
      })
    } else {
      socket.emit('participant-room-status', {
        roomId,
        participantId,
        isInRoom: false,
        participant: null,
        roomExists: false
      })
    }
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    
    const participant = participants.get(socket.id)
    if (participant) {
      const { roomId } = participant
      const room = rooms.get(roomId)
      
      if (room) {
        // Remove participant from room
        room.participants.delete(socket.id)
        
        // Notify others in the room
        socket.to(roomId).emit('participant-left', socket.id)
        
        // Clean up empty rooms
        if (room.participants.size === 0) {
          rooms.delete(roomId)
          console.log(`Room ${roomId} deleted (empty)`)
        }
      }
      
      participants.delete(socket.id)
    }
  })
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Socket.IO server ready for connections`)
})
