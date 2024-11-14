const mongoose = require("mongoose");
const dotenv = require('dotenv').config({path: '.env'});

mongoose.connect(process.env.MONGODB_URI)
.then((result) => {
    console.log("Connected to MongoDB");
})
.catch((err) => console.log("Failed to connect to mongo DB: ", err));