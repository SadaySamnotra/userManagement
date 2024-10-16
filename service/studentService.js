const Student = require('../models/studentModel');

const getAllStudents=async(req,res)=>{
    try{
        const students = await Student.findAll();
        res.status(200).json({students});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"failed to fetch students"});
    }
};

const getStudentByID=async(req,res)=>{
    const {sID}=req.params;
    try{
        const student = await Student.findByPk(sID);
        return res.status(200).json({student});
    }catch(err){
        console.log(err);
        return res.status(500).json({error:"Failed to fetch students"});
    }
};
const getStudentByEmail=async(req)=>{
    const {email}=req.body;
    try{
        const result = await Student.findOne({where:{email}});
        if(result){
            return result;
        }
    }catch(err){
        console.log(err);
    }
}
module.exports={
    getAllStudents,
    getStudentByID,
    getStudentByEmail,
};