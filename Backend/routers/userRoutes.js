const User = require('../models/User');

const Router = require('express').Router;
const router = Router();

router.post('/register', async (req, res) => {
    const user = new User({name: "Ashadu", email: "as@g.com", password: "wejrwejr"})
    await user.save()
})

module.exports = router