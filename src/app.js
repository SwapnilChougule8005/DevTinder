const express = require("express");

const app = express();

const { adminAuth } = require("./middlewares/auth");

// Handle Auth Middleware for all GET POST ... request

app.use("/admin", adminAuth);

app.get("/user", (req, res) => {
    res.send("User Data Send");
});

app.get("/admin/getAllData",(req,res) => {
    res.send("All Data Send");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user");
})

app.listen(3000, () => {
    console.log("Server is Listening Successfully on 3000 port...");
});