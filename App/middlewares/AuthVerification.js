const {DecodedToken, EncodedToken}= require("../utillity/TolenHelper")
const Config = require("../config/Config");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;



const AuthVerification = (req,res,next)=>{
    let token = req.cookies['token'];
    let decoded = DecodedToken(token);
    let decodedEmail = decoded["email"]['email'];
    let decodedUserID = new ObjectId(decoded["user_id"]['user_id']);



    let newToken =EncodedToken({user_id:decodedUserID},{ email:decodedEmail});


    if(decoded==null){
        res.status(401).json({error:"token don't match"});
    }
    else{
        let email = decoded.email;
        let user_id = decoded.user_id;
        req.headers.email=email
        req.headers.user_id=user_id;

        let option={
            maxAge:Config.JWT_EXPIRES,
            httponly:true,
            sameSite:"none",
            secure:true,
        }

        res.cookie("token",newToken,option);
        next()
    }

}



module.exports = AuthVerification;