const { sendAlert, sendReminder } = require("../controllers/alertController");
const { validUser } = require("../middlewares/user");

const router = require("express").Router();

router.post('/send', validUser, sendAlert)
router.post('/send-reminder', validUser, sendReminder)

module.exports = router