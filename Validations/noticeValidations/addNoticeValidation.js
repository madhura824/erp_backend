

const addNoticeValidation = async (req, res, next) => {
    // console.log("add notice val working")
    // next()
    try {
        const {noticeTitle,noticeDescription,recipientDesignation,DOI} = req.body;


        // Notice (noticeTitle<1-200, String>, noticeDescriprion<1-1000, String>, recipientDesignation [Student/Teacher]<String>, DOI<Date>)


        if (noticeTitle == null || noticeDescription == null || recipientDesignation == null || DOI == null) {
            res.status(400).json({ error: "The request body doesn't contain all the fields that are required to create the new notice.", success: false });
        } else if (noticeTitle.length>200  ) {
            res.status(400).json({ error: "Notice Title cannot be this big (Length has to be less than 200 )", success: false });
        } 
        else if(noticeTitle.length<=0){
            res.status(400).json({ error: "Notice Title cannot be Empty )", success: false });
        }else if (noticeDescription.length >1000  ) {
            res.status(400).json({ error: "Description cannot be this long. Keep the length less than 1000", success: false });
        } 
        else if(noticeDescription.length <=0 ){ 
            res.status(400).json({ error: "Description cannot be empty", success: false });
        }
        else if (recipientDesignation!="Teacher" && recipientDesignation!="Student") {
            res.status(400).json({ error: "Recipient Designation can only be Teacher or Student (Please check spelling)", success: false });
        }  else if (DOI > new Date().toISOString().split("T")[0]) {
            res.status(400).json({ error: "Date can't be a date from the future", success: false });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while creating new notice.", success: false });
    }
};

module.exports = addNoticeValidation;
