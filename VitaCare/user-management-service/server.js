const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const userRoutes = require('./routes/userRoutes');
const seedDatabase = require('./seed');

const app = express();
const PORT = process.env.USER_SERVICE_PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI_USERS || 'mongodb://localhost:27017/vitacare_users';
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('User Management Service: Connected to MongoDB');
    await seedDatabase();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'User Management Service' });
});

app.listen(PORT, () => {
  console.log(`User Management Service running on port ${PORT}`);
});
