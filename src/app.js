const express = require("express");

const app = express();

// Handle Auth Middleware for all  GET POST .. request
app.use("/admin", (req, res, next) => {
    console.log("Admin auth id getting checked!!");
    const token = "swapnil";
    const isAdminAuthorized = token === "swapnil";
    if(!isAdminAuthorized) {
        res.status(401).send("Unauthorized request")
    }else{
        next();
    }
});

app.get("/admin/getAllData", (req,res) => {
    res.send("All Data Send");
});
app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user")
})
app.listen(3000, () => {
    console.log("Server is Listening Successfully on 3000 port...");
});