const { createAdmin, adminLogin, getAdminDetails, addDoctor, getAllPatient, allApointments } = require("../controllers/adminController");
const { validUser, isAdmin } = require("../middlewares/user");

const router = require("express").Router();

// router.post('/create', createAdmin)
router.post('/login', adminLogin)

router.post('/admin-details', validUser, getAdminDetails)
router.post('/add-doctor', validUser, isAdmin, addDoctor)
router.post('/all-patients', validUser, isAdmin, getAllPatient)
router.post('/all-apointments', validUser, isAdmin, allApointments)

module.exports = router