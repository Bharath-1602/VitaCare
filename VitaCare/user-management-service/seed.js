const User = require('./models/User');

const seedUsers = [
  {
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@vitacare.com',
    password: 'doctor123',
    role: 'doctor',
    phone: '+1-555-0101'
  },
  {
    name: 'Dr. Michael Chen',
    email: 'michael.chen@vitacare.com',
    password: 'doctor123',
    role: 'doctor',
    phone: '+1-555-0102'
  },
  {
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@vitacare.com',
    password: 'doctor123',
    role: 'doctor',
    phone: '+1-555-0103'
  },
  {
    name: 'Dr. James Wilson',
    email: 'james.wilson@vitacare.com',
    password: 'doctor123',
    role: 'doctor',
    phone: '+1-555-0104'
  },
  {
    name: 'Dr. Emily Davis',
    email: 'emily.davis@vitacare.com',
    password: 'doctor123',
    role: 'doctor',
    phone: '+1-555-0105'
  },
  {
    name: 'Admin User',
    email: 'admin@vitacare.com',
    password: 'admin123',
    role: 'admin',
    phone: '+1-555-0100'
  }
];

async function seedDatabase() {
  try {
    const count = await User.countDocuments();
    if (count > 0) {
      console.log('Users already seeded. Skipping...');
      return;
    }
    for (const userData of seedUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`Seeded user: ${userData.name} (${userData.role})`);
    }
    console.log('User seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding users:', error.message);
  }
}

module.exports = seedDatabase;
