const express = require('express');
const app = express();

require('dotenv').config({path: __dirname + '/.env'})

const memberRouter = require('./routes/memberRoutes');
const PORT = process.env.PORT || 5000;

require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/member', memberRouter);
app.get("/", function (req, res) {
	res.send("Hello World!")
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});


