const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const doctorRoutes = require('./routes/doctorRoutes');

const app = express();
const PORT = process.env.DOCTOR_SERVICE_PORT || 3005;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI_DOCTORS || 'mongodb://localhost:27017/vitacare_doctors';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Doctor Service: Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/doctors', doctorRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Doctor Service' });
});

app.listen(PORT, () => {
  console.log(`Doctor Service running on port ${PORT}`);
});
