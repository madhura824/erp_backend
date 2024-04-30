const express = require("express");
const router = express.Router();
const Student = require("../Models/studentModel");
const bcrypt = require("bcrypt");
const Course = require("../Models/courseModel")
const cbcsModel=require("../Models/cbcsPanelModel")
const createCBCSValidation=require("../Validations/CBCSValidations/createCBCSValidation")
const Panel = require("../Models/panelModelNew");

router.use(express.json());
router.post("/cbcsEligibility", async (req, res) => {
    //console.log("eligibility working")
    try {
        const {PRN} = req.body;

        if(PRN==null ){
            res.status(500).json({
                error: "Require a PRN " + error.message,
                success: false,
            });
        }
        else if (PRN < 1000000000 || PRN > 9999999999) {
            res.status(400).json({ error: "PRN must be between 1000000000 and 9999999999", success: false });
        }
       
        const yearSemDetails=await Student.findOne({PRN})

        if(yearSemDetails==null){
            res.status(500).json({
                error: `No Records found for student with prn ${PRN}` ,
                success: false,
            });
        }else{

        var year=yearSemDetails.currentYear;
        var semester=yearSemDetails.currentSem;
        var courseName=yearSemDetails.studentCourse;

        const record = await cbcsModel.findOne({ year, semester, courseType: courseName });

if (record) {
    const hasDoneCBCS = record.remainingStudents.indexOf(PRN);
console.log("has done cbcs "+hasDoneCBCS)
    if (hasDoneCBCS!=-1 ) {
            if(record.isActive == true){
                res.status(200).json({ year, semester,courseName, success: true, eligible: true });
            }
            else{
                res.status(409).json({ error: `Year ${year} Semester ${semester} does not have an active CBCS.`, success: false });
            }
        }
        else{
            res.status(409).json({ error: `Student has finished CBCS`, success: false });
        }
        } 
        else {
            res.status(409).json({ error: `Year ${year} Semester ${semester} does not exist.`, success: false });
        }
    
}
    }
    catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while checking CBCS eligibility for the student: " + error.message,
            success: false,
        });
    }
});



router.post("/createCbcs",createCBCSValidation, async (req, res) => {
    //console.log(await Panel.find())
    try {
        const { year,sem,semStart,semEnd,courseType } = req.body;
        //aajchya year la match hotay ka   middleware 
        //sem validations  //ithe
        var lastsem = sem - 1;

        // Check if lastsem is a valid number
        if(sem==1){
            lastsem = 1;
        }
        else if (isNaN(lastsem) || lastsem < 1 || lastsem > 20) {
            return res.status(400).json({
                error: "Invalid value for last semester",
                success: false,
            });
        }

        const panels = await Panel.findOne({ currentYear: year, currentSem: lastsem, courseType: courseType });

        if (!panels) {
            return res.status(400).json({
                error: "No panel found",
                success: false,
            });
        }
        const fullDate = panels.semEndDate;
        const dateObject = new Date(fullDate);

        const dateyear = dateObject.getFullYear();
        const datemonth = ('0' + (dateObject.getMonth() + 1)).slice(-2);  // Adding 1 because months are zero-based
        const dateday = ('0' + dateObject.getDate()).slice(-2);

        const formattedDate = `${dateyear}-${datemonth}-${dateday}`;
        //console.log(formattedDate)
        //console.log(typeof (formattedDate))
        //console.log(typeof (semStart))

        if (semStart > formattedDate) {

            const course = await Course.findOne({ courseName: courseType });


            if (!course) {
                return res.status(400).json({
                    error: `No course found of the mentioned type.:  ${courseType}`,
                    success: false,
                });
            } else {

                var noOfSemsInCourse = course.totalSemesters;
     
               // console.log( noOfSemsInCourse)
                 if (sem <= noOfSemsInCourse) {
                    //console.log("yay its working")
                    //find no of students for year sem and course  //current  sem 
                    const panels = await Panel.find({ currentYear: year, currentSem: lastsem, courseType: courseType });
                    if (!panels) {
                        return res.status(400).json({
                            error: `The semester you are trying to open CBCS for in invalid for course ${courseType}`,
                            success: false,
                        });
                    }
                    //console.log(panels)
                    var noOfStudents = await Student.countDocuments({ currentYear: year, currentSem: sem, studentCourse: courseType })

                   

                    var students = await Student.find({ currentYear: year, currentSem: sem, studentCourse: courseType });

                    // Extract PRN fields from each document and create a list
                    var prnList = students.map(student => student.PRN);
                                     //   console.log(students)

                    // console.log(count)
                    // console.log({ currentYear: year, currentSem: sem, studentCourse: courseType })
                
               // var noOfStudents=300
                    console.log("noofstudents"+noOfStudents)
                let panelStrength = []
                let noOfPanels = Math.ceil(noOfStudents / 60);
                for (i = noOfPanels; i > 0; i--) {
                    panelStrength.push(Math.ceil(noOfStudents / i));
                    noOfStudents -= Math.ceil(noOfStudents/i);

        }
        var remainingSeats=[]
for(var i=0;i<noOfPanels;i++){
   
    remainingSeats.push(60-panelStrength[i])
}
                var createdCBCS=await cbcsModel.create({year:year,semester: sem,courseType: courseType,remainingSeats: remainingSeats,isActive:true,remainingStudents:prnList })  
          //  console.log(createdCBCS)
                    for(var i=0;i<noOfPanels;i++){
                       var Panelname=String.fromCharCode(i+65)
                        console.log(Panelname)
                        const newcreatedPanel=await Panel.create({"panelName": Panelname, courseType:courseType, studentList:[],subDetails:[],currentYear:year,currentSem:sem,semStartDate:semStart,semEndDate:semEnd})

                        if(!newcreatedPanel){
                            return res.status(400).json({
                                error: `Error in creating panels after CBCS`,
                                success: false,
                            });
                        }
                        console.log(newcreatedPanel)
                    }
                    
                }
                else {
                    // console.log(lastsem)
                    return res.status(400).json({
                        error: `The semester you are trying to open CBCS for in invalid for course ${courseType}`,
                        success: false,
                    });
                }
            }

        }
        else {
            return res.status(400).json({
                error: `Previous semester has not yet ended. It ends on ${formattedDate}`,
                success: false,
            });
        }

        //console.log(panels);

        if (!panels) {
            return res.status(400).json({
                error: "No panels found for the specified criteria",
                success: false,
            });
        }


        res.status(200).json({
            success: true,
            cbcs:createdCBCS ,
        });
    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while starting cbcs(1): " + error.message,
            success: false,
        });
    }
});




