const validator = require("validator");

const addAluminiValidation = async (req, res, next) => {
//console.log("validations working")

    try {
        const {
            PRN,aluminiName, passoutYear, aluminiProgramme, favDomains, favSubjects, details, githubLink, linkedinLink, phoneNo, aluminiEmail, about, image 
        } = req.body;

        jobTitle=details.jobTitle;
        companyName=details.companyName;
        totalYearsInCompany=details.totalYearsInCompany;
        workingDomain=details.workingDomain;


        if (PRN == null || aluminiName == null || passoutYear == null || aluminiProgramme == null || favDomains == null || favSubjects == null ||
            jobTitle == null ||companyName == null ||   totalYearsInCompany == null ||workingDomain == null || githubLink == null || linkedinLink == null  || phoneNo == null || aluminiEmail == null || about == null || image==null ) {
            res.status(400).json({ error: "The request body doesn't contain all the fields that are required to add the new alumini.", success: false });
        } else if (PRN < 1000000000 || PRN > 9999999999) {
            res.status(400).json({ error: "PRN must be between 1000000000 and 9999999999", success: false });
        } else if (aluminiName.length < 5 || aluminiName.length > 50) {
            res.status(400).json({ error: "Name Length must be between 5 and 50", success: false });
        }  else if (companyName.length < 5 || companyName.length > 50) {
            res.status(400).json({ error: "Company Name must be between 5-50 characters ", success: false });
        } 
        else if (aluminiProgramme.length < 5 ||aluminiProgramme.length > 50) {
            res.status(400).json({ error: "Alumini Programme Name must be between 5-50 characters ", success: false });
        }
        else if (jobTitle.length < 5 ||jobTitle.length > 50) {
            res.status(400).json({ error: "Job Title must be between 5-50 characters ", success: false });
        }
        else if (about.length < 5 ||about.length > 500) {
            res.status(400).json({ error: "Write about yourself in 5-500 characters ", success: false });
        }
        else if (totalYearsInCompany < 1 || totalYearsInCompany > 50) {
            res.status(400).json({ error: "Enter valid years spent in the company", success: false });
        } 
        
        else if (phoneNo < 1000 || phoneNo > 999999999999999) {
            res.status(400).json({ error: "Enter a valid phone number  ", success: false });
        }
        else if(favDomains.length==0){
            res.status(400).json({ error: "There should be atleast 1 favourite domain ", success: false });
        }
        else if(favSubjects.length==0){
            res.status(400).json({ error: "There should be atleast 1 favourite subject ", success: false });
        }
        else if(image.length==0){
            res.status(400).json({ error: "Insert a valid image", success: false });
        }
    

        else if (!validator.isEmail(aluminiEmail)) {
            res.status(400).json({ error: "Email format is incorrect. Please correct it.", success: false });
        } 
        else if (!validator.isURL(githubLink)) {
            res.status(400).json({ error: "URL format is incorrect. Please correct it.", success: false });
        }
        else if (!validator.isURL(linkedinLink)) {
            res.status(400).json({ error: "URL format is incorrect. Please correct it.", success: false });
        }
            else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while adding the new alumini.", success: false });
    }
    
};

module.exports = addAluminiValidation;
