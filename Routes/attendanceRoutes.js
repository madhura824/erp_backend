const express = require("express");
const router = express.Router();
const Attendance = require("../models/attendanceModel");
const Panels = require("../models/panelsModel");


router.use(express.json());

router.post("/addAttendance", async (req, res) => {
    try {
        const { panelName, subjectID, year, semester, slotDetails } = req.body;

        const exists = await Attendance.findOne({ panelName: panelName, slotDetails: { date: req.body.date}});

        if (exists) {
            return res.status(409).json({ error: 'Attendance for this panel${panelName} is already taken for this date .', success: false });
        } else {
            const user = await Attendance.create({ panelName, subjectID, year, semester, slotDetails });


            
            // Create a query to find a record in the Panels collection
            const panelQuery = {
              panelName: user.panelName,
              'subDetails.subjectID': user.subjectID
            };
            
            // Find the record in the Panels collection
            const panelToUpdate = await Panels.findOne(panelQuery);
            
            if (panelToUpdate) {







              // The record matching the panelName and subjectID was found
             

//if panel is found

const subDetail = panelToUpdate.subDetails.find(detail => detail.subjectID === user.subjectID);

//-------------------------------------------------------------------second logic
// Assuming you have the user object and panelToUpdate as you mentioned


// Iterate through the studentList in panelToUpdate
for (const student of panelToUpdate.studentList) {
  if (user.slotDetails.absentStudents.includes(student.PRN)) {
    // The student is absent, do nothing
    console.log(`Student ${student.PRN} is absent.`);
  } else {
    // The student is not absent, update attendance based on slotType
    const subjectID = user.subjectID;
    const slotType = user.slotDetails.slotType;

    // Find the attendance record for the specific subject and slot type
    const attendanceRecord = student.attendance.find(attendance => attendance.subjectID === subjectID);

    if (attendanceRecord) {
      if (slotType === "Theory") {
        // Increment attendedTheorySessions for Theory slot
        attendanceRecord.attendedTheorySessions += 1;
      } else if (slotType === "Practical") {
        // Increment attendedLabSessions for Practical slot
        attendanceRecord.attendedLabSessions += 1;
      }
    } else {
      console.log(`Attendance record not found for student ${student.PRN} and subject ${subjectID}`);
    }
  }
}

// Save the updated document
panelToUpdate.save()
  .then(() => {
    console.log('Updated student attendance:', panelToUpdate);
  })
  .catch(error => {
    console.error('Error saving updated student attendance:', error);
  });


//-----------------------------------------------------------------second logic end

            if(user.slotDetails.slotType==="Theory")
            {
            const lecture=subDetail.totalTheorySessions+1;
            

            const updatedDocument = await Panels.findOneAndUpdate(
              {
                panelName: panelToUpdate.panelName,
                'subDetails.subjectID': subDetail.subjectID
              },
              {
                $set: {
                  'subDetails.$.totalTheorySessions': lecture
                }
              },
              { new: true }
            );
            

            return res.status(200).json({ updatedDocument, success: true });
            }

            else if(user.slotDetails.slotType==="Practical")
            {
            const lab=subDetail.totalLabSessions+1;
           
            const updatedDocument = await Panels.findOneAndUpdate(
              {
                panelName: panelToUpdate.panelName,
                'subDetails.subjectID': subDetail.subjectID
              },
              {
                $set: {
                  'subDetails.$.totalLabSessions': lab
                }
              },
              { new: true }
            );
            
            return res.status(200).json({ updatedDocument, success: true });
            }

//--------------------------------------------
//logic for updating the student list in panel with their attendence







//----------------------------------------------------------
            } else {
              // No record found
              return res.status(404).json({ error:'Panel not found' });
              
            }
          
            
            //----------------------------------------adding presenty in the panel table (student list)

              //from absent table
             
              
     
    }
 } catch (error) {
        return res.status(500).json({
            error: "An internal server error occurred while adding the attendence: " + error.message,
            success: false,
        });
    }
});

const calculateAveragePercentage = (attendedSessions, totalSessions) => {
  return parseInt((attendedSessions / totalSessions) * 100); 
};

router.get("/getExamEligibility", async (req, res) => { // Changed to GET
  try {
    const { PRN, year, semester, batch } = req.body;
    const panel = await Panels.findOne({
      "studentList.PRN": PRN,
      currentYear: year,
      currentSem: semester,
    });

    if (!panel) {
      return res.status(404).json({ error: "Panel not found for the given parameters" });
    }

    const student = panel.studentList.find((s) => s.PRN === PRN);

    // Calculate attendance percentages
    const attendanceRecords = student.attendance.map((attendance) => {
      const subjectDetails = panel.subDetails.find((sub) => sub.subjectID === attendance.subjectID);

      return {
        subjectID: attendance.subjectID,
        attendancePercentageTheory: calculateAveragePercentage(
          attendance.attendedTheorySessions,
          subjectDetails.totalTheorySessions
        ),
        attendancePercentageLab: calculateAveragePercentage(
          attendance.attendedLabSessions,
          subjectDetails.totalLabSessions
        ),
      };
    });

    // Calculate average percentage
    const totalSubjects = attendanceRecords.length;
    const totalPercentage = attendanceRecords.reduce((total, record) => {
      return total + (record.attendancePercentageTheory + record.attendancePercentageLab) / 2;
    }, 0);
    
    const averagePercentage = totalPercentage / totalSubjects;

    // Check eligibility
    const eligibility = averagePercentage >= 75 ? 'Eligible' : 'Not Eligible';

    res.json({ success: true, attendanceRecords, averagePercentage, eligibility });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports=router;