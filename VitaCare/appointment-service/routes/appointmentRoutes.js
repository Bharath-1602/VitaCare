const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../shared/auth');
const authorize = require('../shared/roleCheck');

// Book appointment
router.post('/', auth, async (req, res) => {
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
    } else if (req.user.role === 'doctor') {
      filter.doctorId = req.query.doctorId || req.user.id;
    }
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

// Update appointment
router.put('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }
    res.json({ message: 'Appointment updated.', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Update appointment status (doctor/admin)
router.put('/:id/status', auth, authorize('doctor', 'admin'), async (req, res) => {
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

// Cancel appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }
    res.json({ message: 'Appointment cancelled.', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
