const createUser = require('../models/userCreation');
const logger = require('../utils/logger');
const {generateWebtoken} = require('../utils/jwtToken')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_TOKEN = process.env.JWT_SECRET 

const userCreation =async (req,res,next) => {
  try {
    // console.log(req.body)
    const {userName,email,password} = req.body;
    const userExists =await createUser.findOne({email});
    const error = new Error('This is a test error')
    error.statusCode = 400
    if(userExists){
      next(error)
      logger.error('user already exists')
     return res.status(400).send("user already exists");
    }

    const userEntry = new createUser({userName,email,password})
    userEntry.save();
    logger.info('user created successfully')
    res.status(201).send("user created successfully")
  } catch (error) {
    console.log(error)
    logger.error('Internal server error')
    res.status(500).send('Internal server error')
  }
}

// const payload = {
//   id: 1,
//   username: 'testUser'
// };

const userlogin =async (req,res) => {
   try {
      const {userName,email,password} = req.body;
      const checkUsername =await createUser.findOne({userName});
      const checkemail =await createUser.findOne({email});
      const checkPassword = await checkemail.comparePassword(password);
      const token = generateWebtoken({userName:checkUsername.userName,email:checkUsername.email})
      if(checkUsername || checkemail && checkPassword){
        logger.info("logged in successfully")
        res.status(200).send({messaege:"logged in successfully",tokens:token})
      }else{
        logger.info("please check your login credentials")
        res.status(400).send({messaege:"please check your login credentials"})
      }
   } catch (error) {
     res.status(500).send("Internal server error")
   }
}

module.exports = {userCreation,userlogin}