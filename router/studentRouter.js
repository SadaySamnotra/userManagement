const express=require('express');
const router = express.Router();

const student_controller=require('../controller/studentController');

router.get('/',student_controller.getAllStudents);
router.post('/',student_controller.createStudent);
router.get('/:id',student_controller.getStudentByID);
router.put('/:id',student_controller.updateStudent);
router.delete('/:id',student_controller.deleteStudent);

module.exports=router;