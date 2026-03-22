const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const complaintRoutes = require('./routes/complaintRoutes');

const app = express();
const PORT = process.env.COMPLAINT_SERVICE_PORT || 3008;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI_COMPLAINTS || 'mongodb://localhost:27017/vitacare_complaints';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Complaint Service: Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/complaints', complaintRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Complaint Service' });
});

app.listen(PORT, () => {
  console.log(`Complaint Service running on port ${PORT}`);
});
