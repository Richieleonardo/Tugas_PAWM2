const express = require("express");
const path = require("path");
const app = express();
const dotenv = require('dotenv').config({path: '.env'});

require('./database/db');
//MIDDLEWARE
app.use(express.json());
app.use(express.static(path.join(__dirname, '../styles')));

//ROUTES

app.listen(process.env.PORT, () => console.log("Server ready on port 3001."));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "../login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "../register.html")));
app.get("/game", (req, res) => res.sendFile(path.join(__dirname, "../game.html")));
const UserRouter = require('./user');
app.use('/user', UserRouter);

module.exports = app;