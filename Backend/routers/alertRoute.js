const { sendAlert } = require("../controllers/alertController");
const { validUser } = require("../middlewares/user");

const router = require("express").Router();

router.post('/send', validUser, sendAlert)

module.exports = router