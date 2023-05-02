// Models
const VerifcationToken = require("../models/VerificationToken");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
// const { generateOTP, mailTransport, mailTemplete, welcomeMail } = require("../utils/mail");
// const { isValidObjectId } = require("mongoose");
// const { findById } = require("../models/User");
// const ResetPassToken = require("../models/ResetPassToken");

// Create user
exports.signupPaitent = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const patient = await Patient.findOne({ email: email });

    if (!patient) {
      // Hashing the password
      const hashpassword = await bcrypt.hash(password, 8);

      const newPatient = new Patient({
        name,
        email,
        password: hashpassword,
      });

      const otp = generateOTP();

      const hashOTP = await bcrypt.hash(otp, 8);

      const verifcationToken = VerifcationToken({
        owner: newUser._id,
        token: hashOTP,
      });

      await verifcationToken.save();
      await newPatient.save();

      mailTransport().sendMail({
        from: "crezytechy@gmail.com",
        to: newUser.email,
        subject: "Please verify your email account",
        html: mailTemplete(otp),
      });

      res.status(200).json({ success: true, msg: "Register Successfully" });
    }

    res.status(403).json({msg: "User Already exist"})
  } catch (error) {
    console.log(error);
  }
};

// Login user
exports.signinPatient = async (req, res) => {
  const { email, password } = req.body;

  let patient = await Patient.findOne({ email });
  if (patient) {
    const userPassword = user.password;
    const isMatched = await bcrypt.compare(password, userPassword);

    if (isMatched) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRECT, {
        expiresIn: "7d",
      });
      patient = {
        name: patient.name,
        email: patient.email,
        id: user._id,
        token,
      };
      res.status(200).json({ success: true, patient });
    } else {
      sendError(res, "Invalid Credentials");
    }
  } else {
    sendError(res, "Invalid Credentials");
  }
};


// // Verify email
exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp.trim())
    return sendError(res, "Invalid request, missing parameters!");

  if (!isValidObjectId(userId)) return sendError(res, "Invalid user id!");
  const user = await User.findById(userId);
  if (user) {
    if (!user.verified) {
      const token = await VerifcationToken.findOne({ owner: userId });
      if (token) {
        const isMatched = await bcrypt.compare(otp, token.token);
        if (isMatched) {
          user.verified = true;
          await VerifcationToken.findByIdAndDelete(token._id);
          await user.save();
          mailTransport().sendMail({
            from: "crezytechy@gmail.com",
            to: user.email,
            subject: "Welcome to our company",
            html: welcomeMail(),
          });

          res.status(200).json({success: true, msg: 'Your email is verified'})
        } else {
          sendError(res, "Worng OTP");
        }
      } else {
        sendError(res, "User not found");
      }
    } else {
      sendError(res, "User already verified");
    }
  } else {
    sendError(res, "User not found");
  }
};


// Forgot password
exports.forgotPassword = async (req, res) => {
  const {email} = req.body;

  if(!email) return sendError(res, 'Please provide a valid email')

  const user = await User.findOne({email})
  if(!user) return sendError(res, 'User not found')

  const token = await ResetPassToken.findOne({owner: user._id})
  if(token) return sendError(res, 'After one hour you can request for your OTP')

}