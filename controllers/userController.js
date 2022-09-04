const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userModel");
const userSchema = require("../models/userModel");
const SECRECT_KEY = "skajdfhO*&^D*&E$r8739rbc";
const userController = require("../controllers/userController")




const signup = async (req, res) => {
    try {
        let userFound = await User.findOne({ email: req.body.email });



        if (userFound) {
            res.send("this email is already registed please sign in");
        } else {

            let myData = new User(req.body);
            myData.save();

            res.send({ message: "You have succesfully registed" })

        }

    } catch (error) {

        res.send(error)

    }

}


const login = async (req, res,) => {
    try {

        const recivedEmail = req.body.email;
        const recivedPassword = req.body.password;
        const userFound = await User.findOne({ email: recivedEmail })


        if (!userFound) {
            res.send("User not found")

        }



        if (await bcrypt.compare(recivedPassword, userFound.password)) {
            var token = jwt.sign({ name: req.body.name, email: req.body.email }, SECRECT_KEY);
            res.send({ message: "You have succesfully loged in", token })
        } else {
            res.send("plese check email or pass")
        }

    } catch (error) {
        res.send(error)
    }

}


const fetch = async (req, res) => {
    try {
        console.log("USER", req.user);

        const userFound = await User.findOne({ email: req.user.email })

        if (!userFound) {
            res.send("plese check email or pass")
        }

        res.send({
            name: userFound.name,
            email: userFound.email,
            username: userFound.userName,
            age: userFound.age,
            city: userFound.city
        })

    } catch (error) {
        res.send(error)
    }
}



const update = async (req, res) => {
    try {
        userEmail = req.user.email;

        let filter = { email: userEmail }
        console.log(filter);

        let updatedUser = await User.findOneAndUpdate(filter, req.body, { new: true });

        if (!updatedUser) {
            res.send("email not found")
        }

        res.send({
            messsage: "This is updated Information",
            updatedUser: updatedUser
        })



    } catch (error) {
        res.send(error)
    }

}

const logout = async (req, res) => {
    res.send("you have successfully logged out")

}




module.exports = {
    signup,
    login,
    fetch,
    logout,
    update

};
