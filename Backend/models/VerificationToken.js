const mongoose = require('mongoose')
const Schema = mongoose.Schema

const verifcationToken = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    token: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        expires: 600,
        default: Date.now(),
    },
})


module.exports = mongoose.model('verificationToken', verifcationToken)