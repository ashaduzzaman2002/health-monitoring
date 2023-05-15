const { doctorLogin, getAllDoctor } = require("../controllers/doctorController");
const { validUser } = require("../middlewares/user");


const router = require("express").Router();

// router.post('/create', createAdmin)
router.post('/login', doctorLogin)

// router.post('/admin-details', validUser, getAdminDetails)
router.post('/all-doctor', validUser, getAllDoctor)

module.exports = router