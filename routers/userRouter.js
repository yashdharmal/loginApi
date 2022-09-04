const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userModel");
const userSchema = require("../models/userModel");
const SECRECT_KEY = "skajdfhO*&^D*&E$r8739rbc";
const userController = require("../controllers/userController")
const authMiddelware = require('../middleware/middleware')


// signup of user
router.post("/user/signup", userController.signup);

// login of user

router.post("/login", userController.login)

// logout of user
router.post("/logout", userController.logout)

// profile fectch of user
router.post("/fetch", authMiddelware.authMiddelware, userController.fetch)

// update profile of user
router.put("/update", authMiddelware.authMiddelware, userController.update)


module.exports = router;