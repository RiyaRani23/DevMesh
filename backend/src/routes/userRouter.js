const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// Define safe user data fields to be returned
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {

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
});

// Get all the connections for the loggedIn user
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Define safe user data fields to be returned
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests
  .map((row) => {
    // 🔐 safety check for deleted users
    if (!row.fromUserId || !row.toUserId) return null;

    return row.fromUserId._id.toString() === loggedInUser._id.toString()
      ? row.toUserId
      : row.fromUserId;
  })
  .filter(Boolean); // remove null entries

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

/// Get user feed excluding users with pending/accepted connection requests
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Pagination parameters
    const page = parseInt(req.query.page) || 1; // Default to page 1
    let limit = parseInt(req.query.limit) || 30; // Number of users per page
    limit = limit > 50 ? 50 : limit; 
    const skip = (page - 1) * limit; // Number of users to skip

    // Fetch all connection requests involving the logged-in user
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    // Create a set of user IDs to hide from the feed
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      // Exclude users in hideUsersFromFeed and the logged-in user
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .sort({ _id: 1 })
      .skip(skip)
      .limit(limit);

    // Shuffle users so feed order is random on each request
    const shuffledUsers = [...users];
    for (let i = shuffledUsers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
    }

    res.json({ data: shuffledUsers });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
}
});

// Get all connection requests sent by LoggedIn user
userRouter.get("/user/requests/sent", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequestsByUser = await ConnectionRequest.find({
      fromUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "toUserId", USER_SAFE_DATA);
    // }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequestsByUser,
    });
  } catch (err) {
    req.statusCode(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;