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

     const { firstName, lastName, emailId, password, gender, about, photoUrl, age, skills }  = req.body;
     
    // Check if user already exists
    const existingUser = await User.findOne({ emailId: emailId.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists please log in to continue" });
    }

    // Encrpt the password
    const passwordHash = await bcrypt.hash(password, 10);

     // Save user to the database
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        gender,
        about,
      ...(photoUrl && { photoUrl }),
      ...(age && { age }),
      ...(skills && skills.length > 0 && { skills }),
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
        // Generate token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "5d" });

      const isProd = process.env.NODE_ENV === "production";
      
      // Add the token to Cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "None" : "Lax",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
      });

      res.send(user);
      }
      else{
        throw new Error ("Inavalid credentials");
      }
  }
  catch(err){
       res.status(400).send("Error creating user:" + err.message);
   }
});

authRouter.post("logout", async(req, res) => {
   res.cookie("token", null, {
    expires: new Date(Data.now()),
   })
   res.send("Logout Successfully!!");
})

// Forgot Password Route - to reset password
authRouter.post("/forgotPassword", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update the existing password field
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = authRouter;