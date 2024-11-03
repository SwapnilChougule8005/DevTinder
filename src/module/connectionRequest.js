const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // reference to the user collection
        require: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
    },
},
  {
    timestamps: true, 
  }
);

// connectionRequestSchema.find({fromUserId: 234r4721167rur, toUserId:12444r3tr324});

connectionRequestSchema.index({ fromUserID: 1});

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    // check if the fromUserId is same as toUserId
    if(this.fromUserId.equals(this.toUserId)) {
        throw new Error(" Cannot sent connection request to yourself");
    }
    next();
})

const ConnectionRequest =  mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequest;
