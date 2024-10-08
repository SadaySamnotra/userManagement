const teacherController = require('../controller/teacherController');
const express=require('express');
const router = express.Router();


router.get('/',teacherController.getAllTeachers);
router.get('/:id',teacherController.getTeacherByID);
router.post('/',teacherController.createTeacher);
router.put('/:id',teacherController.updateTeacher);
router.delete('/:id',teacherController.deleteTeacher);

module.exports=router;
