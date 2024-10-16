const Teacher = require('../models/teacherModel');

const getAllTeachers=async(req,res)=>{
    try{
        const teacher = await Teacher.findAll();
        res.status(200).json({teacher});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"failed to fetch teacher"});
    }
};

const getTeacherByID=async(req,res)=>{
    const {teacherID}=req.params;
    try{
        const teacher = await Student.findByPk(teacherID);
        return res.status(200).json({teacher});
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Failed to fetch teacher"});
    }
};
const getTeacherByEmail=async(req,res)=>{
    console.log('Request body:', req.body);
    const {email}=req.body;
    console.log('Email extracted:', email);
    try{
        const result = await Teacher.findOne({where:{email}});
        if(result){
            return result;
        }
    }catch(err){
        console.log(err);
    }
}
module.exports={
    getAllTeachers,
    getTeacherByID,
    getTeacherByEmail,
};