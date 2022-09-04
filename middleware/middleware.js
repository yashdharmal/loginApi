const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userModel");
const userSchema = require("../models/userModel");
const SECRECT_KEY = "skajdfhO*&^D*&E$r8739rbc";
const userController = require("../controllers/userController")




const authMiddelware = (req, res, next) => {
    try {
        let token = req.headers.auth

        let tokenData = jwt.verify(token, SECRECT_KEY)

        req.user = tokenData

        next();
    } catch (error) {
        res.send("Un authorized").status(401)
    }

}

module.exports = {
    authMiddelware
}