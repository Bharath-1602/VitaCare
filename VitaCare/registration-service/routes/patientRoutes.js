const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const auth = require('../shared/auth');
const authorize = require('../shared/roleCheck');

// Register patient
router.post('/register', auth, async (req, res) => {
  try {
    const patient = new Patient({
      userId: req.user.id,
      ...req.body
    });
    await patient.save();
    res.status(201).json({ message: 'Patient registered successfully.', patient });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get all patients (admin/doctor only)
router.get('/', auth, authorize('admin', 'doctor'), async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get patient by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get patient by user ID
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.params.userId });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Update patient
router.put('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }
    res.json({ message: 'Patient updated.', patient });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Assign doctor to patient
router.put('/:id/assign-doctor', auth, authorize('admin', 'doctor'), async (req, res) => {
  try {
    const { doctorId, doctorName } = req.body;
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { assignedDoctor: doctorId, assignedDoctorName: doctorName },
      { new: true }
    );
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }
    res.json({ message: 'Doctor assigned to patient.', patient });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
