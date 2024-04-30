const express = require("express");
const router = express.Router();
const cors = require("cors");
const Course = require("../Models/courseModel");
const addCourseValidation = require("../Validations/courseValidations/addCourseValidation");
const updateCourseValidation = require("../Validations/courseValidations/updateCourseValidation")
const getCourseValidation = require("../Validations/courseValidations/getCourseValidation")
const deleteCourseValidation = require("../Validations/courseValidations/deleteCourseValidation")
router.use(express.json());
router.use(cors());


router.post("/addCourse", addCourseValidation, async (req, res) => {
    // console.log("add course working")
    try {
        const { courseName, totalYears, totalSemesters } = req.body


        const exists = await Course.findOne({ courseName });

        if (exists) {
            res.status(409).json({ error: `Another course with name ${courseName} already exists. Please use another course name.`, success: false });
        } else {
            const user = await Course.create({ courseName, totalYears, totalSemesters });
            res.status(200).json({ courseName, success: true });  //  { token, success: true };
        }
    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while adding the course: " + error.message,
            success: false,
        });
    }
});

router.post("/updateCourse", updateCourseValidation, async (req, res) => {
    // console.log("update courses working")
    try {
        const { courseName, totalYears, totalSemesters } = req.body;
        const exists = await Course.findOne({ courseName });

        if (exists) {
            const updatedFields = { courseName, totalYears, totalSemesters };
            const updatedDocument = await Course.findOneAndUpdate({ courseName }, updatedFields, { new: true });
            if (updatedDocument) {
                res.status(200).json({ courseName, success: true });
            } else {
                res.status(500).json({ error: "Failed to update course.", success: false });
            }
        }
        else {
            res.status(404).json({ error: `Course with name ${courseName} does not exist.`, success: false });
        }
    }
    catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while updating the course: " + error.message,
            success: false,
        });
    }
});

router.post("/getCourse", getCourseValidation, async (req, res) => {
    // console.log("get course working")
    try {

        const courseName = req.body.courseName
        const course = await Course.findOne({ courseName });

        if (course) {
            res.status(200).json({ courseName: course.courseName, totalYears: course.totalYears, totalSemesters: course.totalSemesters, success: true });
        }
        else
            res.status(404).json({ error: `There doesnt exists any Course with the entered parameters .Please enter valid parameters `, success: false });
    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the course details: " +
                error.message,
            success: false,
        });
    }
});


router.get("/getAllCourses", async (req, res) => {
    //console.log("get all coursees working")
    try {

        const courses = await Course.find();

        if (!courses) {
            res.status(409).json({
                error: `There are no course records. To see course details here please add some courses`
            })
        }
        else {
            res.status(200).json({ courses, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the courses details: " +
                error.message,
            success: false,
        });
    }

})



router.delete("/deleteCourse", deleteCourseValidation, async (req, res) => {
    // console.log("delete course working")
    try {
        const { courseName } = req.body;

        let course = await Course.deleteOne({ courseName });

        if (!course) {
            res.status(404).json({ error: `Course with ID  ${courseName}  doesn't exist`, success: false });
        }

        else {
            res.status(200).json({ message: "Course record deleted successfully", success: true });
        }

    } catch (error) {
        res.status(500).json({ error: "An internal server error occurred while deleting the Course: " + error.message, success: false, });
    }
});

router.post("/getCourseFromNameSubstring", async (req, res) => {
    try {
        const { courseName } = req.body;
        const courses = await Course.find();
        const id1String = courseName.toString(); // Convert PRN to a string

        const resultCourses = [];

        for (const course of courses) {
            const idString = course.courseName.toString();
            const idRegex = new RegExp(`${id1String}`, 'i');

            if (idString.match(idRegex)) {
                resultCourses.push(course);
            }
        }

        if (resultCourses.length === 0) {
            res.status(409).json({
                error: "No courses found."
            });
        } else {
            res.status(200).json({ courses: resultCourses, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while filtering the course details: " + error.message,
            success: false,
        });
    }
});

module.exports = router;