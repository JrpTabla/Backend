const mongoose = require("mongoose");

const consultSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, "UserId is required"],
	},
	vet: [
		{
			vetId: {
				type: String,
				required: [true, "Product ID is required"],
			},
			name: {
				type: String,
				required: [true, "Product name is required"],
			},
			quantity: {
				type: Number,
				required: [true, "Quantity is required"],
			},
			price: {
				type: Number,
				required: [true, "Price is required"],
			},
		},
	],
	subTotal: {
		type: Number,
		required: [true, "SubTotal is required"],
	},
	addedOn: {
		type: Date,
		default: new Date(),
	},
});

module.exports = mongoose.model("Consult", consultSchema);

