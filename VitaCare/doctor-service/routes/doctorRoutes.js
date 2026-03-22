const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const auth = require('../shared/auth');
const authorize = require('../shared/roleCheck');

// Create doctor profile (doctor only)
router.post('/profile', auth, authorize('doctor'), async (req, res) => {
  try {
    const existingProfile = await Doctor.findOne({ userId: req.user.id });
    if (existingProfile) {
      return res.status(400).json({ message: 'Doctor profile already exists.' });
    }

    const doctor = new Doctor({
      userId: req.user.id,
      name: req.user.name,
      email: req.user.email,
      ...req.body
    });
    await doctor.save();
    res.status(201).json({ message: 'Doctor profile created.', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Update doctor profile (doctor only)
router.put('/profile', auth, authorize('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.user.id },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found.' });
    }
    res.json({ message: 'Profile updated.', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Update medicine availability (doctor only)
router.put('/medicines', auth, authorize('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.user.id },
      { availableMedicines: req.body.medicines },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found.' });
    }
    res.json({ message: 'Medicine availability updated.', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get doctor schedule
router.get('/schedule/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('name schedule');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
