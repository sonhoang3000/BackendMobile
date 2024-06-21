const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

const userLoginService = (emailInput, passwordInput) => {
	return new Promise(async (resolve, reject) => {
		try {
			let userData = {};
			//check user
			let isExist = await checkUserEmail(emailInput);

			if (isExist) {
				//user already exist
				let user = await User.findOne({
					email: emailInput
				})

				if (user) {
					// compare password 
					let check = await bcrypt.compareSync(passwordInput, user.password);
					if (check) {
						userData.errCode = 0;
						userData.errMessage = "Login succeed";

						userData.user = user;
					} else {
						userData.errCode = 3;
						userData.errMessage = "Wrong password login";
					}
				}
			} else {
				//return error
				userData.errCode = 1;
				userData.errMessage = `Your email or your password isn't exist in your system. Plz try other email`;
			}

			resolve(userData);
		} catch (e) {
			reject(e);
		}
	})
}

const checkUserEmail = (userEmail) => {
	return new Promise(async (resolve, reject) => {
		try {

			const user = await User.findOne(
				{ email: userEmail }
			)
			if (user) {
				resolve(true);
			}
			else {
				resolve(false);
			}
		} catch (e) {
			reject(e)
		}
	})
}

const hashUserPassword = (password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let hashPassword = await bcrypt.hashSync(password, salt);
			resolve(hashPassword);
		} catch (e) {
			reject(e);
		}
	})
}

const createNewUserService = (data) => {
	return new Promise(async (resolve, reject) => {
		try {

			const check = await checkUserEmail(data.email);

			console.log('check data', check)

			if (check === true) {
				resolve({
					errCode: 1,
					errMessage: "Your email is already used, Please try another email!"
				});
			} else {
				let hashPasswordFromBcrypt = await hashUserPassword(data.password);

				await User.create({
					email: data.email,
					name: data.name,
					password: hashPasswordFromBcrypt,
				});
			}
			resolve({
				errCode: 0,
				message: "Đã tạo người dùng thành công",
			});
		} catch (e) {
			reject(e);
		}
	});
};

const getAllUsersService = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			let users = "";

			console.log('check userId', userId);

			if (userId === "ALL") {
				users = await User.find().select('-password');
			}
			if (userId && userId != 'ALL') {
				users = await User.findOne({ _id: userId }).select('-password');
			}
			resolve(users)
		} catch (e) {
			reject(e);
		}
	})
}

const deleteUserService = (userId) => {
	return new Promise(async (resolve, reject) => {
		const foundUser = await User.findOne(
			{ _id: userId }
		)

		if (!foundUser) {
			resolve({
				errCode: 2,
				errMessage: `The user isn't exist`
			})
		}

		console.log('check foundUser', foundUser);

		await User.findByIdAndDelete(userId);

		resolve({
			errCode: 0,
			message: `The user is deleted`
		})

	})
}

const updateUserService = (data) => {
	return new Promise(async (resolve, reject) => {
		try {

			if (!data.id) {
				resolve({
					errCode: 2,
					errMessage: "Missing required parameters updateUserService"
				})
			}

			const user = await User.findOne({
				_id: data.id,
			})


			if (user) {
				user.name = data.name;

				await user.save();

				console.log('check user: ', user);


				resolve({
					errCode: 0,
					message: "Update the user succeeds!"
				})
			} else {
				resolve({
					errCode: 1,
					errMessage: "User not found"
				});
			}

		} catch (e) {
			reject(e);
		}
	})
}

module.exports = {
	createNewUserService, getAllUsersService, deleteUserService, updateUserService, userLoginService
};
