const express=require('express');
const router = express.Router();

const subject_controller=require('../controller/subjectController');

const authorize=require('../middleware/authJWT');

router.get('/',authorize(['teacher']),subject_controller.getAllSubjects);
router.post('/',authorize(['teacher']),subject_controller.addSubject);
router.get('/:id',authorize(['teacher']),subject_controller.getSubjectByID);
router.put('/:id',authorize(['teacher']),subject_controller.updateSubject);
router.delete('/:id',authorize(['teacher']),subject_controller.deleteSubject);

module.exports=router;