const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const fantasyRoutes = require('./routes/fantasyRoutes');

// Initialize Express & HTTP server
const app = express();
const server = http.createServer(app);

// CORS setup — allow Vercel and localhost
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://fantasy-chat-frontend.vercel.app' // ← Your live Vercel URL
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// Middleware
app.use(express.json());
app.use(passport.initialize());
require('./config/passport');

// Database
const sequelize = require('./config/db');
sequelize.sync().then(() => {
  console.log('✅ Database synced');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/fantasy-profiles', fantasyRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Fantasy Chat Backend is running!' });
});

// WebSocket
const io = socketIo(server, {
  cors: corsOptions
});

io.on('connection', (socket) => {
  console.log('✅ WebSocket connected');
  socket.on('disconnect', () => console.log('❌ WebSocket disconnected'));
});

// Start server — MUST bind to 0.0.0.0 for Render
const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});