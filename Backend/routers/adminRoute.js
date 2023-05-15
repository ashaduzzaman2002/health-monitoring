const { createAdmin, adminLogin, getAdminDetails, addDoctor } = require("../controllers/adminController");
const { validUser, isAdmin } = require("../middlewares/user");

const router = require("express").Router();

// router.post('/create', createAdmin)
router.post('/login', adminLogin)

router.post('/admin-details', validUser, getAdminDetails)
router.post('/add-doctor', validUser, isAdmin, addDoctor)

module.exports = router