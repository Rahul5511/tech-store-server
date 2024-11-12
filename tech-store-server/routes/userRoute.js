const express = require('express');
const { userCreation } = require('../controller/userController');
const {userlogin} = require('../controller/userController');
const {body,validationResult} = require('express-validator');

const routes = express.Router();

// routes.post('/user/create',userCreation);
routes.post('/user/create',
    [
      body('userName').isLength({min:5}).withMessage("username must be at least 5 characters long"),
      body('email').isEmail().withMessage("please provide a valid email"),
      body('password').isLength({min:5}).withMessage("Password must be at least 5 characters long")
    ],
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        next();
    },
    userCreation
)

routes.post('/user/login',
    [
        body('password').isLength({min:5}).withMessage("Password must be at least 5 characters long")
    ],
    (req,res,next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        next()
    },
  userlogin
)

module.exports = routes;