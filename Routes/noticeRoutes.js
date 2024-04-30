const express =require('express')  //require express
const router= express.Router();  //requires for routing the requests
//all the data bases 
const Notice=require('../Models/noticeModel')
const addNoticeValidation=require('../Validations/noticeValidations/addNoticeValidation');
const getNoticeValidation=require('../Validations/noticeValidations/getNoticeValidation');
const isAdmin =require("../Middlewares/isAdmin")
const isStudent =require("../Middlewares/isStudent")
const isTeacher =require("../Middlewares/isTeacher")
router.use(express.json());


router.post("/addNotice",isAdmin,addNoticeValidation, async (req, res) => {  //mad change  added middleware 
   // console.log("add notice woring")
    try {
       
        const {noticeTitle,noticeDescription,recipientDesignation,DOI} = req.body;
        
           
            const notice = await Notice.create({ noticeTitle,noticeDescription,recipientDesignation,DOI});
            res.status(200).json({ Notice: notice, success: true });          
    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while adding the user: " + error.message,
            success: false,
        });
    }
});


router.post("/getNotice", getNoticeValidation,async (req, res) => {
   // console.log("get notice working")
    try {
        const { recipientDesignation } = req.body;
        const notices = await Notice.find({ recipientDesignation: recipientDesignation });

        if (notices.length > 0) {
            // Map the array of notices to extract relevant information
            const formattedNotices = notices.map((notice) => ({
                Title: notice.noticeTitle,
                Description: notice.noticeDescription,
                Issue_date: notice.DOI,
            }));

            res.status(200).json({ notices: formattedNotices, success: true });
        } else {
            res.status(409).json({
                error: `No Notices for the ${recipientDesignation} exist`,
            });
        }
    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the user details: " +
                error.message,
            success: false,
        });
    }
});


router.get("/getAllNotices",async (req,res)=>{
    //console.log("getAllStudents working")
    try{
    
    const notice = await Notice.find();
        
        if(!notice){
            res.status(409).json({
                error: `There are no notices`
            })
        }
        else{
            res.status(200).json({ notice, success: true });
        }
        
    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the notice details: " +
                error.message,
            success: false,
        });
    }

})


router.post("/getStudentNotice",isStudent,async (req, res) => {  //madde change   added middleware
    try {
        const notices = await Notice.find({ recipientDesignation:{
            $in: ["Student", "Both"]
        } });
        console.log(notices)

        if (notices.length > 0) {
          
            const formattedNotices = notices.map((notice) => ({
                Title: notice.noticeTitle,
                Description: notice.noticeDescription,
                Issue_date: notice.DOI,
            }));

            res.status(200).json({ notices: formattedNotices, success: true });
        } else {
            res.status(409).json({
                error: "No Notices for Students"
            });
        }
    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the user details: " +
                error.message,
            success: false,
        });
    }
});


router.post("/getTeacherNotice",isTeacher,async (req, res) => {   //changed added middleware
    try {
        const notices = await Notice.find({ recipientDesignation:{
            $in: ["Teacher", "Both"]
        } });
        console.log(notices)

        if (notices.length > 0) {
            // Map the array of notices to extract relevant information
            const formattedNotices = notices.map((notice) => ({
                Title: notice.noticeTitle,
                Description: notice.noticeDescription,
                Issue_date: notice.DOI,
            }));

            res.status(200).json({ notices: formattedNotices, success: true });
        } else {
            res.status(409).json({
                error: "No Notices for Teachers"
            });
        }
    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the user details: " +
                error.message,
            success: false,
     });
}
});

module.exports=router;