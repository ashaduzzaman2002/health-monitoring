const Apointment = require('../models/Apointment');

exports.bookApointment = async (req, res) => {
  const { time, patient, patientName, patientEmail, doctorName, doctorEmail } =
    req.body;

  try {
    let newApointment = new Apointment({
      time,
      patient,
      patientName,
      patientEmail,
      doctorName,
      doctorEmail,
    });

    await newApointment.save();
    res.json({
      success: true,
      msg: 'Apointment Booked Successfully',
      apointment: newApointment,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.viewApointment = async (req, res) => {
  const { doctorEmail } = req.body;
  const userId = req.userId;

  console.log(userId);

  try {
    let apointments = await Apointment.find({
      $or: [{ patient: userId }, { doctorEmail }],
    });
    res.json(apointments);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteApointment = async (req, res) => {
  const { id } = req.body;

  console.log(id);

  try {
    let apointment = await Apointment.findById(id);

    if (!apointment)
      return res.status(404).json({ msg: 'Apointment not found' });

    await Apointment.findByIdAndDelete(id);
    res.json({ msg: 'Apointment Deleted' });
  } catch (error) {
    console.log(object);
  }
};
