const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../shared/auth');
const authorize = require('../shared/roleCheck');

// Book appointment (user only)
router.post('/', auth, authorize('user'), async (req, res) => {
  try {
    const appointment = new Appointment({
      userId: req.user.id,
      ...req.body
    });
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully.', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get appointments (filtered by role)
router.get('/', auth, async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'user') {
      filter.userId = req.user.id;
    }
    // admin sees all, doctor sees all
    const appointments = await Appointment.find(filter).sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get specific appointment
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Update appointment status (admin only)
router.put('/:id/status', auth, authorize('admin'), async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, notes: req.body.notes },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }
    res.json({ message: 'Status updated.', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Cancel own appointment (user only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }
    // Only the user who booked or admin can cancel
    if (appointment.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this appointment.' });
    }
    appointment.status = 'cancelled';
    await appointment.save();
    res.json({ message: 'Appointment cancelled.', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
