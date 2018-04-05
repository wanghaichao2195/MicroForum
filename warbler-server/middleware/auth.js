require("dotenv").load();
var jwt = require("jsonwebtoken");//still use the callback pattern so we can't use async function

//make sure the user is logged - Authentication
exports.loginRequired = function(req,res,next){
    //get token from http header
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){
                next();
            }else{
                return next({
                    status:401,//unauthorized
                    message:"Please log in first"
                });
            }
        });
    }catch(e){
        return next({
            status:401,
            message:"Please log in first"
        })
    }
}


// /api/users/:id/messages   prevent users from tampering with other users' information
//make sure we get the correct user - Authorization

exports.ensureCorrectUser = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY,function(err ,decoded){
            if(decoded && decoded.id === req.params.id){//req.params.id the id in url
                return next();
            }else{
                return next({
                    status:401,
                    message:"Unauthorized"
                });
            }
        });

    }catch(e){
        return next({
            status:401,
            message:"Unauthorized"
        });
    }
}
