import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import threadRoutes from './routes/threadRoutes.js';
import devLogRoutes from './routes/devlogRoutes.js';
import collaborationRoutes from './routes/collaborationRoutes.js';

// Config .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: ['http://localhost:3000','http://localhost:5173'] }));                // Allow cross-origin requests
app.use(express.json());        // Parse JSON bodies

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/threads', threadRoutes);
app.use('/api/devlogs', devLogRoutes);
app.use('/api/collaborations', collaborationRoutes);

// Home Route (optional, for testing)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
