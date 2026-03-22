const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const vitalRoutes = require('./routes/vitalRoutes');

const app = express();
const PORT = process.env.VITAL_SIGNS_SERVICE_PORT || 3003;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI_VITALS || 'mongodb://localhost:27017/vitacare_vitals';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Vital Signs Service: Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/vitals', vitalRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Vital Signs Service' });
});

app.listen(PORT, () => {
  console.log(`Vital Signs Service running on port ${PORT}`);
});
