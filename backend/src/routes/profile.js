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

profileRouter.delete("/deleteAccount", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete all connection requests
    await ConnectionRequest.deleteMany({
      $or: [
        { fromUserId: userId },
        { toUserId: userId }
      ]
    });

    // Delete user
    await User.findByIdAndDelete(userId);

    // Clear auth cookie (IMPORTANT)
    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Lax",
    });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Change Password Route
profileRouter.post("/changePassword", userAuth, async (req, res) => {
  const { newPassword } = req.body;
  req.user.password = await bcrypt.hash(newPassword, 10);
  await req.user.save();
  res.json({ message: "Password updated successfully" });
});

module.exports = profileRouter