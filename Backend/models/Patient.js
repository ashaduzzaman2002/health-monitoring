const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },

  email: {
    type: String,
    required: true,
    uniquie: true,
  },

  password: {
    type: String,
    required: true,
  },

  age: {
    type: String,
  },

  gender: {
    type: String,
  },

  blodGroup: {
    type: String,
  },

  height: {
    type: Number,
  },

  weight: {
    type: Number,
  },

  userCreated: {
    type: Date,
    default: Date.now,
  },

  //   healthLogs: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: 'HealthLog',
  //     },
  //   ],

  //   smartWatchData: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: 'HealthLog',
  //     },
  //   ],

  //   prescriptions: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: 'Prescription',
  //     },
  //   ],
});

module.exports = mongoose.model('Patient', patientSchema);
