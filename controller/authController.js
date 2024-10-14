const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentController = require("../controller/studentController");
const teacherController = require("../controller/teacherController");

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
        return res.status(400).json({ error: "Invalid user type" });
    }
    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { userType, password } = req.body;

  try {
    switch (userType) {
      case "student":
        const student = await studentController.getStudentByEmail(req);
        if (student) {
          const isPasswordValid = await bcrypt.compare(
            password,
            student.password
          );
          if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
          }
          const token = jwt.sign(
            { id: student.id, userType: student.userType },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.status(200).json({ token, userType: student.userType });
        } else {
          res.status(404).json({ error: "Please enter correct credentials" });
        }
        break;
      case "teacher":
        const teacher = await teacherController.getTeacherByEmail(req);
        if (teacher) {
          const isPasswordValid = await bcrypt.compare(
            password,
            teacher.password
          );
          if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
          }
          const token = jwt.sign(
            { id: teacher.teacherID, userType: teacher.userType },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.status(200).json({ token, userType: teacher.userType });
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

module.exports = {
  register,
  login,
};
