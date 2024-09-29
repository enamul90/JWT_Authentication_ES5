const express = require('express');



const router = express.Router();
const userController = require('../App/controllers/UserController');
const AuthVerification=require('../App/middlewares/AuthVerification');




router.post('/register',userController.registerController)
router.get('/login',userController.loginController)
router.get('/profile_read',AuthVerification,userController.profile_read)
router.post('/Send_mail',AuthVerification,userController.sendMail)
router.post('/logout',AuthVerification,userController.logout)











module.exports = router;