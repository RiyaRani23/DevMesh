const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfiledata } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } 
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Edit Profile Route - to update logged-in user's profile
profileRouter.patch("/profile/edit", userAuth, async (req, res) =>{
    try {
        if(!validateEditProfiledata(req)){
            throw new Error("Invalid edit request!");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });
        await loggedInUser.save();
        res.json({
            message:`${loggedInUser.firstName}, Your profile updated successfully!`,
            user: loggedInUser,
        });
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = profileRouter