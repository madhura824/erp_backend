const express = require("express");
const router = express.Router();
const Student = require("../Models/studentModel");
const bcrypt = require("bcrypt");


const addStudentValidation = require("../Validations/studentValidations/addStudentValidation");
const updateStudentValidation = require("../Validations/studentValidations/updateStudentValidation");

const getStudentValidation = require("../Validations/studentValidations/getStudentValidation");

const getStudentsFromPanelValidation = require("../Validations/studentValidations/getStudentsFromPanelValidation");

const getStudentsFromPRNSubstringValidation = require("../Validations/studentValidations/getStudentsFromPRNSubstringValidation")
const getStudentsFromNameSubStringValidation = require("../Validations/studentValidations/getStudentFromNameSubStringValidation")
const deleteStudentValidation = require("../Validations/studentValidations/deleteStudentValidation")

router.use(express.json());



router.post("/addStudent", addStudentValidation, async (req, res) => {
    //console.log("addStudent working ")
    try {
        const { PRN, studentName, studentRoll, studentPanel, currentYear, currentSem, studentBatch, studentCourse, studentDOB, phoneNo, studentEmail, studentPassword, totalSubjectCount, emergencyNumber } = req.body;
        //  var panel=studentPanel.upper;
        const exists = await Student.findOne({ PRN });
        var panel = studentPanel.toUpperCase();
        if (exists) {
            res.status(409).json({ error: `Another student with same PRN ${PRN} already exists.`, success: false });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(studentPassword, salt);
            const student = await Student.create({ PRN, studentName, studentRoll, studentPanel: panel, currentYear, currentSem, studentBatch, studentCourse, studentDOB, phoneNo, studentEmail, studentPassword: hash, totalSubjectCount, emergencyNumber });

            if (student) {
                res.status(200).json({ student, success: true });
            }
            else {
                res.status(500).json({
                    error: "Error in creating student",
                    success: false,
                });
            }


        }
    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while adding the student: " + error.message,
            success: false,
        });
    }
});

router.get("/getStudent/:PRN", getStudentValidation, async (req, res) => {
    // console.log("getSTudent working")
    try {
        const PRN = req.params.PRN;
        const student = await Student.findOne({ PRN }).select("-studentPassword");

        if (!student) {
            res.status(409).json({
                error: `Student with the mentioned PRN ${PRN} does not exist`
            })
        }
        else {
            res.status(200).json({ student, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the student details: " +
                error.message,
            success: false,
        });
    }
});

// router.post("/updateStudent", updateStudentValidation, async (req, res) => {

//     // console.log("updateStudent working")
//     try {
//         const {
//             PRN,
//             studentName,
//             studentRoll,
//             studentPanel,
//             currentYear,
//             currentSem,
//             studentBatch,
//             studentCourse,
//             studentDOB,
//             phoneNo,
//             studentEmail,
//             studentPassword,
//             totalSubjectCount,
//             emergencyNumber
//         } = req.body;
//         var panel = studentPanel.toUpperCase();
//         //    var  panel=studentPanel.upper;
//         const exists = await Student.findOne({ PRN });


//         if (exists) {
//             const salt = await bcrypt.genSalt(10);
//             const hash = await bcrypt.hash(studentPassword, salt);



//             const updatedFields = {
//                 studentName,
//                 studentRoll,
//                 studentPanel: panel,
//                 currentYear,
//                 currentSem,
//                 studentBatch,
//                 studentCourse,
//                 studentDOB,
//                 phoneNo,
//                 studentEmail,
//                 studentPassword: hash,
//                 totalSubjectCount,
//                 emergencyNumber
//             };


//             // Use findOneAndUpdate to update the document
//             const updatedDocument = await Student.findOneAndUpdate({ PRN }, updatedFields, { new: true });


//             if (updatedDocument) {
//                 res.status(200).json({ updatedDocument, success: true });
//             } else {
//                 res.status(500).json({ error: "Failed to update student.", success: false });
//             }
//         } else {
//             res.status(404).json({ error: `Student with PRN ${PRN} does not exist. Please create the student.`, success: false });
//         }
//     } catch (error) {
//         res.status(500).json({
//             error: "An internal server error occurred while updating the student details: " + error.message,
//             success: false,
//         });
//     }
// });

router.post("/updateStudent", updateStudentValidation, async (req, res) => {

    // console.log("updateStudent working")
    try {
        const {
            PRN,
            studentName,
            studentRoll,
            studentPanel,
            currentYear,
            currentSem,
            studentBatch,
            studentCourse,
            studentDOB,
            phoneNo,
            studentEmail,
            studentPassword,
            totalSubjectCount,
            emergencyNumber
        } = req.body;
        var panel = studentPanel.toUpperCase();
        //    var  panel=studentPanel.upper;
        const exists = await Student.findOne({ PRN });


        if (exists) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(studentPassword, salt);



            const updatedFields = {
                studentName,
                studentRoll,
                studentPanel: panel,
                currentYear,
                currentSem,
                studentBatch,
                studentCourse,
                studentDOB,
                phoneNo,
                studentEmail,
                studentPassword: hash,
                totalSubjectCount,
                emergencyNumber
            };


            // Use findOneAndUpdate to update the document
            const updatedDocument = await Student.findOneAndUpdate({ PRN }, updatedFields, { new: true });


            if (updatedDocument) {
                res.status(200).json({ updatedDocument, success: true });
            } else {
                res.status(500).json({ error: "Failed to update student.", success: false });
            }
        } else {
            res.status(404).json({ error: `Student with PRN ${PRN} does not exist. Please create the student.`, success: false });
        }
    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while updating the student details: " + error.message,
            success: false,
        });
    }
});


