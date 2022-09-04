const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = require("./routers/userRouter")


const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017",
    {
        dbName: "UserDb"
    }, (err) => {
        if (!err) console.log("connected to mongo db");
    })

app.use('', userRouter)



app.listen(3600, (err) => {
    if (!err) console.log("port 3600 is running");
})