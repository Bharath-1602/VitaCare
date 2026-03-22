const express = require('express');
const router = express.Router();
const VitalSign = require('../models/VitalSign');
const auth = require('../shared/auth');
const authorize = require('../shared/roleCheck');

// Create vital record (doctor only)
router.post('/', auth, authorize('doctor'), async (req, res) => {
  try {
    const vitalSign = new VitalSign({
      doctorId: req.user.id,
      doctorName: req.user.name,
      userId: req.user.id,
      ...req.body
    });
    await vitalSign.save();
    res.status(201).json({ message: 'Vital signs recorded.', vitalSign });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get vitals by patient
router.get('/patient/:patientId', auth, async (req, res) => {
  try {
    const vitals = await VitalSign.find({ patientId: req.params.patientId }).sort({ recordedAt: -1 });
    res.json(vitals);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get all vitals (admin/doctor)
router.get('/', auth, authorize('admin', 'doctor'), async (req, res) => {
  try {
    const vitals = await VitalSign.find().sort({ recordedAt: -1 });
    res.json(vitals);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Get specific vital record
router.get('/:id', auth, async (req, res) => {
  try {
    const vitalSign = await VitalSign.findById(req.params.id);
    if (!vitalSign) {
      return res.status(404).json({ message: 'Vital sign record not found.' });
    }
    res.json(vitalSign);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Update vital record (doctor only)
router.put('/:id', auth, authorize('doctor'), async (req, res) => {
  try {
    const vitalSign = await VitalSign.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!vitalSign) {
      return res.status(404).json({ message: 'Vital sign record not found.' });
    }
    res.json({ message: 'Vital signs updated.', vitalSign });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Delete vital record (doctor only)
router.delete('/:id', auth, authorize('doctor'), async (req, res) => {
  try {
    const vitalSign = await VitalSign.findByIdAndDelete(req.params.id);
    if (!vitalSign) {
      return res.status(404).json({ message: 'Vital sign record not found.' });
    }
    res.json({ message: 'Vital sign record deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
