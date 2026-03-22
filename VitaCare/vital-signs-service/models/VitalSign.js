const mongoose = require('mongoose');

const vitalSignSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: [true, 'Patient ID is required']
  },
  patientName: {
    type: String,
    default: ''
  },
  doctorId: {
    type: String,
    required: [true, 'Doctor ID is required']
  },
  doctorName: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
    required: true
  },
  bloodPressure: {
    systolic: { type: Number, default: 0 },
    diastolic: { type: Number, default: 0 }
  },
  heartRate: {
    type: Number,
    default: 0
  },
  temperature: {
    type: Number,
    default: 0
  },
  weight: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  },
  oxygenLevel: {
    type: Number,
    default: 0
  },
  bloodSugar: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  },
  recordedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('VitalSign', vitalSignSchema);
