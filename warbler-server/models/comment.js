const mongoose = require("mongoose");
const User = require("./user");

const commentSchema = new mongoose.Schema(
  {
    text:{
        type: String,
        required:true,
        maxLength:500
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
  },
    {
        timestamps:true
    }
);

commentSchema.pre('remove', async function(next){
    try{
        //find a user
        let user = await User.findById(this.user)
        //remove the id of the message from their message list 
        user.messages.comments.remove(this.id); //completely synchronise just like splice
        //save that user
        await user.save()
        //return next
        return next();

    }catch(err){
        return next(err);
    }
});

const Comment = mongoose.model("Comment",commentSchema);
module.exports = Comment;