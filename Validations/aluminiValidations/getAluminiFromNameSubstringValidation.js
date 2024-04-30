const getAluminisFromNameSubStringValidation = async (req, res, next) => {
    // console.log("getStudentsFromNameSubStringValidation working")
    // next()
    try {
        const { aluminiName } = req.body;

        if (aluminiName == null) {
            res.status(400).json({ error: "The request body doesn't contain Alumini Name.", success: false });
        } else
         if (String(aluminiName).length > 50) {
            res.status(400).json({ error: "Enter a valid Alumini Name. Alumini Name must not exceed 50 characters.", success: false });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while searching the alumini.", success: false });
    }
};

module.exports = getAluminisFromNameSubStringValidation;
