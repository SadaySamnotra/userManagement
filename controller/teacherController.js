const Teacher = require('../models/teacherModel');

const createTeacher=async(req)=>{
    const {firstName,lastName,email,password,userType}=req.body;
    try{
        const teacher = await Teacher.create({firstName,lastName,email,password,userType});
        return teacher;
    }catch(err){
        console.error(err);
    };
};

const getAllTeachers=async(req,res)=>{
    try{
        const result = await Teacher.findAll();
        if(result){
            res.status(200).json({result});
        }else{
            res.status(404).json({error:"No records found"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    }
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

const getTeacherByID=async(req,res)=>{
    const {id}=req.params;
    try{
        const result = await Teacher.findByPk(id);
        if(result){
            console.log(result);
            res.status(200).json({result});
        }else{
            res.status(404).json({Message:"Cannot find the record in the table"});
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

const getTeacherByEmail= async(req)=>{
    const {email}=req.body;
    try{
        const result = await Teacher.findOne({where:{email}});
        if(result){
            return result;
        }else{
            return {};
        }
    }catch(error){
        console.error(error);
    }
}

module.exports={
    createTeacher,
    updateTeacher,
    getAllTeachers,
    getTeacherByID,
    deleteTeacher,
    getTeacherByEmail,
};