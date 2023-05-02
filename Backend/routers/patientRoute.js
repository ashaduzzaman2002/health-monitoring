const { check } = require('express-validator')
const { signupPaitent, signinPatient } = require('../controllers/patientControlers')
const { validateUser, validate } = require('../middlewares/validator')

const router = require('express').Router()


router.post('/signup', validateUser, validate, signupPaitent)
router.post('/signin', validateUser, validate, signinPatient)

module.exports = router