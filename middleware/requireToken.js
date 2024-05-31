const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const User = mongoose.model("User")
const { jwtkey } = require('../keys')

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	//authorization === Bearer sfafsfaf

	console.log('check authorization: ', authorization)
	if (!authorization) {
		return res.status(401).send({ error: "you must be logged in 1" })
	}
	const token = authorization.replace("Bearer ", "");
	jwt.verify(token, jwtkey, async (err, payload) => {
		if (err) {
			return res.status(401).send({ error: "you must be logged in 2" })
		}
		const { userId } = payload;
		const user = await User.findById(userId)
		req.user = user;
		next();
	})
}