const Subject = require("../../Models/subjectsModel");
const Student= require("../../Models/studentModel");


const addResultValidation=async(req,res,next)=>{
    // console.log("add result val is wroking")
    // next()
    try {
        let flag=true;
        let etchk,mtchk,alchk,tachk,lachk;
        const { PRN,year,semester,arrayofMarks} = req.body;
        for(i=0;i<arrayofMarks.length;i++)
        {
            sid=String(arrayofMarks[i].subjectID);
            
                const checksubid=await Subject.findOne({ subjectID:sid });
                if(!checksubid)
                {
                    flag=false;
                    break;
                }
                else
                {
                    if(checksubid.midTermsFlag==false)
                    {
                        req.body.arrayofMarks[i].midterms=null;
                    }
                    if(checksubid.endTermsFlag==false)
                    {
                        arrayofMarks[i].endterms=null;
                    }
                    if(checksubid.activeLearningFlag==false)
                    {
                        arrayofMarks[i].activeLearning=null;
                    }
                    if(checksubid.labAssignmentsFlag==false)
                    {
                        arrayofMarks[i].labAssignments=null;
                    }
                    if(checksubid.theoryAssignmentsFlag==false)
                    {
                        arrayofMarks[i].theoryAssignments=null;
                    }
                    if( checksubid.maxEndTermMarks!= null && req.body.arrayofMarks[i].endterms > checksubid.maxEndTermMarks)
                    {
                        etchk=false;
                        break;
                    }
                    if( checksubid.maxMidTermMarks!= null && req.body.arrayofMarks[i].midterms > checksubid.maxMidTermMarks)
                    {
                        mtchk=false;
                        break;
                    }
                    if( checksubid.maxActiveLearningMarks!= null && req.body.arrayofMarks[i].activeLearning > checksubid.maxActiveLearningMarks)
                    {
                        alchk=false;
                        break;
                    }
                    if( checksubid.maxTheoryAssignmentMarks!= null && req.body.arrayofMarks[i].theoryAssignments > checksubid.maxTheoryAssignmentMarks)
                    {
                        tachk=false;
                        break;
                    }
                    if( checksubid.maxLabAssignmentMarks!= null && req.body.arrayofMarks[i].labAssignments > checksubid.maxLabAssignmentMarks)
                    {
                        lachk=false;
                        break;
                    }
                    
                }   
        }
        
        const checkprn=await Student.findOne({PRN});

    if(PRN==null ||year==null ||semester==null ||arrayofMarks==null)
    {  
        res.status(400).json({ error: "The request body doesn't contain all the fields that are required to add result of a student.", success: false });
        
    } else if(PRN < 1000000000 || PRN>9999999999) {
        res.status(400).json({ error: "PRN must be a 10-digit number", success: false });
        
    } else if(!checkprn){
        res.status(400).json({error:"Entered PRN doesn't exists ,enter a valid PRN",success:false});
    } else if(year < 1 || year>9999) {
        res.status(400).json({ error: "Enter a Valid Year", success: false });
        
    } else if(semester < 1 || semester>20) {
        res.status(400).json({ error: "Semester must be between 1 and 20", success: false });
        
    } else if((Array.isArray(arrayofMarks))==false || (arrayofMarks.every(item => typeof item !== 'object'))) {
        res.status(400).json({ error: "ArrayofMarks field cannot be empty or non-object type", success: false });
        
    }else if(flag==false) {
        res.status(400).json({ error: `Entered subject ${arrayofMarks[i].subjectID} doesn't exist please enter a valid Subject ID `, success: false });
        
    } else if(mtchk==false) {
        res.status(400).json({ error: `Entered Mid Terms marks for subject ${arrayofMarks[i].subjectID} exceeding max marks for given subject `, success: false });
        
    } else if(etchk==false) {
        res.status(400).json({ error: `Entered End Terms marks for subject ${arrayofMarks[i].subjectID} exceeding max marks for given subject `, success: false });
        
    } else if(alchk==false) {
        res.status(400).json({ error: `Entered Active Learning marks for subject ${arrayofMarks[i].subjectID} exceeding max marks for given subject `, success: false });
        
    } else if(tachk==false) {
        res.status(400).json({ error: `Entered Theory Assignment marks for subject ${arrayofMarks[i].subjectID} exceeding max marks for given subject `, success: false });
        
    } else if(lachk==false) {
        res.status(400).json({ error: `Entered Lab Assignment marks for subject ${arrayofMarks[i].subjectID} exceeding max marks for given subject `, success: false });
        
    } else {
        next();
    }

    



    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while adding the new record.", success: false });
    }
};

module.exports = addResultValidation;