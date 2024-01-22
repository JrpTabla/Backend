// The "User" variable is defined using a capitalized letter to indicate that what we are using is the "User" model for code readability
const User = require("../model/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const Pet = require("../model/Pet");


// Check if the email already exists
module.exports.checkEmailExists = (reqBody) => {

	return User.find({email : reqBody.email}).then(result => {
		if (result.length > 0) {
			return true;
		} else {
			return false;
		};
	});
};


module.exports.registerUser = (reqBody) => {
	// Check if a user with the same email already exists
	return User.findOne({ email: reqBody.email })
		.then(existingUser => {
		if (existingUser) {
		  	// A user with the same email already exists
			return "Email is already in use.";
		} else {
			// Create a new user
		  	let newUser = new User({
				firstName: reqBody.firstName,
				lastName: reqBody.lastName,
				email: reqBody.email,
				mobileNo: reqBody.mobileNo,
				password: bcrypt.hashSync(reqBody.password, 10)
		  	});
  
		  	return newUser.save()
			.then(() => "You are now Successfully Registered!")
			.catch(error => {
			  	// Handle database save errors
			  	console.error(error);
			  	return "Registration failed.";
			});
		}
		})
	  	.catch(error => {
			// Handle database query errors
			console.error(error);
			return "Registration failed.";
	  	});
};
  


// User Login to access Authenticated Account
module.exports.loginUser = (reqBody) => {

	return User.findOne({email : reqBody.email}).then(result => {
		if(result == null){
			return false;
		} 
		else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
			if (isPasswordCorrect) {
				return { 
					access : auth.createAccessToken(result) 
				}
			} else {
				return false;
			}
		}
	})
};

// Retrieve All Users (Admin Only)
module.exports.getAllUsers = (data) => {
	return User.find({}).then((users) => {
		if (data.isAdmin) {
			return users;
		} else {
			return false;
		}
	})
};

// Get user Details via Token

module.exports.getProfile = (data) => {

	return User.findById(data.userId).then(result => {
		result.password = "";
		return result;
	})
};


// Adding a Pet to users
module.exports.addPet = async (data) => {

	if(data.isAdmin){
		return false;
	}else{

	// Add the course ID in the enrollments array of the user
	// Creates an "isUserUpdated" variable and returns true upon successful update otherwise false
	// Using the "await" keyword will allow the enroll method to complete updating the user before returning a response back to the frontend

	let isUserUpdated = await User.findById(data.userId).then(user => {
		user.petPartner.push({petId : data.petId});

		return user.save().then((user, error) => {
			if(error){
				return false;
			}else{
				return true;
			}
		})
	})

	// Add the user ID in the enrollees array of the course
	// Using the "await" keyword will allow the enroll method to complete updating the course before returning a response back to the frontend

	let isPetUpdated = await Pet.findById(data.petId).then(pet => {
		pet.owner.push({userId : data.userId});

		return pet.save().then((pet, error) => {
			if(error){
				return false;
			}else{
				return true;
			}
		})
	})
	// Condition that will check if the user and course documents has been updated
	// User enrollment is successful

		if(isUserUpdated && isPetUpdated){
			return true;
		}else{
			return false;
		}

	}
	
}

//Set logged in user as admin
module.exports.setAsAdmin = (data) => {
	// console.log(data);

	return User.findById(data.setUserAsAdmin).then((result, error) => {
		// console.log(result);

		if (data.isAdmin) {
			result.isAdmin = true;
			// console.log(result);

			return result.save().then((updatedUser, error) => {
				if (error) {
					return false;
				} else {
					return true;
				}
			});
		} else {
			return false;
		}
	}).catch(error => {
		// Handle database query errors
		console.error(error);
		return false;
	  });
	
};

//Unset logged in user as admin
module.exports.unsetAsAdmin = (data) => {
	// console.log(data);

	return User.findById(data.setUserAsAdmin).then((result, error) => {
		// console.log(result);

		if (data.isAdmin) {
			result.isAdmin = false;
			// console.log(result);

			return result.save().then((updatedUser, error) => {
				if (error) {
					return false;
				} else {
					return true;
				}
			});
		}
		else {
			return false;
		}
	}).catch(error => {
		// Handle database query errors
		console.error(error);
		return false;
	  });
};