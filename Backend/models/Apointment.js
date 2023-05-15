const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const apointmentSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
  },

  patientName: {
    type: String,
  },

  patientEmail: {
    type: String,
  },

  doctorName: {
    type: String,
  },

  doctorEmail: {
    type: String,
  },

  time: {
    type: String
  }
}, {
    timestamps: true
});


module.exports = mongoose.model('Apointment', apointmentSchema)
