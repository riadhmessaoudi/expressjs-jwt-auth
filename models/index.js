const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
	console.log('Established Mongoose Default Connection');
});

mongoose.connection.on('error', err => {
	console.log('Mongoose Default Connection Error : ' + err);
});