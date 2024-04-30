const express = require("express");
const router = express.Router();
const cors = require("cors");
const Subject = require("../Models/subjectsModel");
const addSubjectValidation = require("../Validations/subjectValidations/addSubjectValidation");
const updateSubjectValidation = require("../Validations/subjectValidations/updateSubjectValidation");
const deleteSubjectValidations = require("../Validations/subjectValidations/deleteSubjectValidation")
router.use(cors());


router.use(express.json());

router.post("/addSubject", addSubjectValidation, async (req, res) => {
    // console.log("add subject working")


    try {
        const { subjectNameShort, subjectID, subjectNameLong, subjectType, endTermsFlag, midTermsFlag, activeLearningFlag,
            theoryAssignmentsFlag, labAssignmentsFlag, maxEndTermMarks, maxMidTermMarks, maxActiveLearningMarks,
            maxTheoryAssignmentMarks, maxLabAssignmentMarks, numberOfLabSessionsPerWeek, numberOfTheorySessionsPerWeek, } = req.body;

        console.log(req.body)

        const exists = await Subject.findOne({ subjectNameShort });
        if (exists) {
            res.status(409).json({
                error: `Another subject with subject name ${subjectNameShort} already exists. 
            Please use another subject name`, success: false
            });
        } else {
            const subject = await Subject.create({
                subjectID, subjectNameShort, subjectNameLong, subjectType, endTermsFlag, midTermsFlag, activeLearningFlag, theoryAssignmentsFlag, labAssignmentsFlag, maxEndTermMarks, maxMidTermMarks,
                maxActiveLearningMarks, maxTheoryAssignmentMarks, maxLabAssignmentMarks, numberOfLabSessionsPerWeek, numberOfTheorySessionsPerWeek
            });
            res.status(200).json({ success: true, subject: subject });
        }
    } catch (error) {
        res.status(500).json({
            error: `An internal server error occurred while adding subject: ` + error.message,
            success: false,
        });
    }
});


router.post("/updateSubject", updateSubjectValidation, async (req, res) => {
    //console.log("update subject working")

    try {

        const { subjectNameShort, subjectID, subjectNameLong, subjectType, endTermsFlag, midTermsFlag, activeLearningFlag,
            theoryAssignmentsFlag, labAssignmentsFlag, numberOfLabSessionsPerWeek, numberOfTheorySessionsPerWeek } = req.body;

        let { maxEndTermMarks, maxMidTermMarks, maxActiveLearningMarks,
            maxTheoryAssignmentMarks, maxLabAssignmentMarks } = req.body;

        const subject_ = await Subject.findOne({ subjectID });
        if (subject_) {
            if (endTermsFlag == false) {
                maxEndTermMarks = null;
            }
            if (midTermsFlag == false) {
                maxMidTermMarks = null;
            }
            if (activeLearningFlag == false) {
                maxActiveLearningMarks = null;
            }
            if (labAssignmentsFlag == false) {
                maxLabAssignmentMarks = null;
            }
            if (theoryAssignmentsFlag == false) {
                maxTheoryAssignmentMarks = null;
            }
            const subject = await Subject.findOneAndUpdate({ subjectID }, {
                subjectNameShort, subjectNameLong, subjectType, endTermsFlag, midTermsFlag, activeLearningFlag,
                theoryAssignmentsFlag, labAssignmentsFlag, maxEndTermMarks, maxMidTermMarks, maxActiveLearningMarks,
                maxTheoryAssignmentMarks, maxLabAssignmentMarks, numberOfLabSessionsPerWeek, numberOfTheorySessionsPerWeek
            });
            res.status(200).json({ subject: subject, success: true });
        } else {
            res.status(409).json({ error: `Subject with subjectID ${subjectID} doesn't exists. Please provide another subjectID to be updated`, success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "An internal server error occurred while updating subject details: " + error.message,
            success: false,
        });
    }
});

router.get("/getSubject/:subjectID", async (req, res) => {
    //console.log("get subject by id working")
    try {

        const subjectID = req.params.subjectID;

        if (subjectID == null || subjectID == "") {

            res.status(404).json({ error: `Subject ID field cannot be empty `, success: false });
        }
        else if (subjectID.length > 50 || subjectID.length < 1) {
            res.status(404).json({ error: `Length Exceeding (maximum 50 characters)`, success: false });

        }
        // const subjectID="Subject1"
        const subject = await Subject.findOne({ subjectID });


        if (subject) {
            res.status(200).json({ subject, success: true });
        }
        else
            res.status(404).json({ error: `There doesnt exists any Subject with the entered parameters .Please enter valid parameters `, success: false });
    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the subject details: " +
                error.message,
            success: false,
        });
    }
});

router.delete("/deleteSubject", async (req, res) => {
    try {
        const { subjectID } = req.body;

        let subject = await Subject.deleteOne({ subjectID });

        if (!subject) {
            res.status(404).json({ error: `Subject with ID  ${subjectID}  dosent exist`, success: false });
        }

        else {
            res.status(200).json({ message: "Subject record deleted successfully", success: true });
        }

    } catch (error) {
        res.status(500).json({ error: "An internal server error occurred while deleting the Subject: " + error.message, success: false, });
    }
});


router.get("/getAllSubjects", async (req, res) => {
    // console.log("get all subjects working")
    try {

        const subjects = await Subject.find();

        if (!subjects) {
            res.status(409).json({
                error: `There are no subject records. To see subject details here please add some subjects`
            })
        }
        else {
            res.status(200).json({ subjects, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the subjects details: " +
                error.message,
            success: false,
        });
    }

})


router.post("/getSubjectFromIDSubstring", async (req, res) => {
    try {
        const { subjectID } = req.body;
        const subjects = await Subject.find();
        const id1String = subjectID.toString(); // Convert PRN to a string

        const resultSubjects = [];

        for (const subject of subjects) {
            const idString = subject.subjectID.toString();
            const idRegex = new RegExp(`${id1String}`, 'i');

            if (idString.match(idRegex)) {
                resultSubjects.push(subject);
            }
        }

        if (resultSubjects.length === 0) {
            res.status(409).json({
                error: "No subjects found."
            });
        } else {
            res.status(200).json({ subjects: resultSubjects, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while filtering the subject details: " + error.message,
            success: false,
        });
    }
});

router.post("/getSubjectFromNameSubstring", async (req, res) => {
    try {
        const { subjectNameLong } = req.body;
        const subjects = await Subject.find();
        const id1String = subjectNameLong.toString(); // Convert PRN to a string

        const resultSubjects = [];

        for (const subject of subjects) {
            const idString = subject.subjectNameLong.toString();
            const idRegex = new RegExp(`${id1String}`, 'i');

            if (idString.match(idRegex)) {
                resultSubjects.push(subject);
            }
        }

        if (resultSubjects.length === 0) {
            res.status(409).json({
                error: "No subjects found."
            });
        } else {
            res.status(200).json({ subjects: resultSubjects, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while filtering the subject details: " + error.message,
            success: false,
        });
    }
});

module.exports = router;