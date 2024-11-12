const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = '1h';



function generateWebtoken(payload) {
  try {
    const token = jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_EXPIRE})
    return token
  } catch (error) {
    console.log(error)
  }
}

function verifyToken (token) {
  try {
    return jwt.verify(token,JWT_SECRET)
  } catch (error) {
    return false
  }
}

module.exports = {generateWebtoken,verifyToken};