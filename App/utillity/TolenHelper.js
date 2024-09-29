const jwt = require("jsonwebtoken");
const Config = require("../config/Config");

const EncodedToken=(user_id,email)=>{
    let key=Config.JWT_KEY;
    let expire = Config.JWT_EXPIRES;
    let payload={email:email,user_id:user_id};
    return jwt.sign(payload, key, {expiresIn: expire})
}


const DecodedToken=(token)=>{

    try{
        let key=Config.JWT_KEY;
        let decoded = jwt.verify(token,key);
        return decoded;

    }

    catch(err){
        return null;
    }
}


module.exports={
    EncodedToken,
    DecodedToken,
};