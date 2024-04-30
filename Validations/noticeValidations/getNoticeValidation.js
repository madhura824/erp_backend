const validator = require("validator");  //is used for email

const getNoticeValidation = async (req, res, next) => {
    // console.log("get notice val working")
    // next()
    try {
        const {recipientDesignation} = req.body;


         if (recipientDesignation!="Teacher" && recipientDesignation!="Student") {
            res.status(400).json({ error: "Recipient Designation can only be Teacher or Student (Please check spelling)", success: false });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while creating new notice.", success: false });
    }
};

module.exports = getNoticeValidation;
