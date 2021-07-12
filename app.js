const express = require("express");
const user = require("./model/user");
console.log(require("dotenv").config());
require("./config/database").connect();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const User = require("./model/user");

const app = express();

app.use(express.json());

// Logic goes here
app.post("/register", async (req, res) => {

    try {
        const {firstName , lastName, password, email} = req.body;
    
        if (!(firstName , lastName, password, email )) {
            res.status(400).send("All input are required")
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User already exist. Please Login");
        }

        encryptedUserPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(),
            password: encryptedUserPassword,
        })

        const token = jwt.sign(
            {user_id : user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        )
        //created user not User model        
        user.token = token;

        return(201).json(user);
        
    } catch (error) {
        console.log(error);
    }
})

app.post("/login", (req, res) => {

})

module.exports = app;