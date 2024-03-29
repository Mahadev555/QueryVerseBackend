//--------- Including all the external packages -----------
const mongoose = require('mongoose');

//--------- Functional code for this file ---------
const questionsSchema = new mongoose.Schema({
	userQuestioner: {
		type: String,
		required: [true, 'The user should have a name']
	},
	questionTitle: {
		type: String,
		required: [true, 'The question should have title']
	},
	questionDescription: String,
	questionTag: {
		type: String,
		enum: ['Courses', 'Jobs', 'Events', 'Sports', 'Other'],
		default: 'Courses',
		required: [true, 'The question should have a tag']
	},
	upvotes: {
		type: Number,
		default: 0
	},
	profileImage: {
		type: String,

	},
	userID: {
		type: String,

	},
	downvotes: {
		type: Number,
		default: 0
	},
	answers: [String]
},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	});

const Questions = mongoose.model('Questions', questionsSchema);

//--------- Post function Assignment ---------------
module.exports = Questions;