const teacherController = require('../controller/teacherController');
const express=require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/',authController.login);
router.post('/',authController.register);


module.exports=router;
