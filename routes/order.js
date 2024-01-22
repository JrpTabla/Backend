const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const auth = require("../auth");


// Make a Service
router.post("/checkout", auth.verify, (req, res) => {
	const user = auth.decode(req.headers.authorization);

	orderController.createOrder(user, req.body).then((resultFromController) => res.send(resultFromController));
});

// Route for Retrieving All Services
router.get("/", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	const data = {
		isAdmin: userData.isAdmin,
	};
	orderController.getAllOrders(data).then((resultFromController) => res.send(resultFromController));
});

// Route for Retrieving Authenticated User’s Orders
router.get("/my-services", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	const data = {
		userId: userData.id,
		isAdmin: userData.isAdmin,
	};
	orderController.getMyOrders(data).then((result) => res.send(result));
});

module.exports = router;