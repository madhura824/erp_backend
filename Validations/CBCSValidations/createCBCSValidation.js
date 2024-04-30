

const createCBCSValidation = async (req, res, next) => {
    // console.log("Add course val workign")
    // next()
    try {
        const {year, sem, semStart,semEnd,courseType} = req.body;

        if (year == null || sem == null || semStart == null || semEnd==null ||courseType==null) {
            res.status(400).json({ error: "The request body doesn't contain all the fields that are required to add the new course.", success: false });
        } 
        else if (sem<1 || sem>20) {
            res.status(400).json({ error: "Enter valid semester", success: false });
        }
        else if (courseType.length < 5 ) {
            res.status(400).json({ error: "Enter valid course name. Course name cannot be this small ", success: false });
        }
        else if( courseType.length > 50){
            res.status(400).json({ error: "Enter valid course name. Course name exceeds the character limit ", success: false });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while adding a new course.", success: false });
    }
};

module.exports = createCBCSValidation;