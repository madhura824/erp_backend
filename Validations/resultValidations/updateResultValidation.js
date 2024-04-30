const Subject = require("../../Models/subjectsModel");
const Student= require("../../Models/studentModel");


const updateResultValidation = async (req, res, next) => {
    // console.log("update result val working")
    // next()
    try {
        const { PRN, subjectID,endterms, midterms, activeLearning, theoryAssignments, labAssignments } = req.body;


        const checksubid= await Subject.findOne({subjectID:subjectID});
        const checkprn= await Student.findOne({PRN:PRN});

        if(PRN==null||subjectID==null)
        {
            res.status(500).json({ error: "PRN and/or subjectID can't be null", success: false });    
        }
         else if(!checkprn)
        {
            res.status(500).json({ error: "Entered PRN doesn't exists.Enter Valid PRN", success: false });    
        }
        else if(!checksubid)
        {
            res.status(500).json({ error: "Entered subjectID doesn't exists.Enter Valid subjectID", success: false });    
        }
        else if(endterms < 0 || endterms > 200) {
        res.status(400).json({ error: "End Term marks must be between 0 and 200", success: false });
        
        } else if(midterms < 0 || midterms > 200) {
        res.status(400).json({ error: "Mid Term marks must be between 0 and 200", success: false });
        
        } else if(activeLearning < 0 || activeLearning > 200) {
        res.status(400).json({ error: "Active Learning marks must be between 0 and 200", success: false });
        
        } else if(theoryAssignments < 0 || theoryAssignments > 200) {
        res.status(400).json({ error: "Theory Assignments marks must be between 0 and 200", success: false });
        
        } else if(labAssignments < 0 || labAssignments > 200) {
        res.status(400).json({ error: "Lab Assignments marks must be between 0 and 200", success: false });
        } 
        else if( checksubid.labAssignmentsFlag==true && labAssignments >checksubid.maxLabAssignmentMarks) {
            res.status(400).json({ error: "Entered Lab Assignment marks exceeding Max Lab assignment marks for the subject", success: false });
            }
        else if(checksubid.theoryAssignmentsFlag==true && theoryAssignments >checksubid.maxTheoryAssignmentMarks) {
            res.status(400).json({ error: "Entered Theory Assignment marks exceeding Max Lab assignment marks for the subject", success: false });
            }
        else if(checksubid.activeLearningFlag==true && activeLearning >checksubid.maxActiveLearningMarks) {
        res.status(400).json({ error: "Entered Active learning marks exceeding Max Lab assignment marks for the subject", success: false });
        }  
        else if(checksubid.midTermsFlag==true && midterms >checksubid.maxMidTermMarks) {
            res.status(400).json({ error: "Entered Mid Terms marks exceeding Max Lab assignment marks for the subject", success: false });
            }
        else if(checksubid.endTermsFlag==true && endterms >checksubid.maxEndTermMarks) {
            res.status(400).json({ error: "Entered End Terms marks exceeding Max Lab assignment marks for the subject", success: false });
            }        
        else {
            next();
        }



    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while updating the subject's details.", success: false });
    }
};

module.exports = updateResultValidation;