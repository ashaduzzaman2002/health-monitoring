const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Doctor = require("../models/Doctor");



exports.doctorLogin = async (req, res) => {
    const { email, password } = req.body;

  let doctor = await Doctor.findOne({ email: email });
  if (doctor) {
    const userPassword = doctor.password;
    const isMatched = await bcrypt.compare(password, userPassword);

    if (isMatched) {
      const token = jwt.sign({ userId: doctor._id }, process.env.JWT_SECRECT, {
        expiresIn: '7d',
      });
      doctor = {
        name: doctor.name,
        email: doctor.email,
        avtar: doctor.avtar,
        id: doctor._id,
        token,
      };
      res.status(200).json({ success: true, doctor });
    } else {
      res.status(401).json({msg: 'Invalid Credentials'});
    }
  } else {
    res.status(401).json({msg: 'Invalid Credentials'});
  }
}


exports.getAllDoctor = async (req, res) => {
    try {
        let doctors = await Doctor.find({}, '-password  -_id')

        res.json({success: true, doctors})
    } catch (error) {
        console.log(error);
    }
}