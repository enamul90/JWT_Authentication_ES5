const userModel = require('../models/UserModel');
let md5 = require('md5');
const TokenHelper = require('../utillity/TolenHelper');
const Config = require("../config/Config");
const EmailSend =require("../utillity/SendMail");


const registerController = async (req, res)=> {

    try{
        let reqBody = req.body;

        reqBody.password = md5(req.body.password);
        let user = await userModel.find({email: reqBody.email});


        if(user.length > 0){
            res.status(200).json({ status: "error", msg: "have account" });
        }
        else {
            let data = await userModel.create(reqBody);
            res.status(200).json({ status: "success", data:data});
        }

    }
    catch (err){
        res.status(500).json({ status: "error", msg: err });
    }

}


const loginController = async (req, res)=>{
    try{
        let reqBody = req.body;
        reqBody.password = md5(req.body.password);

        // let emailRegex= {$regex:reqBody.email, "$options":"i"};

        let matchingStage= {$match: {email:reqBody.email, password: reqBody.password}}
        let projection = {$project:{"_id":1, "email":1}}

        let data = await userModel.aggregate([
            matchingStage,
            projection,
        ])


        if(data.length>0){
            let token = TokenHelper.EncodedToken({user_id:data[0]['_id']},{ email:data[0]['email']});

            let option={
                maxAge:Config.JWT_EXPIRES,
                httponly:true,
                sameSite:"none",
                secure:true,
            }

            res.cookie("token",token,option);

            res.status(200).json({ status:"success", token:token});
        }
        else {
            res.status(200).json("User not found");
        }

    }

    catch (err){
        res.status(500).json({ status: "error", msg: err });
    }
}


const profile_read=async (req,res)=>{
    try{
        let email = req.headers.email.email
        let matchingStage = {$match: {email:email}}
        let projection = {$project:{"_id":0, "password":0}}

        let data = await userModel.aggregate(
            [
                matchingStage,
                projection,
            ]
        );


        res.status(200).json({status:"success",data:data[0]});
    }
    catch (e){
        res.json({Status:e.status,message:e.message});
    }
}


const sendMail = async (req,res)=>{
    let reqBody = req.body;
    let emailTo = reqBody.email;
    let emailText = reqBody.emailText;
    let emailSubject =reqBody.emailSubject;

    try{
        let data = await EmailSend(emailTo, emailText, emailSubject)
        res.status(200).json({ status: "success", data: data });
    }
    catch(err){
        res.status(500).json({ status: "error", msg: err });
    }



}


const logout = async (req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({ status: "success" });
    } catch (e) {
        res.status(200).json({ status: "error", error: e.toString() });
    }

}



module.exports = {
    registerController,
    loginController,
    profile_read,
    sendMail,
    logout
};