const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password, gender} = req.body;

    if(!firstName || typeof firstName !== 'string' || !lastName || typeof lastName !== 'string') {
        throw new Error("First name and Last name are required and must be strings");
    } else if(!emailId || !validator.isEmail(emailId)) {
        throw new Error("A valid email address is required");
    } else if(!password || !validator.isStrongPassword(password)) {
        throw new Error("A strong password is required");
    }
    else if (gender < 17) {
    throw new Error("Age must be at least 18 years!");
    }
};

// Function to validate edit profile data
const validateEditProfiledata = (req) => {
  const allowedFields = ["firstName", "lastName", "photoUrl", "password", "about", "skills", "age", "gender"];

  const isEditAllowed =  Object.keys(req.body).every(field => allowedFields.includes(field));
  return isEditAllowed;
}
module.exports = {
    validateSignUpData,
    validateEditProfiledata,
};