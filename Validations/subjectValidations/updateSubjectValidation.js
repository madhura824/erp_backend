

const updateSubjectValidation = async (req, res, next) => {
    // console.log("updateSubjectValidation working")
    // next()
    try {
        const {subjectID,subjectNameShort,subjectNameLong,subjectType,endTermsFlag,midTermsFlag,activeLearningFlag,theoryAssignmentsFlag,labAssignmentsFlag,
            maxEndTermMarks,maxMidTermMarks,maxActiveLearningMarks,maxTheoryAssignmentMarks,maxLabAssignmentMarks,
            numberOfLabSessionsPerWeek,numberOfTheorySessionsPerWeek} =req.body;

            
            
        if (subjectNameLong == null || subjectNameShort == null || subjectType == null || numberOfLabSessionsPerWeek == null || 
            numberOfTheorySessionsPerWeek == null || endTermsFlag == null || midTermsFlag == null || activeLearningFlag == null || 
            theoryAssignmentsFlag == null || labAssignmentsFlag == null) {
            res.status(400).json({ error: "The request body doesn't contain all the fields that are required to update the journal's details.", success: false });
        } else if (subjectNameShort.length < 2 || subjectNameShort.length > 20) {
            res.status(400).json({ error: "subjectNameShort must be between 0 and 20 characters", success: false });
        } else if (subjectNameLong.length < 10 || subjectNameLong.length > 70) {
            res.status(400).json({ error: "subjectNameLong must be between 10 and 70 characters", success: false });
        } else if (subjectType !== "Theory" && subjectType !== "Practical" && subjectType !== "Both" ) {
            res.status(400).json({ error: "subjectType must be Theory,Practical or Both only.", success: false });
        } else if (numberOfLabSessionsPerWeek < 0 || numberOfLabSessionsPerWeek > 30) {
            res.status(400).json({ error: "numberOfLabSessions must be between 0 and 30", success: false });
        } else if (numberOfTheorySessionsPerWeek < 0 || numberOfTheorySessionsPerWeek > 30) {
            res.status(400).json({ error: "numberOfTheorySessions must be between 0 and 30", success: false });
        } else if (maxEndTermMarks < 0 || maxEndTermMarks > 200) {
            res.status(400).json({ error: "maxEndTermMarks must be between 0 and 200", success: false });
        } else if (maxMidTermMarks < 0 || maxMidTermMarks > 200) {
            res.status(400).json({ error: "maxMidTermMarks must be between 0 and 200", success: false });
        } else if (maxActiveLearningMarks < 0 || maxActiveLearningMarks > 200) {
            res.status(400).json({ error: "maxActiveLearningMarks must between 0 and 200", success: false });
        } else if (maxLabAssignmentMarks < 0 || maxLabAssignmentMarks > 200) {
            res.status(400).json({ error: "maxLabAssignment must be between 0 and 200", success: false });
        } else if (maxTheoryAssignmentMarks < 0 || maxTheoryAssignmentMarks > 200) {
            res.status(400).json({ error: "maxTheoryAssignments must be between 0 and 200", success: false });
        } else if(endTermsFlag==true && maxEndTermMarks==null) {
            res.status(400).json({ error: "maxEndTermMarks cannot be null if flag is active", success: false });
        } else if(midTermsFlag==true && maxMidTermMarks==null) {
            res.status(400).json({ error: "maxMidTermMarks cannot be null if flag is active", success: false });
        } else if(activeLearningFlag==true && maxActiveLearningMarks==null) {
            res.status(400).json({ error: "maxActiveLearningMarks cannot be null if flag is active", success: false });
        } else if(theoryAssignmentsFlag==true && maxTheoryAssignmentMarks==null) {
            res.status(400).json({ error: "maxTheoryAssignmentMarks cannot be null if flag is active", success: false });
        } else if(labAssignmentsFlag==true && maxLabAssignmentMarks==null) {
            res.status(400).json({ error: "maxLabAssignmentMarks cannot be null if flag is active", success: false });
        }  else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while updating the subject's details.", success: false });
    }
};

module.exports = updateSubjectValidation;
