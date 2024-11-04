const express = require("express");
const userRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../module/connectionRequest");
const User = require("../module/user");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_DATA
        );

        res.json({
            message: "Data fetched successfully",
            data: connectionRequest,
        });
    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
               { toUserId: loggedInUser._id, status: "accepted" },
               { fromUserId: loggedInUser._id, status: "accepted" },
            ],
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

       const data = connectionRequest.map((row) =>  {
       if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId
       }
       return row.toUserId;
    });

       res.json({ data }); 
    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/feed", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;

        const skip = (page - 1) * limit

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                { fromUserId: loggedInUser._id },
                { toUSerId: loggedInUser._id },
            ],
        })
        .select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId);
            hideUsersFromFeed.add(req.toUserId);
        });

        const users = await User.find({
            $and: [
                { _id: {$nin: Array.from(hideUsersFromFeed)} },
                { _id: { $ne: loggedInUser._id } },
            ],
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.send(users);
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = userRouter;