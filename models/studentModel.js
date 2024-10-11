const {DataTypes}= require('sequelize');
const sequelize=require('../database');

const Student=sequelize.define('Student',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
});

Student.associate=(models)=>{
    Student.belongsToMany(models.Teacher,{through:'StudentTeachers'});
    Student.belongsToMany(models.Subjects,{throught:'StudentSubjects'});
};

module.exports=Student;