const mongoose = require('mongoose');


exports.dbConnection = () => {
    mongoose.connect(process.env.MONGO_LOCAL_URL)
    .then(() => console.log('DB connected successfully'))
    .catch( err => console.log(err))
}