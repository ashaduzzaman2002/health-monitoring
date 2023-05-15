const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  avtar: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },

  verified: {
    type: Boolean,
    required: true,
    default: false,
  },

  age: {
    type: String,
  },

  gender: {
    type: String,
  },

  bloodGroup: {
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

});

module.exports = mongoose.model('Patient', patientSchema);
