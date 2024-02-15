//--------- Including all the external packages -----------
//Node Js required
const express = require('express');
//Debugging
const morgan = require('morgan');
//Security
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

//--------- Importing internal modules and files ----------
const questionsRoutes = require('./routes/questionsRoutes.js');
const answersRoutes = require('./routes/answersRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const otpRoutes = require('./routes/otproute.js');
const globalErrorHandler = require('./controllers/errorControllers.js');
const appError = require('./utils/appError.js');

//--------- Variable assignment ------------------
const app = express();

//--------- Middlewares ----------------
app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(helmet());

app.post('/upload', async (req, res) => {
  try {
      const file = req.body.file; // assuming the file is sent in the request body

      const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/detjwtn7c/image/upload`, // Replace 'detjwtn7c' with your cloud_name
          file,
          {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Basic ${Buffer.from('383326321776236' + ':' + 'JyEerDTSNT3fFEjPsbo0C32H57o').toString('base64')}`,
              },
          }
      );

      res.json(cloudinaryResponse.data);
  } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60*60*1000,
  message: 'Too many request from this IP please try again later after an hour'
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({
  whitelist: [
    'duration',
    'ratingQuantity',
    'ratingAverage',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
}));

app.use(compression());

//--------- Functional code for this file ---------
//Routes mounting
app.use('/api/v1/questions', questionsRoutes);
app.use('/api/v1/answers', answersRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/otp',otpRoutes)

//Global error handlers added
app.use(globalErrorHandler);

//Unhandled errors handled
app.all('*', (req, res, next) => {
	next(new appError(`${req.originalUrl} was not found on the server. Please check the Url :D`));
});

//--------- Post function Assignment -------------
module.exports = app; 