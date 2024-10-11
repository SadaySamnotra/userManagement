const sequelize=require('../database');
const { DataTypes } = require('sequelize');

const Teacher=sequelize.define('Teacher',
    {
    teacherID:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
});

Teacher.associate=(models)=>{
    Teacher.belongsToMany(models.Student,{through:'StudentTeachers'});
    Teacher.belongsToMany(models.Subjects,{through:'TeacherSubjects'});
};

module.exports=Teacher;