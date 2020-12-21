const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
	member_firstName: {
		type: String,
		required: true
	},
	member_lastName: {
		type: String,
		required: true
	}
	,
	member_email: {
		type: String,
		required: true,
		unique: true,
	}
	,
	member_gender: {
		type: String,
		required: true
	}
	,
	member_password: {
		type: String,
		required: true
	}
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;