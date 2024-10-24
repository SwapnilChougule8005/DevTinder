const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./module/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
 
  try{
     // Validation of data
  validateSignUpData(req);
  // Encrypt the password
  const { firstName, lastName, email,  password } = req.body;

  const passwordHash = await bcrypt.hash(password,10);
  console.log(passwordHash);
  const user =  new User({
    firstName, lastName, email, password:passwordHash
  });

    await user.save();
    res.send("User Added Successfully");
  }
  catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
}) 
app.post("/login", async (req,res) => {
  try{
    const { email, password } = req.body;

    const user = await User.findOne({ email : email });
    if(!user) {
      throw new Error("Invalid credentials")
    }
    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(" Login Successfully");
    }
    else{
      throw new Error ("Invalid credentials")
    }
  }
  catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
})
app.get("/profile", userAuth, async (req, res) => {
  try{
    const user = req.user;
  
   res.send(user);
   }
  catch(err) {
    res.status(400).send("ERROR :" + err.message);
  }
})
app.post("/sendConnectRequest", userAuth, async (req, res) => {
  const user = req.user;
  // Sending a connection request
  console.log(" Sending Connection request ");

  res.send(user.firstName + "sent the connect request");
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
