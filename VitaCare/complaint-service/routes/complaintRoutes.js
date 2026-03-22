const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const auth = require('../shared/auth');
const authorize = require('../shared/roleCheck');

// File complaint
router.post('/', auth, async (req, res) => {
  try {
    const complaint = new Complaint({
      userId: req.user.id,
      userName: req.user.name,
      ...req.body
    });
    await complaint.save();
    res.status(201).json({ message: 'Complaint filed successfully.', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get complaints (own or all for admin)
router.get('/', auth, async (req, res) => {
  try {
    let filter = {};
    if (req.user.role !== 'admin') {
      filter.userId = req.user.id;
    }
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get specific complaint
router.get('/:id', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Update/respond to complaint (admin only)
router.put('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, response: req.body.response },
      { new: true }
    );
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found.' });
    }
    res.json({ message: 'Complaint updated.', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
