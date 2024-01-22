const Consult = require("../model/Consult");
const Vet = require("../model/Vet");
const Pet = require("../model/Pet");
const User = require("../model/User");
const Order = require("../model/Order");
const auth = require("../auth");

//Order Creation
module.exports.createOrder = async (user, reqBody) => {
	if (user.isAdmin) {
		return "このアクションは通常のユーザーのみが実行できます。 (Only regular user can do this Action.)";
	} else {
		let consultItems = [];
		consultItems = await Consult.find({ userId: user.id }).then((result) => {
			return result;
		});
		console.log(consultItems);

		let newOrder = await new Order({
			userId: user.id,
			items: consultItems,
			totalAmount: reqBody.totalAmount,
		});

		return newOrder.save().then((order, error) => {
			if (error) {
				return false;
			} else {
				return true;
			}
		});
	}
};

//Retrieve all Services
module.exports.getAllOrders = (data) => {
	return Order.find({}).then((orders) => {
		if (data.isAdmin) {
			return orders;
		} else {
			return "このアクションは管理者のみが実行できます。(Only Admin can do this Action.)";
		}
	});
};

//Retrieve Authenticated User’s Services
module.exports.getMyOrders = (data) => {
	return Order.find({ userId: data.userId }).then((order) => {
		if (data.isAdmin) {
			return "このアクションは通常のユーザーのみが実行できます。 (Only regular user can do this Action.)";
		} else {
			return order;
		}
	});
};
