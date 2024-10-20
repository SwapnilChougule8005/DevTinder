const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./module/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const user =  new User(req.body);

  try{
    await user.save();
    res.send("User Added Successfully");
  }
  catch (err) {
    res.status(400).send("Error saving the user :" + err.message);
  }
}) 

app.get("/user", async (req,res) => {
  const userName = req.body.firstName;

  try{
    const users = await User.find({firstName: userName});
    if(users.length === 0) {
      res.status(404).send("User not found")
    }
    else{
        res.send(users);
    }
  }
  catch (err) {
    res.status(400).send("something went wrong");
  }
})
app.get("/getAllUser", async (req, res) => {
  
  try{
    const users = await User.find({})
  res.send(users);
  }
  catch(err) {
    res.status(404).send("something went wrong");
  }
})

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });
