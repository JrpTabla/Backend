const express = require("express");
const router = express.Router();
const petController = require("../controller/petController.js");
const auth = require("../auth.js");

// Route for creating a course
router.post("/", auth.verify, (req, res) => {
	const data = {
		pet: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}
	petController.addPet(data).then(resultFromController => res.send(resultFromController));
});


// Get all Pet
router.get("/all", auth.verify, (req, res) => {
	const data = {
		pet: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}
	petController.getAllPet(data).then(resultFromController => res.send(resultFromController));
})

// Retrieve specific Pet
router.get("/:petId", (req, res) => {
	console.log(req.params.petId);
	petController.getPet(req.params).then(resultFromController => res.send(resultFromController));

})

//Route for updating a Pet
router.put("/:petId/updatePet", auth.verify, (req, res) => {
	const data = {
		petId: req.params.petId,
		isAdmin: auth.decode(req.headers.authorization).isAdmin,
		updatedPet: req.body
	};

	petController.updatePet(data).then((resultFromController) => res.send(resultFromController));

	// function sendResult (resultFromController) {
	// 	res.send(resultFromController)
	// }
});

// Remove a Pet
router.delete("/:petId/delete", auth.verify, (req, res) => {
	const user = auth.decode(req.headers.authorization);

	petController.deletePet(user, req.params).then((resultFromController) => res.send(resultFromController));
});




module.exports = router;