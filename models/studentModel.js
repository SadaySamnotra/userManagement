const {DataTypes}= require('sequelize');
const sequelize=require('../database');
const bcrypt = require('bcrypt');

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userType:{
        type:DataTypes.ENUM("student"),
        allowNull:false,
    }
}, {
    hooks: {
        beforeCreate: async(student, options) => {
            student.firstName = student.firstName.toLowerCase();
            student.lastName = student.lastName.toLowerCase();
            student.password = await bcrypt.hash(student.password,10);
        },
    },
});

Student.associate = (models) => {
    Student.belongsToMany(models.Subject, {
        through: 'StudentSubjects',
        foreignKey: 'studentId',
        otherKey: 'subjectId',
    });
};


module.exports=Student;