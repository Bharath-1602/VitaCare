const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required']
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    default: 'O+'
  },
  phone: {
    type: String,
    required: [true, 'Phone is required']
  },
  email: {
    type: String,
    lowercase: true
  },
  address: {
    type: String,
    default: ''
  },
  medicalHistory: {
    type: String,
    default: ''
  },
  allergies: {
    type: String,
    default: ''
  },
  assignedDoctor: {
    type: String,
    default: ''
  },
  assignedDoctorName: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Patient', patientSchema);
