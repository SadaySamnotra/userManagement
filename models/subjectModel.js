const sequelize = require('../database');
const {DataTypes}=require('sequelize');

const Subjects=sequelize.define('Subject',
    {
    subjectID:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    subjectName:{
        type:DataTypes.STRING,
        allowNull:false
    },
});

module.exports=Subjects;