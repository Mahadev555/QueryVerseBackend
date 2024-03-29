//--------- Including all the external packages -----------
const express = require('express');

//--------- Importing internal modules and files ----------
const route = express.Router();
const usersControllers = require('../controllers/usersControllers.js');
const authControllers = require('../controllers/authControllers.js');
const otpControllers = require('../controllers/otpcontroller.js');

//--------- Middlewares -----------
route.use(express.json());

//--------- Functional code for this file ---------
route.post('/signup', authControllers.signup);
route.post('/login', authControllers.login);
route.get('/logout', authControllers.logout);

//send OTP


route.route('/').get(authControllers.protect, authControllers.restrictTo('Admin'), usersControllers.getAllUsers);
route.route('/getAll').get(usersControllers.getAllUsers);
route.route('/me').get(authControllers.protect, usersControllers.getMe, usersControllers.getSingleUser);
route.route('/updateMe').patch(authControllers.protect, usersControllers.updateMe);
route.route('/getuser/:id').get(authControllers.protect,usersControllers.getSingleUser);
route.route('/deleteMe').delete(authControllers.protect, usersControllers.deleteMe);

//--------- Post function Assignment ---------------
module.exports = route;