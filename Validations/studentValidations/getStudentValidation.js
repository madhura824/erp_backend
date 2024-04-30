const validator = require("validator");

const getStudentValidation = async (req, res, next) => {
    // console.log("getStudentValidation working")
    // next();
    try {
        const PRN = req.params.PRN;





        // if (PRN == null) {
        //     res.status(400).json({ error: "The request body doesn't contain all the fields that are required to add the new student.", success: false });
        // } else 
        if (PRN < 1000000000 || PRN > 9999999999) {
            res.status(400).json({ error: "PRN must be between 1000000000 and 9999999999", success: false });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while adding the new user.", success: false });
    }
};

module.exports = getStudentValidation;
