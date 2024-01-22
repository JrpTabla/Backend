const Vet = require("../model/Vet.js");
const User = require("../model/User");

// Create a new Veterinary

module.exports.addVet = (data) => {
	console.log(data.isAdmin);
  
	if (data.isAdmin) {
  
	  // Check if a user with the same name already exists
	  return Vet.findOne({ name: data.vet.name }) // Changed from reqBody.name to data.vet.name
		  .then(existingVet => {
		  if (existingVet) {
				// A vet with the same name already exists
			  return false;
		  } else {
			  // Create a new Vet
				let newVet = new Vet({
				name: data.vet.name,
				procedure: data.vet.procedure,
				price: data.vet.price
			  });
  
	
			  return newVet.save()
			  .then(() => true)
			  .catch(error => {
					// Handle database save errors
					console.error(error);
					return false;
			  });
		  }
		  })
	  .catch(error => {
		  // Handle database query errors
		  console.error(error);
		  return false;
	  });
  
	}
  
  };

//Retrieving all Veterinary including not Available
module.exports.getAllVets = () => {
	return Vet.find({}).then((result) => {
		return result;
	});
};

//Retrieve All Available Veterinary
module.exports.getAllAvailable = () => {
	return Vet.find({ isAvailable: true }).then((result) => {
		return result;
	});
};

//Retrieve All the Veterinary Doctor 
module.exports.getAllDoctor = () => {
	return Vet.find({ isAvailable: true, isVetDoctor: true }).then((result) => {
		return result;
	});
};

//Retrieve All the Veterinary Surgeon
module.exports.getAllSurgeon = () => {
	return Vet.find({ isAvailable: true, isVetSurgeon: true }).then((result) => {
		return result;
	});
};

// Retrieve All Avaliable Vaccination Procedure
module.exports.getAllVaccination = () => {
	return Vet.find({isAvailable: true, procedure : "Vaccination" }).then((result) => {
		return result;
	});
};

// Retrieve All Avaliable Vaccination Procedure
module.exports.getAllDeworming = () => {
	return Vet.find({isAvailable: true, procedure : "Deworming" }).then((result) => {
		return result;
	});
};

//Retrieve a specific Veterinary
module.exports.getVet = (reqParams) => {
	return Vet.findById(reqParams.vetId).then((result) => {
		return result;
	});
};

//Update a Veterinary
module.exports.updateVet = (data) => {
	// console.log(data);

	return Vet.findById(data.vetId).then((result, error) => {
		console.log(result);

		const name = result.name;
		const procedure = result.procedure;
		const price = result.price;

		if (data.isAdmin) {
			if (typeof data.updatedVet.name == "undefined") {
				result.name = name;
			} else {
				result.name = data.updatedVet.name;
			}
			if (typeof data.updatedVet.procedure == "undefined") {
				result.procedure = procedure;
			} else {
				result.procedure = data.updatedVet.procedure;
			}
			if (typeof data.updatedVet.price == "undefined") {
				result.price = price;
			} else {
				result.price = data.updatedVet.price;
			}

			// result.name = data.updatedProduct.name;
			// result.description = data.updatedProduct.description;
			// result.price = data.updatedProduct.price;

			// console.log(result);

			return result.save().then((updatedVet, error) => {
				if (error) {
					return false;
				} else {
					return updatedVet;
				}
			});
		} else {
			return "Unauthorized";
		}
	});
};

// Archive a Veterinary
module.exports.archiveVet = (data) => {
    return Vet.findById(data.vetId).then((vet) => {
        if (!vet) {
            throw new Error("Vet not found");
        }

        if (data.isAdmin) {
            vet.isAvailable = false;
            return vet.save().then((unarchivedVet) => {
                return true;
            }).catch((error) => {
                throw error; // Forward the error
            });
        } else {
            return "Unauthorized";
        }
    }).catch((error) => {
        throw error; // Handle the initial findById error
    });
};



//Unarchive a Veterinary
module.exports.unarchiveVet = (data) => {
    return Vet.findById(data.vetId).then((vet) => {
        if (!vet) {
            throw new Error("Vet not found");
        }

        if (data.isAdmin) {
            vet.isAvailable = true;
            return vet.save().then((unarchivedVet) => {
                return true;
            }).catch((error) => {
                throw error; // Forward the error
            });
        } else {
            return "Unauthorized";
        }
    }).catch((error) => {
        throw error; // Handle the initial findById error
    });
};

// Setting Doctor Veterinary to true
module.exports.setDoctorTrue = (data) => {
	return Vet.findById(data.vetId).then((vet, error) => {
		if (data.isAdmin) {
			vet.isVetDoctor = true;

			return vet.save().then((DoctorVet, error) => {
				if (error) {
					return false;
				} else {
					return true;
				}
			});
		} else {
			return "Unauthorized";
		}
	});
};

// Setting Doctor Veterinary to False
module.exports.setDoctorFalse = (data) => {
	return Vet.findById(data.vetId).then((vet, error) => {
		if (data.isAdmin) {
			vet.isVetDoctor = false;

			return vet.save().then((DoctorVet, error) => {
				if (error) {
					return false;
				} else {
					return true;
				}
			});
		} else {
			return "Unauthorized";
		}
	});
};

// Setting Doctor Veterinary to true
module.exports.setSurgeonTrue = (data) => {
	return Vet.findById(data.vetId).then((vet, error) => {
		if (data.isAdmin) {
			vet.isVetSurgeon = true;

			return vet.save().then((SurgeonVet, error) => {
				if (error) {
					return false;
				} else {
					return true;
				}
			});
		} else {
			return "Unauthorized";
		}
	});
};

// Setting Doctor Veterinary to False
module.exports.setSurgeonFalse = (data) => {
	return Vet.findById(data.vetId).then((vet, error) => {
		if (data.isAdmin) {
			vet.isVetSurgeon = false;

			return vet.save().then((SurgeonVet, error) => {
				if (error) {
					return false;
				} else {
					return true;
				}
			});
		} else {
			return "Unauthorized";
		}
	});
};

// Remove an Veterinary
module.exports.deleteVet = async (user, reqParams) => {
	if (user.isAdmin) {
		return Vet.findByIdAndRemove(reqParams.vetId).then(
			(removedVet, error) => {
				if (error) {
					return false;
				} else {
					return true;
				}
			}
		);
	} else {
		return "Unauthorized";
	}
};
