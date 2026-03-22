const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.APPOINTMENT_SERVICE_PORT || 3001;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI_APPOINTMENTS || 'mongodb://localhost:27017/vitacare_appointments';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Appointment Service: Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/appointments', appointmentRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Appointment Service' });
});

app.listen(PORT, () => {
  console.log(`Appointment Service running on port ${PORT}`);
});
