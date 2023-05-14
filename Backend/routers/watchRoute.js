const { uploadData, getData } = require("../controllers/watchController");
const { validUser } = require("../middlewares/user");

const router = require("express").Router();

router.post('/data/collect', validUser, uploadData)
router.post('/data/get', validUser, getData)

module.exports = router