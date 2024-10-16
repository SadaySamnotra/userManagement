const Student = require('../models/studentModel');


const createStudent=async(req)=>{
    const {firstName,lastName,email,age,password,userType}=req.body;
    try{
        const student = await Student.create({firstName,lastName,email,age,password,userType});
        return student;
    }catch(err){
        console.error(err);
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


const renderDashboard = async(req,res)=>{
    res.render('studentDashboard',{
        firstName:req.user.firstName,
        lastName:req.user.lastName,
    });
};



module.exports={
    createStudent,
    updateStudent,
    deleteStudent,
    renderDashboard,
};
