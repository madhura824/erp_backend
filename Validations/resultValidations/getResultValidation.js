const Student= require("../../Models/studentModel");



const getResultValidation = async (req, res, next) => {
    // console.log("get result val working")
    // next()
    try {
        const {PRN,year,semester} =req.body;
        const checkprn= await Student.findOne({PRN:PRN});
            
            
        if (PRN<1000000000 || PRN > 9999999999 ) {
            res.status(400).json({ error: "PRN must be a 10 digit integer", success: false });
        } else if(!checkprn)
        {
            res.status(500).json({ error: "Entered PRN doesn't exists.Enter Valid PRN", success: false });    
        } else if(year <1 || year>9999){
            res.status(400).json({ error: "Enter a valid year", success: false });
        } else if(semester <1 || semester>20){
            res.status(400).json({ error: "Semester must be between 1 and 20", success: false });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while updating the subject's details.", success: false });
    }
};

module.exports = getResultValidation;
