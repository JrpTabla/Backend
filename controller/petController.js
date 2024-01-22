const Pet = require("../model/Pet.js");

// Create a new course
module.exports.addPet = (data) => {
	console.log(data.isAdmin);
	if(data.isAdmin) {
    
	// If the user is not admin, then return this message as a promise to avoid errors
	let message = Promise.resolve("You don't have the access rights to do this action.");

	return message.then((value) => {
		return value
	})
    }else {
		let newPet = new Pet({
			name : data.pet.name,
            kind : data.pet.kind,
			breed : data.pet.breed,
            sex : data.pet.sex,
            age : data.pet.age,
            hairType : data.pet.hairType
		});

		return newPet.save().then((pet, error) => {
			if(error){
				return error;
			}
			return pet;
		})
	} 

};

// retrieve all courses function
module.exports.getAllPet = (data) => {
    if (data.isAdmin) {
	return Pet.find({}).then(result => {
		return result;
	})
    }

    // If the user is not admin, then return this message as a promise to avoid errors
	let message = Promise.resolve("このアクションは管理者のみが実行できます。(Only Admin can do this Action.)");

	return message.then((value) => {
		return value
	})

};

// Retreiving a specific course

module.exports.getPet = (reqParams) => {
	return Pet.findById(reqParams.petId).then(result =>{
		return result;
	})
}

//Update a Pet
module.exports.updatePet = (data) => {
	// console.log(data);

	return Pet.findById(data.petId).then((result, error) => {
		console.log(result);

		const name = result.name;
		const kind = result.kind;
		const breed = result.breed;
		const sex = result.sex;
		const age = result.age;
		const hairType = result.hairType;

		if (data.isAdmin) {
			return "このアクションは通常のユーザーのみが実行できます。 (Only regular user can do this Action.)";

		} else {

			if (typeof data.updatedPet.name == "undefined") {
				result.name = name;
			} else {
				result.name = data.updatedPet.name;

			}
			if (typeof data.updatedPet.kind == "undefined") {
				result.kind = kind;
			} else {
				result.kind = data.updatedPet.kind;
			}

			if (typeof data.updatedPet.breed == "undefined") {
				result.breed = breed;
			} else {
				result.breed = data.updatedPet.breed;
			}

			if (typeof data.updatedPet.sex == "undefined") {
				result.sex = sex;
			} else {
				result.sex = data.updatedPet.sex;
			}

			if (typeof data.updatedPet.age == "undefined") {
				result.age = age;
			} else {
				result.age = data.updatedPet.age;
			}

			if (typeof data.updatedPet.age == "undefined") {
				result.hairType = hairType;
			} else {
				result.hairType = data.updatedPet.hairType;
			}

			// result.name = data.updatedProduct.name;
			// result.description = data.updatedProduct.description;
			// result.price = data.updatedProduct.price;

			// console.log(result);

			return result.save().then((updatedPet, error) => {
				if (error) {
					return false;
				} else {
					return updatedPet;
				}
			});
		}
	});
};

// Remove an Pet
module.exports.deletePet = async (user, reqParams) => {
	if (user.isAdmin) {
		return "このアクションは管理者のみが実行できます。(Only Admin can do this Action.)";
	} else {
		return Pet.findByIdAndRemove(reqParams.petId).then(
			(removedVet, error) => {
				if (error) {
					return false;
				} else {
					return true;
				}
			}
		);
	}
};