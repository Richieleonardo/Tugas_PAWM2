const express = require("express");
const path = require("path");
const app = express();

//MIDDLEWARE
app.use(express.json());


//ROUTES
app.listen(3000, () => console.log("Server ready on port 3000."));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;