const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {} = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req,res) => {
    try{
        const user = req.user;

        res.send(user);
      } 
      catch(err) {
        res.status(400).send("ERROR:" + err.message);
      }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request"); 
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[ket] = req.body[key]));

       await loggedInUser.save();

        res.json({ message :  `${firstName} your profile updated successfully`, 
        data: loggedInUser,
    });
    }
    catch(err) {
        res.status(400).send("ERROR :", + err.message);
    }
})

module.exports = profileRouter;