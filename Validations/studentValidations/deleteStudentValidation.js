

const deleteStudentValidation = async (req, res, next) => {
    // console.log("deleteStudent working")
    // next()
    try {
        const {PRN} = req.body;


         if (PRN==null) {
            res.status(400).json({ error: "Student PRN is required", success: false });
        } 
        else if (PRN < 1000000000 || PRN > 9999999999) {
            res.status(400).json({ error: "PRN must be between 1000000000 and 9999999999", success: false });
        } 
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while deleting student.", success: false });
    }
};

module.exports = deleteStudentValidation;
