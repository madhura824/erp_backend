

const deleteCourseValidation = async (req, res, next) => {
    try {
        const {courseName} = req.body;


         if (courseName==null) {
            res.status(400).json({ error: "Course ID is required", success: false });
        } 
        else if (courseName.length<8 ||courseName.length>20) {
            res.status(400).json({ error: "Course Name length must be minimum 8 and maximum 20", success: false });
        } 
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while deleting course.", success: false });
    }
};

module.exports = deleteCourseValidation;
