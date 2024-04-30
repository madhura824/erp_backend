const getStudentsFromNameSubStringValidation = async (req, res, next) => {
    // console.log("getStudentsFromNameSubStringValidation working")
    // next()
    try {
        const { studentName } = req.body;

        if (studentName == null) {
            res.status(400).json({ error: "The request body doesn't contain Student Name.", success: false });
        } else
         if (String(studentName).length > 50) {
            res.status(400).json({ error: "Enter a valid Student Name. Student Name must not exceed 50 digits.", success: false });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while searching the student.", success: false });
    }
};

module.exports = getStudentsFromNameSubStringValidation;
