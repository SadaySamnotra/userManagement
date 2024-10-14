const express=require('express');
const router = express.Router();
const student_controller=require('../controller/studentController');
const authController = require('../controller/authController');
// const authJWT = require('../middleware/authJWT');

router.post('/',authController.login);
router.post('/',authController.register);


module.exports=router;