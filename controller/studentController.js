const Student = require('../models/studentModel');


const createStudent=async(req,res)=>{
    const {firstName,lastName,email,age,password}=req.body;
    try{
        const student = await Student.create({firstName,lastName,email,age,password});
        res.status(201).json({student});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Failed to make the student entry in the database'});
    }
};

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

const updateStudent=async(req,res)=>{
    const {firstName,lastName,email,age}=req.body;
    const {id}=req.params;
    try{
        const result = await Student.update({firstName,lastName,email,age},{where:{id}});
        if(result){
            const updatedStudent = await Student.findByPk(id);
            res.status(200).json({student:updatedStudent});
        }else{
            res.status(404).json({error:"The record has not been found in the database"});
        }
    }catch(err){    
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    };
};

const deleteStudent=async(req,res)=>{
    const {id}=req.params;
    try{
        const result = await Student.destroy({where:{id}});
        if(result){
            res.status(204).send();
        }else{
            res.status(404).json({error:"Some error in the code or no record found"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({error:"internal server error"});
    };
};

module.exports={
    createStudent,
    getAllStudents,
    getStudentByID,
    updateStudent,
    deleteStudent,
};
