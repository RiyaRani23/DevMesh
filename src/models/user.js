const mongoose = require('mongoose');
const validator = require('validator'); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// Define the User schema
const userSchema = new mongoose.Schema({ 
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address" + value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Your password is not strong enough");
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
        },
        // validate(value) {
        //     if(!["Male", "Female", "Other"].includes(value)) {
        //         throw new Error("Gender must be 'Male', 'Female', or 'Other'"); 
        //     }
        // },

    },
    photoUrl: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-library.com%2Ficon%2Fprofile-picture-icon-15.html&psig=AOvVaw0UUL4DYStm5-K6LP0QVTdp&ust=1764748521918000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKDC9de2npEDFQAAAAAdAAAAABAK',
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Invalid photo URL");
            }
        }
    },

    about: {
        type: String,
        default:'This is default about me section. Please update it.'
    },

    skills: {
        type: [String],
        default: [],
    },       
}, 
{
    timestamps: true
});

// Instance method to generate JWT token ( do not use arrow function here)
userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

// Instance method to validate password
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

module.exports = mongoose.model('User', userSchema);