const sequelize = require('../database');
const {DataTypes}=require('sequelize');

const Subjects=sequelize.define('Subject',
    {
    subjectID:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    subjectName:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

Subjects.associate=(models)=>{
    Subjects.belongsToMany(models.Student,{through:'StudentSubjects'});
    Subjects.belongsToMany(models.Teacher,{through:'TeacherSubjects'});
};

module.exports=Subjects;