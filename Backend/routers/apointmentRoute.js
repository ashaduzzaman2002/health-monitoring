const { bookApointment, viewApointment, deleteApointment } = require("../controllers/apointmentController");
const { validUser } = require("../middlewares/user");

const router = require("express").Router();

router.post('/book', validUser, bookApointment)
router.post('/view', validUser, viewApointment)
router.post('/delete', validUser, deleteApointment)

module.exports = router