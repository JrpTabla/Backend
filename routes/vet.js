const express = require("express");
const router = express.Router();
const vetController = require("../controller/vetController.js");
const auth = require("../auth.js")

// Route for creating a Veterinary
router.post("/", auth.verify, (req, res) => {
	const data = {
		vet: req.body,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}
	vetController.addVet(data).then(resultFromController => res.send(resultFromController));
});


//Route for retrieving all the Veterinary including not Available
router.get("/all", (req, res) => {
	vetController.getAllVets().then((resultFromController) => res.send(resultFromController));
});

//Route for retrieving all the Available Veterinary
router.get("/Available", (req, res) => {
	vetController.getAllAvailable().then((resultFromController) => res.send(resultFromController));
});

//Route for retrieving all the Doctor Veterinary
router.get("/Doctor", (req, res) => {
	vetController.getAllDoctor().then((resultFromController) => res.send(resultFromController));
});

//Route for retrieving all the Surgeon Veterinary
router.get("/Surgeon", (req, res) => {
	vetController.getAllSurgeon().then((resultFromController) => res.send(resultFromController));
});

// Route for retrieving all the Vaccination Procedure Veterinary
router.get("/Vaccination", (req, res) => {
	vetController.getAllVaccination().then((resultFromController) => res.send(resultFromController));
});

// Route for retrieving all the Deworming Procedure Veterinary
router.get("/Deworming", (req, res) => {
	vetController.getAllDeworming().then((resultFromController) => res.send(resultFromController));
});

//Route for retrieving a specific Veterinary
router.get("/:vetId", (req, res) => {
	// console.log(req.params);
	vetController.getVet(req.params).then((resultFromController) => res.send(resultFromController));
});

//Route for updating a Veterinary
router.put("/:vetId/update", auth.verify, (req, res) => {
	const data = {
		vetId: req.params.vetId,
		isAdmin: auth.decode(req.headers.authorization).isAdmin,
		updatedVet: req.body,
	};

	vetController.updateVet(data).then((resultFromController) => res.send(resultFromController));

	// function sendResult (resultFromController) {
	// 	res.send(resultFromController)
	// }
});

//Archiving a Veterinary
router.put("/:vetId/archive", auth.verify, (req, res) => {
	const data = {
		vetId: req.params.vetId,
		isAdmin: auth.decode(req.headers.authorization).isAdmin,
	};

	vetController.archiveVet(data).then((resultFromController) => res.send(resultFromController));
});

//Unarchiving a product
router.put("/:vetId/unarchive", auth.verify, (req, res) => {
	const data = {
		vetId: req.params.vetId,
		isAdmin: auth.decode(req.headers.authorization).isAdmin,
	};

	vetController.unarchiveVet(data).then((resultFromController) => res.send(resultFromController));
});

//Route for setting Doctor Veterinary to true
router.put("/:vetId/setDoctor", auth.verify, (req, res) => {
	const data = {
		vetId: req.params.vetId,
		isAdmin: auth.decode(req.headers.authorization).isAdmin,
	};

	vetController.setDoctorTrue(data).then((resultFromController) => res.send(resultFromController));
});

//Route for setting Doctor Veterinary to false
router.put("/:vetId/unsetDoctor", auth.verify, (req, res) => {
	const data = {
		vetId: req.params.vetId,
		isAdmin: auth.decode(req.headers.authorization).isAdmin,
	};

	vetController.setDoctorFalse(data).then((resultFromController) => res.send(resultFromController));
});

// Route for setting Surgeon to true
router.put("/:vetId/setSurgeon", auth.verify, (req, res) => {
	const data = {
		vetId: req.params.vetId,
		isAdmin: auth.decode(req.headers.authorization).isAdmin,
	};

	vetController.setSurgeonTrue(data).then((resultFromController) => res.send(resultFromController));
});

//Route for setting Surgeon to false
router.put("/:vetId/unsetSurgeon", auth.verify, (req, res) => {
	const data = {
		vetId: req.params.vetId,
		isAdmin: auth.decode(req.headers.authorization).isAdmin,
	};

	vetController.setSurgeonFalse(data).then((resultFromController) => res.send(resultFromController));
});

// Remove an Vetenirary
router.delete("/:vetId/delete", auth.verify, (req, res) => {
	const user = auth.decode(req.headers.authorization);

	vetController.deleteVet(user, req.params).then((resultFromController) => res.send(resultFromController));
});

module.exports = router;