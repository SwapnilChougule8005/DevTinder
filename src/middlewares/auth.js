/*const adminAuth = (req, res, next) => {


    console.log("Admin auth is getting checked!!");
    const token = "swapnil";
    const isAdminAuthorized = token === "swapnil";

    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("User auth is getting checked!!");
    const token = "vrushabh";
    const isAdminAuthorized = token === "vrushabh";

    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
}
module.exports = {
    adminAuth,
    userAuth,
}*/

const jwt = require("jsonwebtoken");
const User = require("../module/user");

const userAuth = async (req, res, next) => {
    try{
        const { token } = req.cookies;
        if(!token) {
            throw new Error("Token is not valid")
        }
 
        const decodedObj = await jwt.verify(token, "DEV@Tinder$790");

        const { _id } = decodedObj;

        const user = await User.findById(_id);
        if(!user) {
            throw new Error("User not found");
        }

        req.user = user
        next();
    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
}

module.exports = {
    userAuth,
}