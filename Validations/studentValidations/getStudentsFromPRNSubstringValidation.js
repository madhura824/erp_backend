const getStudentsFromPRNSubstringValidation = async (req, res, next) => {
    // console.log("getStudentsFromPRNSubstringValidation working")
    // next()
    try {
        const { PRN } = req.body;
        const numericRegex = /^[0-9]+$/;

        if (PRN == null) {
            res.status(400).json({ error: "The request body doesn't contain the PRN.", success: false });
        } else
         if (String(PRN).length > 10) {
            res.status(400).json({ error: "Enter a valid PRN. PRN must not exceed 10 digits.", success: false });
        } else if (PRN != "" && !numericRegex.test(String(PRN))) {
            res.status(400).json({ error: "Enter a valid PRN. PRN must contain numeric values only.", success: false });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while searching the student.", success: false });
    }
};

module.exports = getStudentsFromPRNSubstringValidation;
