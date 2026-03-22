const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const patientRoutes = require('./routes/patientRoutes');

const app = express();
const PORT = process.env.REGISTRATION_SERVICE_PORT || 3004;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI_PATIENTS || 'mongodb://localhost:27017/vitacare_patients';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Registration Service: Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/patients', patientRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Registration Service' });
});

app.listen(PORT, () => {
  console.log(`Registration Service running on port ${PORT}`);
});
