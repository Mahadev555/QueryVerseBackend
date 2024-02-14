//--------- Including all the external packages -----------
const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
require('dotenv').config();

//--------- Importing internal modules and files ----------
const app = require('./app.js');


//--------- Variable assignment ------------------
const PORT = process.env.PORT || 8080;
const DOMAIN = process.env.DOMAIN || 'http://localhost';
const log = console.log;
const DB = 'mongodb+srv://mahadev555:mahadev555@cluster0.rtew6mz.mongodb.net/'

//--------- Functional code for this file ---------
log(chalk.cyan('✨ App Started'));

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
	log(chalk.cyan('🔐 Database Connected Successfully'));
});

let server = app.listen(PORT,() => {
	log(chalk.cyan(`🏃 Server has started on ${DOMAIN}:${PORT}/`));
});

//--------- Post function Assignment ---------------
//This will handle all the unhandled rejections by the system and close the application gracefully
process.on('unhandledRejection', err => {
	console.log(err.name, err.message);
	console.log('Unhandled Error Detected! 💥 Closing down the application...');

	server.close(() => {
		process.exit(1);
	});
});

//This will handle all the SIGTERM errors and terminate the process carefully
process.on('SIGTERM', () => {
	console.log('SIGTERM received. Shutting down the server 👋');
	server.close(() => {
		console.log('💥 Process terminated');
	});
});