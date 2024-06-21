const userService = require("../services/user.service");

const handleLogin = async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	if (!email || !password) {
		return res.status(500).json({
			errCode: 1,
			message: "Missing inputs parameters handleLogin",
		});
	}

	let userData = await userService.userLoginService(email, password);
	// check mail exist
	// compare password
	// return userinfor
	// access token
	return res.status(200).json({
		errCode: userData.errCode,
		message: userData.errMessage,
		user: userData.user ? userData.user : {},
	});
}

const createNewUser = async (req, res) => {
	// console.log('check req.body', req.body);

	const message = await userService.createNewUserService(req.body);
	return res.status(200).json(message);
};

const getAllUsers = async (req, res) => {

	const id = req.body.id;

	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: "Missing required parameters user",
			users: []
		})
	}

	let users = await userService.getAllUsersService(id);
	return res.status(200).json({
		errCode: 0,
		errMessage: "I'am Okie, I'm fine, kin cha na",
		users
	})
}

const deleteUser = async (req, res) => {
	if (!req.body.id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: " Missing required parameters"
		})
	}

	let message = await userService.deleteUserService(req.body.id);
	return res.status(200).json(message)
}

const editUser = async (req, res) => {
	let data = req.body;

	let message = await userService.updateUserService(data);
	return res.status(200).json(message)
}

module.exports = {
	createNewUser, getAllUsers, deleteUser, editUser, handleLogin
};
