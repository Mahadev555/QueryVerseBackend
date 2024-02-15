const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app.js');

const PORT = process.env.PORT || 8080; // Use Render's PORT variable
const DOMAIN = process.env.DOMAIN || 'https://query-z4fe.onrender.com/'; // Use Render's domain

const log = console.log;

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER_NAME = process.env.DB_CLUSTER_NAME;

const DB = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER_NAME}.mongodb.net/`;

log(chalk.cyan('✨ App Started'));

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    log(chalk.cyan('🔐 Database Connected Successfully'));
}).catch(err => {
    log(chalk.red('Error connecting to database: ', err));
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
