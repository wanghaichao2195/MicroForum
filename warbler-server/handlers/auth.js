const db = require("../models"); // as ../models/index
const jwt = require("jsonwebtoken");// mark users as logged in

exports.signin = async function(req, res, next){
    // find a user
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {id, username, profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                    id:id, //shorthand id,username,profileImageUrl
                    username:username,
                    profileImageUrl:profileImageUrl
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token 
            });
        }else{
            return next({
                status:400,
                message:"Invaild Email/Password."
            });//send this to the errorHandler
        }
    } catch (e) {
        return next({
            status:400,
            message:"Invaild Email/Password."
        });
    }
    
   
}

exports.signup = async function(req, res, next){
    try{
        // create a user
        let user = await db.User.create(req.body);
        let{id,username,profileImageUrl} = user;//=user.id,user.username
         // create a token(signing a token)
        let token =jwt.sign({
            id:id,// es6: id, username, profileImageUrl
            username:username,
            profileImageUrl:profileImageUrl
            },
            process.env.SECRET_KEY//secret key
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
       
    }catch(err){
        //if a validation fails!
        if(err.code === 11000){
            err.message = "Sorry, that username and/or eamil is taken";
        }
         return next({
             status:400,
             message:err.message
         })
    }
}