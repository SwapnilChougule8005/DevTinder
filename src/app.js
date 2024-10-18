const express = require("express");

const app = express();

app.use("/",(req,res) => {
    res.send("hello from dashboard");
})
app.use("/hello",(req,res) => {
    res.send("hello from hello");
})
app.use("/test",(req,res) => {
    res.send("Hello from the server");
})
app.use("/about",(req,res) => {
    res.send("thi is about page")
})


app.listen(3000, () => {
    console.log("Server is Listening Successfully on 3000 port...");
});