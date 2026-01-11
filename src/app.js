const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  ...(process.env.FRONTEND_URI ? process.env.FRONTEND_URI.split(",") : []),
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, 
  })
);

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/userRouter");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// Connect to the database and start the server

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(3000, () => {
        console.log("Server is running on port 3000");
       });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });
