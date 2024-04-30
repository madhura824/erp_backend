

const deleteTeacherValidation = async (req, res, next) => {
    // console.log("delete teacher val working")
    // next()
    try {
        const {teacherID} = req.body;


         if (teacherID==null) {
            res.status(400).json({ error: "Teacher ID is required", success: false });
        } 
        else if (teacherID.length<8 || teacherID.length>20) {
            res.status(400).json({ error: "ID must be between minimum of length 8 and maximum 20", success: false });
        } 
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while  deleting teacher.", success: false });
    }
};

module.exports = deleteTeacherValidation;
