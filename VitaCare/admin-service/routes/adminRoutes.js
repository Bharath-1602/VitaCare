const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../shared/auth');
const authorize = require('../shared/roleCheck');

const USER_SERVICE = process.env.USER_SERVICE_URL || 'http://user-management-service:3002';
const DOCTOR_SERVICE = process.env.DOCTOR_SERVICE_URL || 'http://doctor-service:3005';
const REGISTRATION_SERVICE = process.env.REGISTRATION_SERVICE_URL || 'http://registration-service:3004';
const APPOINTMENT_SERVICE = process.env.APPOINTMENT_SERVICE_URL || 'http://appointment-service:3001';
const VITAL_SIGNS_SERVICE = process.env.VITAL_SIGNS_SERVICE_URL || 'http://vital-signs-service:3003';
const FORUM_SERVICE = process.env.FORUM_SERVICE_URL || 'http://forum-service:3007';
const COMPLAINT_SERVICE = process.env.COMPLAINT_SERVICE_URL || 'http://complaint-service:3008';

// Get aggregated dashboard stats
router.get('/dashboard', auth, authorize('admin'), async (req, res) => {
  try {
    const token = req.headers.authorization;
    const headers = { Authorization: token };

    const [usersRes, doctorsRes, patientsRes, appointmentsRes, complaintsRes, forumRes] = await Promise.allSettled([
      axios.get(`${USER_SERVICE}/api/users/all`, { headers }),
      axios.get(`${DOCTOR_SERVICE}/api/doctors`),
      axios.get(`${REGISTRATION_SERVICE}/api/patients`, { headers }),
      axios.get(`${APPOINTMENT_SERVICE}/api/appointments`, { headers }),
      axios.get(`${COMPLAINT_SERVICE}/api/complaints`, { headers }),
      axios.get(`${FORUM_SERVICE}/api/forum/posts`)
    ]);

    const dashboard = {
      totalUsers: usersRes.status === 'fulfilled' ? usersRes.value.data.length : 0,
      totalDoctors: doctorsRes.status === 'fulfilled' ? doctorsRes.value.data.length : 0,
      totalPatients: patientsRes.status === 'fulfilled' ? patientsRes.value.data.length : 0,
      totalAppointments: appointmentsRes.status === 'fulfilled' ? appointmentsRes.value.data.length : 0,
      totalComplaints: complaintsRes.status === 'fulfilled' ? complaintsRes.value.data.length : 0,
      totalForumPosts: forumRes.status === 'fulfilled' ? forumRes.value.data.length : 0,
      recentAppointments: appointmentsRes.status === 'fulfilled' ? appointmentsRes.value.data.slice(0, 5) : [],
      recentComplaints: complaintsRes.status === 'fulfilled' ? complaintsRes.value.data.slice(0, 5) : [],
      openComplaints: complaintsRes.status === 'fulfilled' ? complaintsRes.value.data.filter(c => c.status === 'open').length : 0,
      pendingAppointments: appointmentsRes.status === 'fulfilled' ? appointmentsRes.value.data.filter(a => a.status === 'pending').length : 0
    };

    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data.', error: error.message });
  }
});

// Proxy to user service
router.get('/users', auth, authorize('admin'), async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE}/api/users/all`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users.', error: error.message });
  }
});

// Proxy to appointment service
router.get('/appointments', auth, authorize('admin'), async (req, res) => {
  try {
    const response = await axios.get(`${APPOINTMENT_SERVICE}/api/appointments`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments.', error: error.message });
  }
});

// Proxy to complaint service
router.get('/complaints', auth, authorize('admin'), async (req, res) => {
  try {
    const response = await axios.get(`${COMPLAINT_SERVICE}/api/complaints`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching complaints.', error: error.message });
  }
});

module.exports = router;
