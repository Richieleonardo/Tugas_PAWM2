const express = require('express');
const router = express.Router();

//mongodb user model
const User = require('../model/user');

//Password encrypt
const bcrypt = require('bcrypt');
const { kMaxLength } = require('buffer');

//login
router.post('/register', (req, res) => {
    let {name, email, password} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    let level = 1;

    if(name == "" || email == "" || email == "" || password == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    }
    else if(!/^[a-zA-Z\s]*$/.test(name)){
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        })
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        })
    }
    else if (password.length < 8){
        res.json({
            status: "FAILED",
            message: "Password is too short"
        })
    }
    else{
        //Check already exists
        User.find({email}).then(result =>{
            if(result.length){
                res.json({
                    status: "FAILED",
                    message: "User already exists"
                })
            }
            else{
                //ADD USER
                bcrypt.hash(password, 10).then(hashedPassword =>{
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        level
                    });

                    newUser.save().then(result =>{
                        res.json({
                            status: "SUCCESS",
                            message: "Registration success",
                            data: result,
                        })
                    });
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "Error occured while saving user"
                    })
                })
            }
        }).catch(err =>{
            console.log(err);
            res.json({
                status: "FAILED",
                message: "Error occured"
            })
        })
    }
});

//register
router.post('/login', (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if(email == "" || password == ""){
        res.json({
            status: "FAILED",
            massage: "Empty credential supplied"
        })
    }
    else{
        //Check user exist
        User.find({email})
        .then(data =>{
            if(data.length){
                //USER EXISTS

                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if(result){
                        //Password same
                        res.json({
                            status: "SUCCESS",
                            message: "Login Successful",
                            data: data
                        });
                    }
                    else{
                        res.json({
                            status: "FAILED",
                            message: "Invalid password"
                        });
                    }
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "Error occured"
                    });
                });
            }
            else{
                res.json({
                    status: "FAILED",
                    message: "Invalid credential"
                })
            }
        })
        .catch(err =>{
            res.json({
                status: "FAILED",
                message: "Error occured while checking for existing user"
            })
        })
    }
});

module.exports = router;