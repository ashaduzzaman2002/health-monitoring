const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const smartWatchData = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  heartRate: {
    type: String,
  },

  BP: {
    type: String,
  },

  SPO2: {
    type: String,
  },

  time: {
    type: Data,
    default: new Date.now()
  }
});


module.exports = mongoose.model('Smart_Watch_data', smartWatchData)
