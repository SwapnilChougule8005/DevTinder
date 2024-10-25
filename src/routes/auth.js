const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../module/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
 
 try{
       // Validation of data
    validateSignUpData(req);
    // Encrypt the password
    const { firstName, lastName, email,  password } = req.body;
  
    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash);

    // creating a new user instant of the user model
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
 authRouter.post("/login", async (req,res) => {
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

module.exports = authRouter; 