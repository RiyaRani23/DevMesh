// Middleware is a function that runs before the actual request handler 
const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        return res.status(403).send("Admin not authorized");
    }  else {
        next();
    }
};

const userAuth = (req, res, next) => {
    console.log("Admin auth is getting checked!!");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        return res.status(403).send("Admin not authorized");
    }  else {
        next();
    }
};

module.exports = { adminAuth, userAuth };