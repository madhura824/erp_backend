const validator = require("validator");

const updateTeacherValidation = async (req, res, next) => {
    // console.log("update teacher val working")
    // next();
    try {
        const { teacherID, name, specialization, designation, DOB, phoneNo, email, password } = req.body;
        if (teacherID == null || name == null || specialization == null || designation == null || DOB == null || phoneNo == null || email == null) {
            res.status(400).json({ error: "The request body doesn't contain all the fields that are required to add the new user.", success: false });
        } else if (teacherID.length < 8 || teacherID.length > 20) {
            res.status(400).json({ error: "Teacher ID must be at least 8 characters long and must not be greater than 20", success: false });
        } else if (name.length < 5 || name.length > 50) {
            res.status(400).json({ error: "Name must be at least 5 characters long and must not be greater than 50", success: false });
        } else if (specialization.length < 1 || specialization.length > 50) {
            res.status(400).json({ error: "Specialization must be at least 1 characters long and must not be greater than 50", success: false });
        } else if (designation.length < 1 || designation.length > 50) {
            res.status(400).json({ error: "Designation must be at least 1 characters long and must not be greater than 50", success: false });
        } else if (DOB > new Date().toISOString().split("T")[0]) {
            res.status(400).json({ error: "Birth date can't be a date form future", success: false });
        } else if (phoneNo < 1000 || phoneNo > 999999999999999) {
            res.status(400).json({ error: "Phone No must be at least 4 digts long and must not be greater than 20", success: false });
        } else if (!validator.isEmail(email)) {
            res.status(400).json({ error: "Email is incorrect. Please correct it.", success: false });
        } else if (password && password.length < 8) {
            res.status(400).json({ error: "Password must be at least 8 characters long", success: false });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while updating the user's details.", success: false });
    }
};

module.exports = updateTeacherValidation;