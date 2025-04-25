const otpModel = require('../models/otpModel');
const nodemailer = require("nodemailer");
const User = require('../models/usersModel.js');

//send email
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendEmail = async (req, res) => {

    const { email } = req.body;

    const otp = generateOTP();
    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.json({ userExist: true });
    } else {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'atharvx555@gmail.com',
                pass: 'ftzw vbgk qgnv vmsy'
            },
        });

        // Email options
        const mailOptions = {
            from: 'queryverse-MH.com',
            to: email,
            subject: ' QueryVerse OTP Verification  ',
            text: `Your OTP is: ${otp}. Please use it to verify your account.`,
        };

        try {
            // Send email
            console.log("aaaaa")
            const info = await transporter.sendMail(mailOptions);


            await otpModel.create({
                email: email,
                otp: otp
            }
            );


            return res.json({ send: true });

        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }


};


//verify otp
exports.verifyotp = async (req, res) => {
    try {
        const { email, EnteredOtp } = req.body;

        const userExist = await otpModel.findOne({ email: email });

        if (!userExist) {
            return res.json({ userNotFound: true });
        }
        if (!userExist.otp) {
            return res.json({ expired: true })
        }
        // Check 
        if (userExist.otp != EnteredOtp) {
            return res.json({ otpMatch: false });
        }

        // Clear  OTP 
        await otpModel.findOneAndUpdate(
            { email: userExist.email },
            { $unset: { otp: 1 } }
        );

        return res.json({ otpMatch: true });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

