const Subject=require('../models/subjectModel');

const addSubject=async (req,res)=>{
    const {subjectID,subjectName}=req.body;
    try{
        const result = await Subject.create({subjectID,subjectName});
        if(result){
            res.status(201).json({result});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    }
};

const getAllSubjects=async(req,res)=>{
    try{
        const result = await Subject.findAll();
        res.status(200).json({result});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"failed to fetch subjects"});
    }
};

const getSubjectByID=async(req,res)=>{
    const {sID}=req.params;
    try{
        const result = await Subject.findByPk(sID);
        res.status(200).json({result});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch subject records."});
    }
};

const updateSubject=async(req,res)=>{
    const {subjectName}=req.body;
    const {id}=req.params;
    try{
        const result = await Subject.update({subjectName},{where:{id}});
        if(result){
            const updatedSubject = await Subject.findByPk(id);
            res.status(200).json({subject:updatedSubject});
        }else{
            res.status(404).json({error:"The record has not been found in the database"});
        }
    }catch(err){    
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    };
};

const deleteSubject=async(req,res)=>{
    const {id}=req.params;
    try{
        const result = await Subject.destroy({where:{id}});
        if(result){
            res.status(204).json({message:"The subject has been deleted"});
        }else{
            res.status(404).json({error:"Some error in the code or no record found"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({error:"internal server error"});
    };
};

module.exports={
    addSubject,
    getAllSubjects,
    getSubjectByID,
    updateSubject,
    deleteSubject,
};