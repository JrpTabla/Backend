const express = require("express");
const router = express.Router();
const consultController = require("../controller/consultController");
const auth = require("../auth");

//Get all Consultation
router.get("/", auth.verify, (req, res) => {
	const user = auth.decode(req.headers.authorization);

	consultController.getAllItemsInConsult(user).then((resultFromController) => res.send(resultFromController));
});

// Add Ventenary to User's Consultation (user only)
router.post("/:vetId/addToConsultation", auth.verify, (req, res) => {
	const user = auth.decode(req.headers.authorization);

	consultController.addToConsultation(user, req.params, req.body).then((resultFromController) => res.send(resultFromController));
});

// Update Veterinary quantity in Consultation
router.put("/:consultId/updateQuantity", auth.verify, (req, res) => {
	const user = auth.decode(req.headers.authorization);

	consultController.updateQuantity(user, req.params, req.body).then((resultFromController) => res.send(resultFromController));
});

// Remove an Consultation
router.delete("/:consultId/remove", auth.verify, (req, res) => {
	const user = auth.decode(req.headers.authorization);

	consultController.deleteConsultation(user, req.params).then((resultFromController) => res.send(resultFromController));
});

// Delete all items from cart
router.delete("/deleteAll", auth.verify, (req, res) => {
	const user = auth.decode(req.headers.authorization);

	consultController.deleteAllItems(user).then((resultFromController) => res.send(resultFromController));
});




module.exports = router;