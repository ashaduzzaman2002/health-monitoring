const { isValidObjectId } = require('mongoose');
const Patient = require('../models/Patient');
const ResetPassToken = require('../models/ResetPassToken');
const jwt = require('jsonwebtoken')

exports.isResetTokenValid = async (req, res, next) => {
  const { token, id } = req.query;

  if (!token || !id)
    return res.status(401).json({ message: 'Invalid request!' });

  if (!isValidObjectId(id))
    return res.status(401).json({ message: 'Invalid user' });

  const user = await Patient.findById(id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  const resetToken = await ResetPassToken.findOne({ owner: user._id });
  if (!resetToken)
    return res.status(404).json({ message: 'Reset token not found!' });

  const isValid = resetToken.token === token

  if (!isValid)
    return res.status(401).json({ message: 'Reset token is invalid!' });
  req.user = user;
  next()
};
// valid auth token 
exports.validUser = 

async (req, res, next) => {
  const {token} = req.body
  if(!token) return res.status(404).json({msg: 'Token not found'})
  
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRECT)
    if(!decode.userId) res.status(404).json({msg: 'User not found'})
    req.userId = decode.userId
    next()
  } catch (error) {
    res.status(401).json({msg: 'Invalid Token'})
  }
  
}