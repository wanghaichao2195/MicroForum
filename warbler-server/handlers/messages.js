const db = require("../models");  //../models/index

// /api/users/:id/messages
exports.createMessage = async function(req, res, next){
    try{
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);

        await foundUser.save();

        let foundMessage = await db.Message.findById(message._id).populate("user",{
            username:true,                         //message.id or message._id both f
            profileImageUrl:true
        })
        return res.status(200).json(foundMessage);

    }catch(err){
        return next(err);
    }
}
//get - /api/users/:id/messages/:message_id
exports.getMessage = async function(req,res,next){
    try{
        let message = await db.Message.find(req.params.message_id);
        return res.status(200).json(message);
    }catch(err){
        return next(err);
    }
}

exports.deleteMessage = async function(req,res,next){
    try{
        let foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    }catch(err){
        return next(err);
    }
}
