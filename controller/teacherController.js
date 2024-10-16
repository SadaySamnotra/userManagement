const Teacher = require('../models/teacherModel');
const Subjects = require('../models/subjectModel');
const teacherService = require('../service/teacherService')

const createTeacher=async(req)=>{
    const {firstName,lastName,email,password,userType}=req.body;
    try{
        const teacher = await Teacher.create({firstName,lastName,email,password,userType});
        return teacher;
    }catch(err){
        console.error(err);
    };
};


const updateTeacher=async(req,res)=>{
    const {firstName,lastName,address}=req.body;
    const {id} = req.params;
    try{
        const result = await Teacher.findByPk(id);
        if(result){
            const updatedTeacher = await Teacher.update({firstName,lastName,address},{where:{teacherID:id}});
            if(updatedTeacher){
                res.status(203).json({"Updated-record":updatedTeacher});
            }else{
                res.status(404).json({error:"No record found to update the details"});
            }
        }
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    };
};


const deleteTeacher=async(req,res)=>{
    const {id} = req.params;
    try{
        const result = await Teacher.destroy({where:{teacherID:id}});
        if(result){
            res.status(204).json({result});
        }else{
            res.status(404).json({Message:"Cannot find record to delete in the teacher's table"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({Error:"Internal server error"});
    };
};


const renderTeacherDashboard= async(req,res)=>{
    const subject = Subjects.findAll();
    res.render('teacherDashboard',{
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        subjects:subject,
    });
};

module.exports={
    createTeacher,
    updateTeacher,
    deleteTeacher,
    renderTeacherDashboard,
};