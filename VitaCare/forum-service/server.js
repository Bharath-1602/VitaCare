const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const forumRoutes = require('./routes/forumRoutes');

const app = express();
const PORT = process.env.FORUM_SERVICE_PORT || 3007;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI_FORUM || 'mongodb://localhost:27017/vitacare_forum';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Forum Service: Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/forum', forumRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Forum Service' });
});

app.listen(PORT, () => {
  console.log(`Forum Service running on port ${PORT}`);
});
