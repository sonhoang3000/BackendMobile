const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const { jwtkey } = require("../keys")
const router = express.Router();
const User = mongoose.model("User");

router.post("/signup", async (req, res) => {
	const { email, password } = req.body;

	console.log("check req", req.body);

	try {
		const user = new User({ email, password });
		await user.save();
		const token = jwt.sign({ userId: user._id }, jwtkey)
		res.send({ token });
	} catch (err) {
		return res.status(422).send(err.message)

	}

});

module.exports = router;
