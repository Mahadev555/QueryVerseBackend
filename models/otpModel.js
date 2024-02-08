const mongoose = require('mongoose'); 
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        
        lowercase: true,
     
    },
    otp: {
        type: String,
        required: [true, 'OTP is required'],
        
    }
    
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
