const express = require("express");
const router = express.Router();
const Result = require("../Models/resultModel");
const Subject = require("../Models/subjectsModel");
const addResultValidation = require("../Validations/resultValidations/addResultValidation");
const updateResultValidation = require("../Validations/resultValidations/updateResultValidation");
const getResultValidation = require("../Validations/resultValidations/getResultValidation");
router.use(express.json());


router.post("/addResult",addResultValidation,async (req, res) => {

//console.log("add result working")

try {

        const { PRN,year,semester,arrayofMarks} = req.body;
        const exists = await Result.findOne({ PRN });

        
        if (exists) {
            res.status(409).json({
                error: `A result for the PRN ${PRN} already exists. 
            Please enter another valid PRN`, success: false
            });
        } else {
            const result = await Result.create({
                PRN,year,semester,arrayofMarks
            });
            res.status(200).json({ success: true });
        }
    } catch (error) {
        res.status(500).json({
            error: `An internal server error occurred while adding result: ` + error.message,
            success: false,
        });
    }
});

router.patch("/updateSubjectResult",updateResultValidation,async(req,res)=>{
   // console.log("update result is working")
    try {
        const { PRN, subjectID}=req.body; 
        let {endterms, midterms, activeLearning, theoryAssignments, labAssignments } = req.body;
    
        const sub=await Subject.findOne({subjectID:subjectID})
        if(sub.endTermsFlag==false){
            endterms=null;
        } 
        if(sub.midTermsFlag==false){
            midterms=null; 
        } 
        if(sub.activeLearningFlag==false){
            activeLearning=null;
        } 
        if(sub.labAssignmentsFlag==false){
            labAssignments=null;
        } 
        if(sub.theoryAssignmentsFlag==false){
            theoryAssignments=null;
        }

        const updateObject = {};
        if (endterms !== undefined) updateObject["arrayofMarks.$.endterms"] = endterms;
        if (midterms !== undefined) updateObject["arrayofMarks.$.midterms"] = midterms;
        if (activeLearning !== undefined) updateObject["arrayofMarks.$.activeLearning"] = activeLearning;
        if (theoryAssignments !== undefined) updateObject["arrayofMarks.$.theoryAssignments"] = theoryAssignments;
        if (labAssignments !== undefined) updateObject["arrayofMarks.$.labAssignments"] = labAssignments;
    
        
        const result = await Result.findOneAndUpdate(
          { PRN: PRN, "arrayofMarks.subjectID": subjectID },
          updateObject,
          { new: true }
        );
    
        if (!result) {
          return res.status(404).json({ error: "Record not found having both the entered PRN and SubjectID", success: false });
        }
    
        return res.status(200).json({ message: "Record updated successfully", success: true, result });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error", success: false });
      }

});

router.post("/getResult",getResultValidation,async (req, res) => {
    //console.log("get result is working")
    try {
        const {PRN,year,semester} = req.body;
        const result = await Result.findOne({PRN:PRN,year:year,semester:semester});
        if(result!=null)
        {
        res.status(200).json({ result, success: true });
        }
        else
        res.status(401).json({error:`There doesnt exists any Result with the entered parameters .Please enter valid parameters `,success:false});
    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the result details: " +
                error.message,
            success: false,
        });
    }
});



module.exports = router;