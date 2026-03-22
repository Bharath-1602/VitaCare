const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required']
  },
  userName: {
    type: String,
    required: [true, 'User name is required']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open'
  },
  response: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
