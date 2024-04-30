

const addCourseValidation = async (req, res, next) => {
    // console.log("Add course val workign")
    // next()
    try {
        const {courseName, totalYears, totalSemesters} = req.body;

        if (courseName == null || totalYears == null || totalSemesters == null) {
            res.status(400).json({ error: "The request body doesn't contain all the fields that are required to add the new course.", success: false });
        } 
        else if (courseName.length < 5 || courseName.length > 100) {
            res.status(400).json({ error: "Course Name must be between 5 and 100 characters", success: false });
        }
        else if (totalYears < 1 || totalYears > 10) {
            res.status(400).json({ error: "Total years must be between 1 and 10", success: false });
        }
        else if (totalSemesters < 1 || totalSemesters > 20) {
            res.status(400).json({ error: "Total semesters must be between 1 and 20", success: false });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while adding a new course.", success: false });
    }
};

module.exports = addCourseValidation;