const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

// Define safe user data fields to be returned
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user.requests/recieved", userAuth, async (req, res) => {

    try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    // }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
         req.statusCode(400).send("Error" + err.message);
    }
   const loggedInUser = req.user;
});

module.exports = userRouter;