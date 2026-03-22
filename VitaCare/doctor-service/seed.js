const Doctor = require('./models/Doctor');

const seedDoctors = [
  {
    userId: 'seed-doctor-1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@vitacare.com',
    specialization: 'Cardiology',
    qualifications: 'MBBS, MD (Cardiology), FACC',
    experience: 12,
    phone: '+1-555-0101',
    about: 'Board-certified cardiologist with 12+ years of experience in interventional cardiology and heart failure management.',
    schedule: {
      monday: { start: '09:00', end: '17:00', available: true },
      tuesday: { start: '09:00', end: '17:00', available: true },
      wednesday: { start: '09:00', end: '13:00', available: true },
      thursday: { start: '09:00', end: '17:00', available: true },
      friday: { start: '09:00', end: '15:00', available: true },
      saturday: { start: '10:00', end: '13:00', available: true },
      sunday: { available: false }
    },
    availableMedicines: [
      { name: 'Aspirin 75mg', description: 'Blood thinner', inStock: true },
      { name: 'Atorvastatin 20mg', description: 'Cholesterol lowering', inStock: true },
      { name: 'Metoprolol 50mg', description: 'Beta blocker', inStock: true }
    ]
  },
  {
    userId: 'seed-doctor-2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@vitacare.com',
    specialization: 'Orthopedics',
    qualifications: 'MBBS, MS (Ortho), Fellowship in Sports Medicine',
    experience: 8,
    phone: '+1-555-0102',
    about: 'Orthopedic surgeon specializing in sports injuries, joint replacement, and minimally invasive arthroscopic procedures.',
    schedule: {
      monday: { start: '08:00', end: '16:00', available: true },
      tuesday: { start: '08:00', end: '16:00', available: true },
      wednesday: { start: '08:00', end: '16:00', available: true },
      thursday: { start: '08:00', end: '12:00', available: true },
      friday: { start: '08:00', end: '16:00', available: true },
      saturday: { available: false },
      sunday: { available: false }
    },
    availableMedicines: [
      { name: 'Ibuprofen 400mg', description: 'Anti-inflammatory', inStock: true },
      { name: 'Calcium + Vitamin D', description: 'Bone health supplement', inStock: true }
    ]
  },
  {
    userId: 'seed-doctor-3',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@vitacare.com',
    specialization: 'Pediatrics',
    qualifications: 'MBBS, MD (Pediatrics), DCH',
    experience: 15,
    phone: '+1-555-0103',
    about: 'Compassionate pediatrician with 15 years of experience in child healthcare, immunizations, and developmental assessments.',
    schedule: {
      monday: { start: '09:30', end: '17:30', available: true },
      tuesday: { start: '09:30', end: '17:30', available: true },
      wednesday: { start: '09:30', end: '17:30', available: true },
      thursday: { start: '09:30', end: '17:30', available: true },
      friday: { start: '09:30', end: '14:00', available: true },
      saturday: { start: '10:00', end: '14:00', available: true },
      sunday: { available: false }
    },
    availableMedicines: [
      { name: 'Paracetamol Syrup', description: 'Fever and pain relief', inStock: true },
      { name: 'Amoxicillin Syrup', description: 'Antibiotic for infections', inStock: true },
      { name: 'ORS Packets', description: 'Oral rehydration salts', inStock: true }
    ]
  },
  {
    userId: 'seed-doctor-4',
    name: 'Dr. James Wilson',
    email: 'james.wilson@vitacare.com',
    specialization: 'Dermatology',
    qualifications: 'MBBS, MD (Dermatology), FRCP',
    experience: 10,
    phone: '+1-555-0104',
    about: 'Expert dermatologist specializing in acne treatment, skin allergies, cosmetic dermatology, and laser therapy.',
    schedule: {
      monday: { start: '10:00', end: '18:00', available: true },
      tuesday: { start: '10:00', end: '18:00', available: true },
      wednesday: { available: false },
      thursday: { start: '10:00', end: '18:00', available: true },
      friday: { start: '10:00', end: '18:00', available: true },
      saturday: { start: '10:00', end: '15:00', available: true },
      sunday: { available: false }
    },
    availableMedicines: [
      { name: 'Clindamycin Gel', description: 'Topical antibiotic for acne', inStock: true },
      { name: 'Hydrocortisone Cream', description: 'Anti-inflammatory', inStock: true }
    ]
  },
  {
    userId: 'seed-doctor-5',
    name: 'Dr. Emily Davis',
    email: 'emily.davis@vitacare.com',
    specialization: 'General Medicine',
    qualifications: 'MBBS, MD (Internal Medicine)',
    experience: 6,
    phone: '+1-555-0105',
    about: 'General physician providing comprehensive primary care including preventive health, chronic disease management, and health check-ups.',
    schedule: {
      monday: { start: '08:30', end: '17:00', available: true },
      tuesday: { start: '08:30', end: '17:00', available: true },
      wednesday: { start: '08:30', end: '17:00', available: true },
      thursday: { start: '08:30', end: '17:00', available: true },
      friday: { start: '08:30', end: '17:00', available: true },
      saturday: { start: '09:00', end: '13:00', available: true },
      sunday: { available: false }
    },
    availableMedicines: [
      { name: 'Paracetamol 500mg', description: 'Fever and pain relief', inStock: true },
      { name: 'Cetirizine 10mg', description: 'Antihistamine', inStock: true },
      { name: 'Omeprazole 20mg', description: 'Acid reflux', inStock: true },
      { name: 'Azithromycin 500mg', description: 'Antibiotic', inStock: true }
    ]
  }
];

async function seedDatabase() {
  try {
    const count = await Doctor.countDocuments();
    if (count > 0) {
      console.log('Doctors already seeded. Skipping...');
      return;
    }
    await Doctor.insertMany(seedDoctors);
    console.log('Doctor seed data inserted successfully! (5 doctors)');
  } catch (error) {
    console.error('Error seeding doctors:', error.message);
  }
}

module.exports = seedDatabase;
