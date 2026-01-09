const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || typeof firstName !== 'string' || !lastName || typeof lastName !== 'string') {
        throw new Error("First name and Last name are required and must be strings");
    } else if(!emailId || !validator.isEmail(emailId)) {
        throw new Error("A valid email address is required");
    } else if(!password || !validator.isStrongPassword(password)) {
        throw new Error("A strong password is required");
    }
};
module.exports = {
    validateSignUpData,
};