const jwt = require('jsonwebtoken');
const generateWebtoken = require('../utils/jwtToken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET

// Secret key for signing the JWT (use a secure key in real applications)

// Function to generate JWT
function generateToken(payload) {
    // Create the token with the payload, secret, and expiration options
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

// Example usage
const payload = {
    id: 1,
    username: 'testUser'
};
const toke = generateWebtoken(payload);
console.log(toke)

const token = generateToken(payload);
console.log("Generated Token:", token);

module.exports = {generateToken}