router.post("/addStudentToPanel", async (req, res) => {
    try {
        const { panelName, PRN, currentYear, currentSem ,courseType } = req.body;  //added course type require for chcking data in cbcs 
        const exists = await Panel.findOne({ panelName, currentYear, currentSem });

        if (exists) {
            const newStudent = { PRN, studentRoll: null, attendance: [] };
            const user = await Panel.findOneAndUpdate( 
                { panelName, currentYear, currentSem  },     //where
                { $push: { studentList: newStudent } },     
                { new: true }
            );
                console.log("user: "+user)
            try{
                
                const exists1 = await cbcsModel.findOne({ year: currentYear, semester: currentSem, courseType: courseType });

if (exists1) {
    var panelNumber = panelName.charCodeAt(0) - 65;

    console.log(`Value before update: ${exists1.remainingSeats[panelNumber]}`);

    const user = await cbcsModel.findOneAndUpdate(
        { year: currentYear, semester: currentSem, courseType: courseType },
        { $set: { [`remainingSeats.${panelNumber}`]: exists1.remainingSeats[panelNumber] - 1 } },
        { new: true }
    );

    console.log(user);

    //to remove that student from the remaining students list from the corresponding record in cbcsModel

    const cbcsData = await cbcsModel.findOne({ year: currentYear, semester: currentSem, courseType: courseType });

if (!cbcsData) {
    res.status(409).json({ error: `Record found in panel but not in CBCS data`, success: false });
} else {
    var updatedRemainingStudents = [];
    for (var i = 0; i < cbcsData.remainingStudents.length; i++) {
        if (cbcsData.remainingStudents[i] !== PRN) {
            updatedRemainingStudents.push(cbcsData.remainingStudents[i]);
        }
    }

    const updatedCbcsData = await cbcsModel.findOneAndUpdate(
        { year: currentYear, semester: currentSem, courseType: courseType },
        { $set: { remainingStudents: updatedRemainingStudents } },
        { new: true }
    );

    console.log(updatedCbcsData);
}

//as the panel is assigned we need to update it in the students schema as well
const updatedStudent = await Student.findOneAndUpdate(
    { PRN: PRN },
    { $set: { studentPanel: panelName } },
    { new: true }
  );

  console.log("Update panel for student"+updatedStudent.studentPanel)
}
                else{
                    res.status(409).json({ error: `Year ${currentYear} Sem ${currentSem} does not exist.`, success: false });
                }
            }
            catch (error){
                res.status(500).json({
                    error: "An internal server error occurred while updating available seats for the semester " + error.message,
                    success: false,
                });
            }

            res.status(200).json({ panelName, currentYear, currentSem, success: true });  //  { token, success: true };

            

        } 
        else {
            res.status(409).json({ error: `${panelName} does not exist.`, success: false });
        }

    } 
    catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while adding the student to panel: " + error.message,
            success: false,
        });
    }
});



module.exports = router;
