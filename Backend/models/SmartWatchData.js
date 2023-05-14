const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const smartWatchData = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
  },

  heartRate: {
    type: String,
  },

  bloodPresure: {
    type: String,
  },

  time: {
    type: Date,
    default: Date.now({timeZone: "Asia/Kolkata"}),
  }
});


module.exports = mongoose.model('Smart_Watch_data', smartWatchData)
