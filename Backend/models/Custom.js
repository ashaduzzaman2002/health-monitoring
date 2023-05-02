const mongoose = require('mongoose');

// Define schema for users collection
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  healthConditions: {
    type: [String],
    required: true
  }
});

// Define schema for appointments collection
const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Canceled'],
    default: 'Pending'
  }
});

// Define schema for health data collection
const healthDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  heartRate: {
    type: Number,
    required: true
  },
  bloodPressure: {
    systolic: {
      type: Number,
      required: true
    },
    diastolic: {
      type: Number,
      required: true
    }
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Export the User, Appointment, and HealthData models based on the schemas
module.exports = {
  User: mongoose.model('User', userSchema),
  Appointment: mongoose.model('Appointment', appointmentSchema),
  HealthData: mongoose.model('HealthData', healthDataSchema)
};