router.get("/getAllStudents", async (req, res) => {
    //console.log("getAllStudents working")
    try {

        const student = await Student.find().select("-studentPassword");

        if (!student) {
            res.status(409).json({
                error: `There are no student records. To see student details here please add some students`
            })
        }
        else {
            res.status(200).json({ student, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the student details: " +
                error.message,
            success: false,
        });
    }

})


router.get("/getStudentsFromPanel", getStudentsFromPanelValidation, async (req, res) => {
    // console.log("getStudentsFromPanel working")
    try {
        const { studentPanel } = req.body;

        const student = await Student.find({ studentPanel: studentPanel }).select("-studentPassword");


        if (student == null) {
            res.status(409).json({
                error: `There are no student records. To see student details here please add some students`
            })
        }
        else {
            res.status(200).json({ student, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the student details: " +
                error.message,
            success: false,
        });
    }

})
router.post("/getStudentsFromPRNSubstring", getStudentsFromPRNSubstringValidation, async (req, res) => {
    //  console.log("getStudentsFromPRNSubstring working")
    try {
        const { PRN } = req.body;
        const students = await Student.find();
        const prnString = PRN.toString(); // Convert PRN to a string

        const resultStudents = [];

        for (const student of students) {
            const studentPRNString = student.PRN.toString();
            const prnRegex = new RegExp(`${prnString}`, 'i');

            if (studentPRNString.match(prnRegex)) {
                resultStudents.push(student);
            }
        }

        if (resultStudents.length === 0) {
            res.status(409).json({
                error: "No students found."
            });
        } else {
            res.status(200).json({ students: resultStudents, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while filtering the student details: " + error.message,
            success: false,
        });
    }
});

router.get("/getStudentsFromNameSubstring", getStudentsFromNameSubStringValidation, async (req, res) => {
    // console.log("getStudentsFromNameSubstring working")
    try {
        const { studentName } = req.body;
        const students = await Student.find();
        const anameString = studentName.toString(); // Convert PRN to a string

        const resultStudents = [];

        for (const student of students) {
            const nameString = student.studentName.toString();
            const nameRegex = new RegExp(`${anameString}`, 'i');

            if (nameString.match(nameRegex)) {
                resultStudents.push(student);
            }
        }

        if (resultStudents.length === 0) {
            res.status(409).json({
                error: "No students found."
            });
        } else {
            res.status(200).json({ students: resultStudents, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while filtering the student details: " + error.message,
            success: false,
        });
    }
});


router.delete("/deleteStudent", deleteStudentValidation, async (req, res) => {
    //  console.log("deletetudent working")
    try {
        const { PRN } = req.body;
        let student = await Student.deleteOne({ PRN });
        console.log(PRN)
        if (!student) {
            console.log("Doesn't exist")
            res.status(404).json({ error: `Student with PRN ${PRN}  dosent exist`, success: false });
        }

        journal = await Student.findOneAndDelete(PRN);
        console.log("Deleted")
        res.status(200).json({ message: "Student record deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ error: "An internal server error occurred while deleting the student: " + error.message, success: false, });
    }
});

router.post("/getStudentsFromNameSubstring", async (req, res) => {
    try {
        const { studentName } = req.body;
        const students = await Student.find();
        const anameString = studentName.toString(); // Convert PRN to a string

        const resultStudents = [];

        for (const student of students) {
            const nameString = student.studentName.toString();
            const nameRegex = new RegExp(`${anameString}`, 'i');

            if (nameString.match(nameRegex)) {
                resultStudents.push(student);
            }
        }

        if (resultStudents.length === 0) {
            res.status(409).json({
                error: "No students found."
            });
        } else {
            res.status(200).json({ students: resultStudents, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while filtering the student details: " + error.message,
            success: false,
        });
    }
});


module.exports = router