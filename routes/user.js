const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");
const auth = require("../auth.js")

// Route for Checking Existing user
router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
})

// Route for user registration
router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for user authentication
router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
});

// View Registered user
router.post("/details", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	// Provides the user's ID for the getProfile controller method
	userController.getProfile({userId : userData.id}).then(resultFromController => res.send(resultFromController));

});

// Route for Retrieving all Users (Admin Only)
router.get("/all", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	const data = {
		isAdmin: userData.isAdmin,
	};
	userController.getAllUsers(data).then((resultFromController) => res.send(resultFromController));
});

router.post("/addingPet", auth.verify, (req, res) => {
	let data = {
		userId : auth.decode(req.headers.authorization).id,
		petId : req.body.petId,
		isAdmin : auth.decode(req.headers.authorization).isAdmin
	}

	userController.addPet(data).then(resultFromController => res.send(resultFromController));
});

// Route for setting a user as admin.
router.put("/:userId/setasadmin", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	const data = {
		setUserAsAdmin: req.params.userId,
		isAdmin: userData.isAdmin,
	};
	userController.setAsAdmin(data).then((resultFromController) => res.send(resultFromController));
});

// Route for unsetting a user as admin.
router.put("/:userId/unsetasadmin", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	const data = {
		setUserAsAdmin: req.params.userId,
		isAdmin: userData.isAdmin,
	};
	userController.unsetAsAdmin(data).then((resultFromController) => res.send(resultFromController));
});

// Allows us to export the "router" object that will be accessed in our "index.js" file
module.exports = router;
