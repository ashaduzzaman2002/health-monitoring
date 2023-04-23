const router = require("express").Router();
const { validateUser, validate, loginValidator } = require("../middlewares/validator");

// Require Controllers
const { createUser, loginUser, verifyEmail, forgotPassword } = require('../controllers/userControlers');


// Routes
router.post("/create", validateUser, validate, createUser);
router.post("/signin", loginValidator, validate, loginUser);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);


module.exports = router