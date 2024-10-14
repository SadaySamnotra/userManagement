const sequelize=require('../database');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const Teacher=sequelize.define('Teacher',{
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
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    userType:{
        type:DataTypes.ENUM("teacher"),
        allowNull:false,
    },
},{
    hooks:{
        beforeCreate:async(teacher,options)=>{
            teacher.firstName=teacher.firstName.toLowerCase();
            teacher.lastName=teacher.lastName.toLowerCase();
            teacher.password= await bcrypt.hash(teacher.password,10);
        },
    },
});



module.exports=Teacher;