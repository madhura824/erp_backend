

const getCourseValidation = async (req, res, next) => {
//     console.log("gget course val working")
// next()
    try {
      
            const {courseName}=req.body;
            
        if (courseName == null || courseName.length<1 ) {
            res.status(400).json({ error: "Course name cannot be null.", success: false });
        }
        else if( courseName.length>100 || courseName.length<5){
            res.status(400).json({ error: "Course name has to be between 5 and 100 characters length .", success: false });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while getting course details.", success: false });
    }
};

module.exports = getCourseValidation;