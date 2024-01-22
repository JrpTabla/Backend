const mongoose = require ("mongoose");

const vetSchema = new mongoose.Schema({

   name: {
        type: String,
        required: [true, "VET STAFF Name is required"]
    },
    procedure: {
        type: String,
        required: [true, "PROCEDURE is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    isVetDoctor : {
        type: Boolean,
        default: true
    },
    isVetSurgeon : {
        type: Boolean,
        default: false
    },
    registeredOn: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("VET", vetSchema);
