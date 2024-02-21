//--------- Importing External modules and files ----------
const jwt = require('jsonwebtoken');
const util = require('util');
require('dotenv').config();

//--------- Importing Intenal modules and files ----------
const User = require('../models/usersModel.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');

//--------- Functional code for this file ---------
//Signing the token from env keys
const signToken = (id) => {
	const secretKey = process.env.JWT_SECRET_KEY;
	const expiresIn = process.env.JWT_EXPIRES_IN;
	return jwt.sign({ id }, secretKey, { expiresIn });
}

//Creating and sending token to the client side
const createAndSendToken = (user, statusCode, res) => {

	//Creating a jwt token
	const token = signToken(user._id);

	//Creating a cookie
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
		// secure: true, //commented it becuase else we won't be able to test it in devlopment
		httpOnly: false,
		sameSite: 'None',
	}

	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	res.cookie('jwt_cookie', token, cookieOptions);

	//Sending the token with the response

	//we are getting password in the response but we don't want it so we are removing it from response
	user.password = undefined;

	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user
		}
	});
}

//Signing up the new user and sending the cookie to the client side
exports.signup = catchAsync(async (req, res, next) => {
	// const email = req.body.email;
	// console.log("🚀 ~ exports.signup=catchAsync ~ email:", email)
	// const userExist = await UserModel.findOne({ email });
	// console.log("🚀 ~ exports.signup=catchAsync ~ userExist:", userExist)

	// if (userExist) {
	// 	return res.json({ msg: true });
	// } else {
		//Adding a new user into database.
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		role: req.body.role,
		yearOfAdmission: req.body.yearOfAdmission,
		courseYear: req.body.courseYear,
		currentStatus: req.body.currentStatus
	});

	// res.status(201).json({
	// 	status: 'success',
	// 	data: {
	// 		user: newUser
	// 	}
	// });
	
	


	//========== JWT signing & sending response (Iteration 3)
	createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const userExist = await User.findOne({ email });

    if (!userExist) {
        return res.json({ userNotFound: true });
    }

    // Check if email and passwords are provided
    if (!email || !password) {
        return next(new AppError('Email and password both are required in order to login', 400));
    }

    // Check if the email exists && the password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: 'fail',
            message: 'Incorrect email or password',
            passMatch: false,
        });
    }

    // If everything is okay, then create a new token and send it to the client side
    const token = createAndSendToken(user, 200, res);
     
});


//Setting the JWT token as null which also signifies the user is logged out
exports.logout = (req, res) => {
	res.cookie('jwt', 'loggedout', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true
	});
	res.status(200).json({ status: 'success' });
};

//Makes sure that only logged in user or user with specific person can access routes like post, update and delete
exports.protect = catchAsync(async (req, res, next) => {

	let token;
	//Check if the token is provided by the user while requesting
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	};

	//If the token not found that means the user is not logged in
	if (!token) {
		return next(new AppError('It seems that you are not logged in. Please login to be able to perform this operation', 401));
	}

	//Check if the token is valid
	const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)

	//If the user exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(new AppError('User to which this token was issued no more exists', 401));
	}

	//If password was not changed after the token was issued
	if (currentUser.passwordChangedAfter(decoded.iat)) {
		return next(new AppError('User has changed their password hence this token is no more valid', 401));
	};

	//If it reaches here means everything went correct and we can grant access to the protected route
	req.user = currentUser;
	next();
});

//This will restrict some endpoints to user with certain roles
exports.restrictTo = function (...roles) {
	return (req, res, next) => {
		//roles ['admin', 'lead-guide'] :: role = 'user'
		if (!roles.includes(req.user.role)) {
			return next(new AppError('You do not have permission to perform this action', 403));
		}
		next();
	}
}

//Updating the password
exports.updatePassword = catchAsync(async (req, res, next) => {
	//1) Get the user from the collection
	const user = await User.findById(req.user.id).select('+password');

	//2) Check if the posted password is correct
	// if(!user.correctPassword(req.body.passwordCurrent,user.password)) {
	// 	return next(new AppError('The password is incorrect', 401));
	// }
	if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
		return next(new AppError('Password is incorrect.', 401));
	}


	//3) If so update the password
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();

	//4) Log the user in, and send the JWT
	createAndSendToken(user, 200, res);
});

// send OTP 


//MAHADEV

//send email
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOTP = async (req, res) => {
    const { email } = req.body;
    
    const otp = generateOTP();
 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'atharvx555@gmail.com',
            pass: 'ftzw vbgk qgnv vmsy'
        },
    });

    // Email options
    const mailOptions = {
        from: 'telegram-clone-MH.com',
        to: email,
        subject: 'OTP Verification for QueryVerse ',
        text: `Your OTP is: ${otp}. Please use it to verify your account.`,
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ', info.response);

        await UserModel.findOneAndUpdate(
            { _id: id },
            { $set: { otp: otp } },
            
        );

        
        return res.json({send:true}); 
        
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
     
};