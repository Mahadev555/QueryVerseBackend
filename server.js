const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');
const appError = require('./utils/appError.js');
const globalErrorHandler = require('./controllers/errorControllers.js');
const questionsRoutes = require('./routes/questionsRoutes.js');
const answersRoutes = require('./routes/answersRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const otpRoutes = require('./routes/otproute.js');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8080;
const DOMAIN = process.env.DOMAIN || 'https://query-z4fe.onrender.com/';

const log = console.log;

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER_NAME = process.env.DB_CLUSTER_NAME;

const DB = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER_NAME}.mongodb.net`;

log(chalk.cyan('✨ App Started'));

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    log(chalk.cyan('🔐 Database Connected Successfully'));
}).catch(err => {
    log(chalk.red('Error connecting to database: ', err));
});

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(helmet());

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

app.use('/api/v1/questions', questionsRoutes);
app.use('/api/v1/answers', answersRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/otp',otpRoutes)

app.use(globalErrorHandler);

app.all('*', (req, res, next) => {
    next(new appError(`${req.originalUrl} was not found on the server. Please check the Url :D`));
});

const server = app.listen(PORT, () => {
    log(chalk.cyan(`🏃 Server has started on ${DOMAIN}:${PORT}/`));
});

process.on('unhandledRejection', err => {
    log(chalk.red('Unhandled Promise Rejection: ', err));
    log('Unhandled Error Detected! 💥 Closing down the application...');
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    log('SIGTERM received. Shutting down the server 👋');
    server.close(() => {
        log('💥 Process terminated');
    });
});
