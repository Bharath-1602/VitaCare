const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../shared/auth');

// Create post
router.post('/posts', auth, async (req, res) => {
  try {
    const post = new Post({
      userId: req.user.id,
      userName: req.user.name,
      ...req.body
    });
    await post.save();
    res.status(201).json({ message: 'Post created.', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) filter.category = category;
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get specific post
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Add comment to post
router.post('/posts/:id/comments', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    post.comments.push({
      userId: req.user.id,
      userName: req.user.name,
      text: req.body.text
    });
    await post.save();
    res.status(201).json({ message: 'Comment added.', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Delete own post
router.delete('/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    if (post.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this post.' });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
