const express=require('express');
const router = express.Router();

const subject_controller=require('../controller/subjectController');

router.get('/',subject_controller.getAllSubjects);
router.post('/',subject_controller.addSubject);
router.get('/:id',subject_controller.getSubjectByID);
router.put('/:id',subject_controller.updateSubject);
router.delete('/:id',subject_controller.deleteSubject);

module.exports=router;