const router = require("express").Router();
const { validateUser, validate, loginValidator } = require("../middlewares/validator");

// Require Controllers
const { isResetTokenValid } = require("../middlewares/user");
const { createPatient, loginPatient, verifyEmail, forgotPassword, resetPassword } = require("../controllers/patientControlers");


// Routes
router.post("/create", validateUser, validate, createPatient);
router.post("/signin", loginValidator, validate, loginPatient);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post('/reset-password', isResetTokenValid, resetPassword)
router.get('/verify-token', isResetTokenValid, (req, res) => {
    res.json({success: true})
})


module.exports = router