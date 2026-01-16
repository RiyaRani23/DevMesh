const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(cors({
    origin: [
        "https://dev-mesh-frontend-url.vercel.app", // Your actual frontend Vercel URL
        "http://localhost:5173" // For local testing
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

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
