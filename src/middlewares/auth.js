const adminAuth = (req, res, next) => {
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
}