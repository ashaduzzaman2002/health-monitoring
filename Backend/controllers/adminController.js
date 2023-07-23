const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Apointments = require('../models/Apointment')

// exports.createAdmin = async (req, res) => {
//     const {name, email, password} = req.body
//     const hashpassword = await bcrypt.hash(password, 8);

//     const user = new Admin({
//         name,
//         password: hashpassword,
//         email
//     })

//     res.json(user)

//     await user.save()
// }

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  let admin = await Admin.findOne({ email: email });
  if (admin) {
    const userPassword = admin.password;
    const isMatched = await bcrypt.compare(password, userPassword);

    if (isMatched) {
      const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRECT, {
        expiresIn: '7d',
      });
      admin = {
        name: admin.name,
        email: admin.email,
        avtar: admin.avtar,
        id: admin._id,
        token,
      };
      res.status(200).json({ success: true, admin });
    } else {
      res.status(401).json({ msg: 'Invalid Credentials' });
    }
  } else {
    res.status(401).json({ msg: 'Invalid Credentials' });
  }
};

exports.getAdminDetails = (req, res) => {
  const userId = req.userId;

  res.json({ userId });
};

exports.addDoctor = async (req, res) => {
  const { name, email, password, degree, college } = req.body;

  try {
    let doctor = await Doctor.findOne({ email });

    if (doctor) return res.status(401).json({ msg: 'Already resgister' });
    const hashpassword = await bcrypt.hash(password, 8)
    doctor = new Doctor({
      name,
      email,
      password: hashpassword,
      degree,
      college,
    });

    await doctor.save();

    res.json({ success: true, msg: 'Doctor registered successfully' });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllPatient = async (req, res) => {
  try {
    let patients = await Patient.find({}, '-password  -_id');

    res.json({ success: true, patients });
  } catch (error) {
    console.log(error);
  }
};


exports.allApointments = async (req, res) => {
  try {
    const apointments = await Apointments.find()

    res.json({success: true, apointments})
  } catch (error) {
    console.log(object);
  }
}
