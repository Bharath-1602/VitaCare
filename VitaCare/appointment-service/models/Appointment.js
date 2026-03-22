const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: [true, 'Patient ID is required']
  },
  patientName: {
    type: String,
    required: [true, 'Patient name is required']
  },
  doctorId: {
    type: String,
    required: [true, 'Doctor ID is required']
  },
  doctorName: {
    type: String,
    required: [true, 'Doctor name is required']
  },
  userId: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: [true, 'Appointment date is required']
  },
  time: {
    type: String,
    required: [true, 'Appointment time is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  reason: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
