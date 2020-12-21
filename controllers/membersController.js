const Member = require('../models/Members');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {

	register: async function (req, res) {

		let member_exist = await Member.findOne({ member_email: req.body.member_email });
		if (member_exist) {
			return res.send({ response: false, error: 'That member already exists!' });
		} else {
			const newMember = new Member(req.body)
			const salt = await bcrypt.genSalt(process.env.SALT_FACTOR)
			newMember.member_password = await bcrypt.hash(newMember.member_password, salt)
			newMember.save()
				.then(newMember => {
					const member_token = jwt.sign({ id: newMember._id }, process.env.ACCESS_TOKEN_SECRET)
					delete newMember._doc.member_password
					res.send({ response: true, member: newMember, member_token });
				})
				.catch(err => res.send({ response: false, error: 'Operation failed' }))
		}
	},
	login: async function (req, res) {

		let member = await Member.findOne({ member_email: req.body.member_email })

		if (!member) {
			return res.send({ response: false, error: 'This member doesn\'t exists!' })
		} else {
			const validPassword = await bcrypt.compare(req.body.member_password, member.member_password)
			if (!validPassword) {
				return res.send({ response: false, error: 'Incorrect password.' })
			}
			const member_token = jwt.sign({ id: member._id }, process.env.ACCESS_TOKEN_SECRET)
			delete member._doc.member_password
			res.send({ response: true, member, member_token });
		}
	},
	fetchMember: async function (req, res) {

		const token = req.headers['x-access-token'];

		if (!token) return res.send({ response: false, error: 'No token provided.' });
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
			if (err) return res.send({ response: false, error: 'Failed to authenticate token.' });
			Member.findById(decoded.id, { 'member_password': 0, }, function (err, result) {
				if (err) res.send({ response: false, error: err })
				res.send({ response: true, member: result })
			});
		});
	},

};