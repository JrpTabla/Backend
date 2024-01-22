const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
	name : {
		type : String,
		required : [true, "PET NAME is required!"]
	},
    kind : {
		type : String,
		required : [true, "PET TYPE is required!"]
	},
	breed : {
		type : String,
		required : [true, "PET BREED is required!"]
	},
    sex : {
		type : String,
		required : [true, "PET SEX is required!"]
	},
    age : {
		type : Number,
		required : [true, "PET AGE is required!"]
	},
    hairType : {
		type : String,
		required : [true, "PET HAIR TYPE is required!"]
	},
	registeredOn : {
		type : Date,
		// The "new Date()" expression instantiates the current date
		default : new Date()
	},
	owner : [
			{
				userId : {
					type : String,
					required : [true, "USER ID is required!"]
				},
				registeredOn : {
					type : Date,
					default : new Date()
				}
			}
		]
})

module.exports = mongoose.model("Pet", petSchema);