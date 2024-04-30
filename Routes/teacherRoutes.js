const express = require("express");
const router = express.Router();
const Teacher = require("../Models/teacherModel");
const updateTeacherValidation = require("../Validations/teacherValidations/updateTeacherValidation");
//const addTeacherValidation = require("../Validations/teacherValidations/addTeacherValidation");
const getTeacherValidation = require("../Validations/teacherValidations/getTeacherValidation");
const deleteTeacherValidation = require("../Validations/teacherValidations/deleteTeacherValidation");
const addTeacherValidation = require("../Validations/teacherValidations/addTeacherValidations");
const bcrypt = require("bcrypt");

router.use(express.json());

router.post("/addTeacher", addTeacherValidation, async (req, res) => {
    try {

        const { teacherID, name, specialization, designation, DOB, phoneNo, email, password } = req.body;
        const exists = await Teacher.findOne({ teacherID });
        if (exists) {
            res.status(409).json({ error: `Another teacher with teacherID ${teacherID} already exists. Please use another teacherID.`, success: false });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const user = await Teacher.create({ teacherID, name, specialization, designation, DOB, phoneNo, email, password: hash });
            res.status(200).json({ teacherID, success: true });  //  { success: true };
        }
    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while adding the teacher: " + error.message,
            success: false,
        });
    }
});

router.post("/updateTeacher", updateTeacherValidation, async (req, res) => {
    try {
        const { teacherID, name, specialization, designation, DOB, phoneNo, email, password
        } = req.body;

        const existingTeacher = await Teacher.findOne({ teacherID });
        if (existingTeacher) {
            let hash;
            if (!password) {
                hash = existingTeacher.hash;
            }

            else {
                const salt = await bcrypt.genSalt(10);
                hash = await bcrypt.hash(password, salt);

                // Create an object containing the fields to be updated

            }
            const updatedFields = {
                name, specialization, designation, DOB, phoneNo, email, password: hash
            };
            // Use findOneAndUpdate to update the document
            const updatedDocument = await Teacher.findOneAndUpdate(
                { teacherID },
                updatedFields,
                { new: true }
            );

            if (updatedDocument) {
                res.status(200).json({ teacherID, success: true });
            } else {
                res.status(500).json({ error: "Failed to update teacher.", success: false });
            }
        } else {
            res.status(404).json({
                error: `Teacher with teacherID ${teacherID} does not exist. Please create the teacher.`,
                success: false
            });
        }
    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while updating the teacher details: " +
                error.message,
            success: false,
        });
    }
});
router.get("/getTeacher/:teacherID", getTeacherValidation, async (req, res) => {
    try {
        const teacherID = req.params.teacherID;
        // Use the correct method to find a teacher by their ID
        const teacher = await Teacher.findOne({ teacherID }).select("-password");

        if (teacher) {
            res.status(200).json({ teacher, success: true });
        } else {
            res.status(404).json({ success: false, message: "Teacher not found" });
        }
    } catch (error) {
        console.error("Error fetching teacher details:", error);
        res.status(500).json({
            error: "An internal server error occurred while fetching the user details: " + error.message,
            success: false,
        });
    }
});

router.get("/getAllTeachers", async (req, res) => {
    try {

        const teacher = await Teacher.find().select("-password");;

        if (!teacher) {
            res.status(409).json({
                error: `There are no teacher records. To see teacher details here please add some teachers`
            })
        }
        else {
            res.status(200).json({ teacher, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the teacher details: " +
                error.message,
            success: false,
        });
    }

})


router.delete("/deleteTeacher", deleteTeacherValidation, async (req, res) => {
    try {
        const { teacherID } = req.body;
        let teacher = await Teacher.deleteOne({ teacherID });

        if (!teacher) {
            res.status(404).json({ error: `Teacher with ID  ${teacherID}  dosent exist`, success: false });
        }

        else {
            res.status(200).json({ message: "Teacher record deleted successfully", success: true });
        }

    } catch (error) {
        res.status(500).json({ error: "An internal server error occurred while deleting the teacher: " + error.message, success: false, });
    }
});


router.post("/getTeachersFromIDSubString", async (req, res) => {
    try {
        const { teacherID } = req.body;
        const teachers = await Teacher.find();
        const idString = teacherID.toString(); // Convert PRN to a string

        const resultTeachers = [];

        for (const teacher of teachers) {
            const teacherIDstring = teacher.teacherID.toString();
            const idRegex = new RegExp(`$ {idString}`, 'i');

            if (teacherIDstring.match(idRegex)) {
                resultTeachers.push(teacher);
            }
        }

        if (resultTeachers.length === 0) {
            res.status(409).json({
                error: "No Teacher found."
            });
        } else {
            res.status(200).json({ teachers: resultTeachers, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while filtering the teacher details: " + error.message,
            success: false,
        });
    }
});

router.post("/getTeachersFromNameSubString", async (req, res) => {
    try {
        const { name } = req.body;
        const teachers = await Teacher.find();
        const nameString = name.toString(); // Convert PRN to a string

        const resultTeachers = [];

        for (const teacher of teachers) {
            const teacherNamestring = teacher.name.toString();
            const nameRegex = new RegExp(`${nameString}`, 'i');

            if (teacherNamestring.match(nameRegex)) {
                resultTeachers.push(teacher);
            }
        }

        if (resultTeachers.length === 0) {
            res.status(409).json({
                error: "No Teacher found."
            });
        } else {
            res.status(200).json({ teachers: resultTeachers, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while filtering the teacher details: " + error.message,
            success: false,
        });
    }
});
module.exports = router;