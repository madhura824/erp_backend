

const deleteSubjectValidation = async (req, res, next) => {
    try {
        const {subjectID} = req.body;


         if (subjectID==null) {
            res.status(400).json({ error: "Subject ID is required", success: false });
        } 
        else if ( subjectID.length>50) {
            res.status(400).json({ error: "ID must be between minimum of length 8 and maximum 50", success: false });
        } 
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while  deleting subject.", success: false });
    }
};

module.exports = deleteSubjectValidation;
