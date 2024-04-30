const validator = require("validator");

const getTeacherValidation = async (req, res, next) => {
    // console.log("get techer Val working")
    // next()
    try {
        const teacherID = req.params.teacherID;
        if (teacherID == null) {
            res.status(400).json({ error: "The request body doesn't contain all the fields that are required to add the new user.", success: false });
        } else if (teacherID.length < 8 || teacherID.length > 20) {
            res.status(400).json({ error: "Teacher ID must be at least 8 characters long and must not be greater than 20", success: false });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while updating the user's details.", success: false });
    }
};

module.exports = getTeacherValidation;