const teacherController = require('../controller/teacherController');
const express=require('express');
const router = express.Router();
const authorize = require('../middleware/authJWT');


router.get('/teacherDashboard',authorize(['teacher']),teacherController.renderTeacherDashboard);
//router.post('/details',authorize(['teacher']),teacherController.getTeacherByEmail);
module.exports=router;
