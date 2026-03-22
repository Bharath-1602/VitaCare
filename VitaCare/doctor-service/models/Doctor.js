const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    trim: true
  },
  qualifications: {
    type: String,
    default: ''
  },
  experience: {
    type: Number,
    default: 0
  },
  phone: {
    type: String,
    default: ''
  },
  about: {
    type: String,
    default: ''
  },
  schedule: {
    monday: { start: String, end: String, available: { type: Boolean, default: true } },
    tuesday: { start: String, end: String, available: { type: Boolean, default: true } },
    wednesday: { start: String, end: String, available: { type: Boolean, default: true } },
    thursday: { start: String, end: String, available: { type: Boolean, default: true } },
    friday: { start: String, end: String, available: { type: Boolean, default: true } },
    saturday: { start: String, end: String, available: { type: Boolean, default: false } },
    sunday: { start: String, end: String, available: { type: Boolean, default: false } }
  },
  availableMedicines: [{
    name: String,
    description: String,
    inStock: { type: Boolean, default: true }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
