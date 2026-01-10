const express = require('express');
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
   try{
    // Validate input data
     validateSignUpData(req);

     const { firstName, lastName, emailId, password } = req.body;

    // Encrpt the password
    const passwordHash = await bcrypt.hash(password, 10);

     // Save user to the database
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });

       await user.save();
       res.send("User added Successfully");
   }
   catch(err){
       res.status(400).send("Error creating user:" + err.message);
   }
  
});

authRouter.post("/login", async (req, res) => {
  try {
      const { emailId, password } = req.body;

      const user = await User.findOne({ emailId: emailId});
      if(!user) {
        throw new Error ("Invalid credentials");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if(isPasswordValid){
        res.send("Login Successfully");
      }
      else{
        throw new Error ("Inavalid credentials");
      }
  }
  catch(err){
       res.status(400).send("Error creating user:" + err.message);
   }
});