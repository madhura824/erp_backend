const express = require("express");
const router = express.Router();
const Student = require("../Models/studentModel");
const Teacher = require("../Models/teacherModel");
const Admin = require("../Models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.use(express.json());

const loginValidation = require('../Validations/loginValidations/loginValidation');


router.post("/userlogin", async (req, res, next) => {
    //console.log("uesr login working")
    try {
        const { userID, password } = req.body;

        let teacher;
        let student;
        let admin;

        if (!isNaN(parseInt(userID))) {
            student = await Student.findOne({ PRN: parseInt(userID) });
        }
        teacher = await Teacher.findOne({ teacherID: userID });
        admin = await Admin.findOne({ adminID: userID });

        if (student) {
            const isPasswordValid = await bcrypt.compare(password, student.studentPassword);

            if (isPasswordValid) {
                const createToken = (student) => {
                    return jwt.sign({
                        userID: student.PRN,
                        designation: "student",
                        studentPanel: student.studentPanel,
                        currentSem: student.currentSem,
                        currentYear: student.currentYear
                    }, process.env.SECRET, { expiresIn: "3d" });
                };
                const studentToken = createToken(student);
                res.status(200).json({
                    message: student,
                    token: studentToken,
                    designation: "student",
                    success: true
                });
            } else {
                res.status(401).json({ error: "Incorrect email or password", success: false });
            }
            next()

        }
        else if (teacher) {
            const isPasswordValid = await bcrypt.compare(password, teacher.password);

            if (isPasswordValid) {
                const createToken = (teacher) => {
                    return jwt.sign({ userID: teacher.teacherID, designation: "teacher" }, process.env.SECRET, { expiresIn: "3d" });
                };
                const teacherToken = createToken(teacher);
                res.status(200).json({
                    message: teacher,
                    token: teacherToken,
                    designation: "teacher",
                    success: true
                });
            } else {
                res.status(401).json({ error: "Incorrect email or password", success: false });
            }
            next()
        }
        else if (admin) {
            const isPasswordValid = await bcrypt.compare(password, admin.password);


            if (isPasswordValid) {
                const createToken = (admin) => {
                    return jwt.sign({ userID: admin.adminID, designation: "admin" }, process.env.SECRET, { expiresIn: "3d" });
                };
                const adminToken = createToken(admin);
                res.status(200).json({
                    message: admin,
                    token: adminToken,
                    designation: "admin",
                    success: true
                });
            } else {
                res.status(401).json({ error: "Incorrect email or password", success: false });
            }
            next();
        }


        else {

            res.status(404).json({ error: "No user found with given credentials, Enter Correct User Id", success: false });
            flag = 0;
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "An internal server error occurred while logging in: " + error.message,
            success: false,
        });
    }
});

module.exports = router;