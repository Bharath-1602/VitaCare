const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.ADMIN_SERVICE_PORT || 3009;

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Admin Service' });
});

app.listen(PORT, () => {
  console.log(`Admin Service running on port ${PORT}`);
});
