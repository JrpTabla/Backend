// SERVER CREATION AND DB CONNECTION
const express = require("express");
const mongoose = require("mongoose");


const cors = require("cors");
const userRoutes = require("./routes/user");
const petRoutes = require("./routes/pet");
const vetRoutes = require("./routes/vet");
const consultRoutes = require("./routes/consult");
const orderRoutes = require("./routes/order");

// Allows us to control the App's Cross Origin Resource Sharing
const app = express();


// MongoDB Connection using SRV Link
mongoose.connect("mongodb+srv://admin:admin123@zuitt-bootcamp.tmj91nt.mongodb.net/Capstone2_API?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

// Optional - Validation of DB Connection
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Defines the "/users" string to be included for all user routes defined in the "user" route file
app.use("/users", userRoutes);
app.use("/pet", petRoutes);
app.use("/vet", vetRoutes);
app.use("/consult", consultRoutes);
app.use("/order", orderRoutes)




// PORT LISTENING
if(require.main === module){
	app.listen(process.env.PORT || 5000, () => console.log(`API is now online on port ${process.env.PORT || 5000}`));
}

module.exports = app;