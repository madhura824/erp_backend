const validator = require("validator");

const updateStudentValidation = async (req, res, next) => {
    // console.log("updateStudentValidation wrking")
    // next()
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





        if (PRN == null || studentName == null || studentRoll == null || studentPanel == null || currentYear == null || currentSem == null ||
            studentBatch == null || studentCourse == null || studentDOB == null || studentDOB == null || phoneNo == null || studentEmail == null || studentPassword == null || totalSubjectCount == null || emergencyNumber==null) {
            res.status(400).json({ error: "The request body doesn't contain all the fields that are required to add the new student.", success: false });
        } else if (PRN < 1000000000 || PRN > 9999999999) {
            res.status(400).json({ error: "PRN must be between 1000000000 and 9999999999", success: false });
        } else if (studentName.length < 5 || studentName.length > 50) {
            res.status(400).json({ error: "Name Length must be between 5 and 50", success: false });
        } else if (studentRoll < 1 || studentRoll > 1000) {
            res.status(400).json({ error: "Roll Number must be between 1 and 1000", success: false });
        } else if (studentPanel.length < 1 || studentPanel.length > 1) {
            res.status(400).json({ error: "Panel Name Must be a single character", success: false });
        } else if (currentYear < 1 || currentYear > 9999) {
            res.status(400).json({ error: "Enter valid current year", success: false });
        } else if (currentSem < 1 || currentSem > 20) {
            res.status(400).json({ error: "Enter valid batch. Batch can be only 1/2", success: false });
        }
        else if (studentBatch < 1 || studentBatch > 2) {
            res.status(400).json({ error: "Enter valid current semester", success: false });
        }
        else if (phoneNo < 1000 || phoneNo > 999999999999999) {
            res.status(400).json({ error: "Enter a valid phone number  ", success: false });
        }
        else if (totalSubjectCount < 0 || totalSubjectCount > 200) {
            res.status(400).json({ error: "Enter a valid phone number  ", success: false });
        }

        else if (!validator.isEmail(studentEmail)) {
            res.status(400).json({ error: "Email format is incorrect. Please correct it.", success: false });
        } else if (studentPassword.length < 8) {
            res.status(400).json({ error: "Password must be at least 8 characters long", success: false });
        } else if (studentDOB > new Date().toISOString().split("T")[0]) {
            res.status(400).json({ error: "Date of Birth can't be a date form future", success: false });
        } 
        else if(emergencyNumber<1000 || emergencyNumber>999999999999999 ){
            res.status(400).json({ error: "Enter a valid Phone Number. This is to be stored as your emergency phone number", success: false });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while adding the new user.", success: false });
    }
   
};

module.exports = updateStudentValidation;
