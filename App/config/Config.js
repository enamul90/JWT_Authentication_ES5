
const DataBaseUrl = "mongodb://localhost:27017/AuthProject";
const PORT= '3060';
const MAX_JSON_SIZE = "50mb";
const URL_ENCODED = true;
const WEB_CACHE=false;

const JWT_KEY= "1542KKU+--T"
const JWT_EXPIRES=60*60*1000;

const EMAIL_HOST="mail.teamrabbil.com"
const EMAIL_PORT=25
const EMAIL_SECURITY=false
const EMAIL_USER="info@teamrabbil.com"
const EMAIL_PASS="~sR4[bhaC[Qs"
const EMAIL_UN_AUTH=false







module.exports={
    DataBaseUrl,
    PORT,
    MAX_JSON_SIZE,
    URL_ENCODED,
    WEB_CACHE,
    JWT_KEY,
    JWT_EXPIRES,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURITY,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_UN_AUTH
}