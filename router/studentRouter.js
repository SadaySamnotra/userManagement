const express=require('express');
const router = express.Router();
const student_controller=require('../controller/studentController');
const authController = require('../controller/authController');
const authorize = require('../middleware/authJWT');

router.post('/',authController.login);
router.post('/',authController.register);
router.get('/studentDashboard',authorize(['student']),student_controller.renderDashboard);

module.exports=router;