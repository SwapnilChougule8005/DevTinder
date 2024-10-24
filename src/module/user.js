const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required : true,
        minLength:4,
        maxLength:58
    },
    lastName:{
        type: String
    },
    email:{
        type: String,
        lowercase: true,
        unique:true,
        trim:true,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error( "Invalid email address:" + value);
            }
        }
    },
    password:{
        type: String,
        required : true,
        unique: true
    },
    age:{
        type:Number,
        min: 18
    },
    gender:{
        type: String,
        validate(value) {
            if(!["male", "female", "other"].includes(value)) {
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.istockphoto.com/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-gm1451587807-488238421"
    },
    about:{
        type:String,
        default: "This Is default description of about user"
    },
    skills:{
        type:[String],
    },
},
{
    timestamps:true
},)

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790", {
        expiresIn: "7d",
    });
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare( passwordInputByUser, passwordHash);
    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);