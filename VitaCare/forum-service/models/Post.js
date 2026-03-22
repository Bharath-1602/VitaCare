const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required']
  },
  userName: {
    type: String,
    required: [true, 'User name is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  category: {
    type: String,
    enum: ['General', 'Health Tips', 'Questions', 'Experience', 'Announcements'],
    default: 'General'
  },
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
