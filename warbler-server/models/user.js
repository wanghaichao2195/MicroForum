const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const unserSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    profileImageUrl:{
        type:String
    },
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    }


});

//a pre hook on userSchema, before we save the ducument, run this function
unserSchema.pre("save", async function(next){ // next means move on
    try{
        if(!this.isModified("password")){
            return next();//if not Modified don't hash it again
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);//10 means salting
        this.password = hashedPassword;
        return next();// move to save the document
    }catch(err){
        return next(err);//send to err handler
    }
})

unserSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    } catch (error) {
        return next(err);
    }
};


const User = mongoose.model("User",unserSchema)

module.exports = User;