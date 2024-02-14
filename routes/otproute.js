// otpRoutes.js

const express = require('express');
const otpControllers = require('../controllers/otpcontroller');

const router = express.Router();

router.post('/sendOtp', otpControllers.sendEmail);
router.post('/verifyOtp', otpControllers.verifyotp);



module.exports = router;
