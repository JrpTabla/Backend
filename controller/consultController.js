const Consult = require("../model/Consult");
const Vet = require("../model/Vet");
const Pet = require("../model/Pet");
const User = require("../model/User");
const auth = require("../auth");
const req = require("express/lib/request");

// Get all items in user's Consultant
module.exports.getAllItemsInConsult = async (user) => {
	if (user.isAdmin) {
		return "Unauthorized";
	} else {
		return Consult.find({ userId: user.id }).then((consult, error) => {
			if (error) {
				return false;
			} else {
				return consult;
			}
		});
	}
};

// Add a Consultant (User Only)
module.exports.addToConsultation = async (user, reqParams, reqBody) => {
	if (user.isAdmin) {
		return "Unauthorized";
	} else {
		let vet = await Vet.findById(reqParams.vetId);

		let subTotal = reqBody.quantity * vet.price;

		let newConsult = new Consult({
			userId: user.id,
			vet: [
				{
					vetId: vet.id,
					name: vet.name,
					quantity: reqBody.quantity,
					price: vet.price,
				},
			],
			subTotal: subTotal,
		});

		return newConsult.save().then((consult, error) => {
			if (error) {
				return false;
			} else {
				return true;
			}
		});
	}
};

//Update Consultation's Quantity
module.exports.updateQuantity = async (user, reqParams, reqBody) => {
	if (user.isAdmin) {
		return "Unauthorized";
	} else {
		let consult = await Consult.findById(reqParams.consultId).then((data) => {
			return data;
		});
		// console.log(item.product[0].productId);
		// console.log(item.product[0].price);

		let subTotal = reqBody.quantity * consult.vet[0].price;

		let updatedVet = {
			vet: [
				{
					vetId: consult.vet[0].productId,
					name: consult.vet[0].name,
					quantity: reqBody.quantity,
					price: consult.vet[0].price
				},
			],
			subTotal: subTotal,
		};
		return Consult.findByIdAndUpdate(reqParams.consultId, updatedVet).then(
			(updatedVetQty, error) => {
				if (error) {
					return false;
				} else {
					return true;
				}
			}
		);
	}
};

// Remove an item from the Consultation
module.exports.deleteConsultation = async (user, reqParams) => {
	if (user.isAdmin) {
		return "Unauthorized";
	} else {
		return Consult.findByIdAndRemove(reqParams.consultId).then(
			(removedConsultationItem, error) => {
				if (error) {
					return false;
				} else {
					return true;
				}
			}
		);
	}
};

// Delete all items from Consultantion
module.exports.deleteAllItems = async (user) => {
	if (user.isAdmin) {
		return "Unauthorized";
	} else {
		return Consult.deleteMany({ userId: user.id }).then((deleteAllItems, error) => {
			if (error) {
				return false;
			} else {
				return true;
			}
		});
	}
};
