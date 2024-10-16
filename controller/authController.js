const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentController = require("../controller/studentController");
const teacherController = require("../controller/teacherController");
const studentService = require('../service/studentService');
const teacherService=require('../service/teacherService');

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { userType } = req.body;
  try {
    let user;
    switch (userType) {
      case "student":
        const studentData = await studentController.createStudent(req);
        user = studentData;
        break;
      case "teacher":
        const teacherData = await teacherController.createTeacher(req);
        user = teacherData;
        break;
      default:
        console.log('inside deault');
        res.status(404).json({error:"Please enter correct user type"});
    }
    if(user.userType==='student'){
      res.redirect('/student/studentDashboard');
    }
    else if(user.userType === 'teacher'){
      res.redirect('/teacher/teacherDashboard');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { userType, password, } = req.body;

  try {
    switch (userType) {
      //loggin in for student
      case "student":
        const student = await studentService.getStudentByEmail(req);
        if (student) {
          const isPasswordValid = await bcrypt.compare(
            password,
            student.password
          );
          if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
          }
          const token = jwt.sign(
            { id: student.id, userType: student.userType,firstName:student.firstName,lastName:student.lastName },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000,
          });
          return res.redirect('/student/studentDashboard');
        } else {
          res.status(404).json({ error: "Please enter correct credentials" });
        }
        break;
      case "teacher":
        const teacher = await teacherService.getTeacherByEmail(req);
        if (teacher) {
          const isPasswordValid = await bcrypt.compare(
            password,
            teacher.password
          );
          if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
          }
          const token = jwt.sign(
            { id: teacher.id,
              firstName: teacher.firstName,
              lastName: teacher.lastName,
              userType: teacher.userType,
              email:teacher.email,
            },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000,
          });
          return res.redirect("/teacher/teacherDashboard");
        } else {
          res
            .status(404)
            .json({ error: "Please enter correct user credentials" });
        }
        break;
      default:
        return res.status(400).json({ error: "Invalid user type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout=(req,res)=>{
  res.cookie('token','',{maxAge:1});
  res.redirect('/');
};

module.exports = {
  register,
  login,
  logout,
};
