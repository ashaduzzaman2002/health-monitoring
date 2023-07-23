const { doctorLogin, getAllDoctor, getDoctor } = require("../controllers/doctorController");
const { validUser } = require("../middlewares/user");


const router = require("express").Router();

// router.post('/create', createAdmin)
router.post('/login', doctorLogin)
router.post('/all-doctor', validUser, getAllDoctor)
router.post('/get-doctor', validUser, getDoctor)

module.exports = router