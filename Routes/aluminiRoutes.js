const express = require("express");
const router = express.Router();
const Alumini = require("../Models/aluminiModel");


const addAluminiValidation = require("../Validations/aluminiValidations/addAluminiValidation");
const updateAluminiValidation = require("../Validations/aluminiValidations/updateAluminiValidations");
const getAluminiValidation = require("../Validations/aluminiValidations/getAluminiValidation");
const getAluminisFromPRNSubstringValidation = require("../Validations/aluminiValidations/getAluminiFromPrnSubstringValidation")
const getAluminiFromNameSubStringValidation = require("../Validations/aluminiValidations/getAluminiFromNameSubstringValidation")
const deleteAluminiValidation = require("../Validations/aluminiValidations/deleteAluminiValidation");

router.use(express.json());

router.post("/addAlumini", addAluminiValidation,async (req, res) => {
    //console.log("addAlumini working ")
    try {
        const { PRN,aluminiName, passoutYear, aluminiProgramme, favDomains, favSubjects, details, githubLink, linkedinLink, phoneNo, aluminiEmail, about, image } = req.body;
        const exists = await Alumini.findOne({ PRN });
       
        if (exists) {
            res.status(409).json({ error: `Another alumini with same details already exists.`, success: false });
        } else {
            
            const alumini = await Alumini.create({ PRN,aluminiName, passoutYear, aluminiProgramme, favDomains, favSubjects, details, githubLink, linkedinLink, phoneNo, aluminiEmail, about, image});

            if (alumini) {
                res.status(200).json({ alumini, success: true });
            }
            else {
                res.status(500).json({
                    error: "Error in creating alumini",
                    success: false,
                });
            }


        }
    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while adding the alumini: " + error.message,
            success: false,
        });
    }
});

router.get("/getAlumini/:PRN", getAluminiValidation, async (req, res) => {
    // console.log("getAlumini working")
    try {
        let  PRN = req.params.PRN;
        console.log(PRN, " ", typeof(PRN))
        PRN=parseInt(PRN)
        console.log(PRN, " ", typeof(PRN))
        
        const alumini = await Alumini.findOne({ PRN});

        if (!alumini) {
            res.status(409).json({
                error: `Alumini with the mentioned PRN ${PRN} does not exist`
            })
        }
        else {
            res.status(200).json({ alumini, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the alumini details: " +
                error.message,
            success: false,
        });
    }
});



router.post("/updateAlumini",updateAluminiValidation, async (req, res) => {

    // console.log("updateStudent working")
    try {
        const { PRN,aluminiName, passoutYear, aluminiProgramme, favDomains, favSubjects, details, githubLink, linkedinLink, phoneNo, aluminiEmail, about, image } = req.body;
        //    var  panel=studentPanel.upper;
        const exists = await Alumini.findOne({ PRN });


        if (exists) {
           
            const updatedFields = {
                PRN,aluminiName, passoutYear, aluminiProgramme, favDomains, favSubjects, details, githubLink, linkedinLink, phoneNo, aluminiEmail, about, image
            };


            // Use findOneAndUpdate to update the document
            const updatedDocument = await Alumini.findOneAndUpdate({ PRN }, updatedFields, { new: true });


            if (updatedDocument) {
                res.status(200).json({ updatedDocument, success: true });
            } else {
                res.status(500).json({ error: "Failed to update alumini.", success: false });
            }
        } else {
            res.status(404).json({ error: `Alumini with given details does not exist. Please create the alumini first.`, success: false });
        }
    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while updating the alumini details: " + error.message,
            success: false,
        });
    }
});


router.get("/getAllAlumini", async (req, res) => {
    //console.log("getAllAlumini working")
    try {

        const alumini = await Alumini.find();

        if (!alumini) {
            res.status(409).json({
                error: `There are no alumini records. To see alumini details here please add some alumini`
            })
        }
        else {
            res.status(200).json({ alumini, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the alumini details: " +
                error.message,
            success: false,
        });
    }

})

router.get("/getAluminiFromPRNSubstring", getAluminisFromPRNSubstringValidation, async (req, res) => {
    //  console.log("getAluminiFromPRNSubstring working")
    try {
        const { PRN } = req.body;
        const aluminis = await Alumini.find();
        const prnString = PRN.toString(); // Convert PRN to a string

        const resultAluminis = [];

        for (const alumini of aluminis) {
            const aluminiPRNString = alumini.PRN.toString();
            const prnRegex = new RegExp(`${prnString}`, 'i');

            if (aluminiPRNString.match(prnRegex)) {
                resultAluminis.push(alumini);
            }
        }

        if (resultAluminis.length === 0) {
            res.status(409).json({
                error: "No aluminins found."
            });
        } else {
            res.status(200).json({ aluminis: resultAluminis, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while filtering the alumini details: " + error.message,
            success: false,
        });
    }
});

router.get("/getAluminisFromNameSubstring",getAluminiFromNameSubStringValidation, async (req, res) => {
    // console.log("getAluminisFromNameSubstring working")
    try {
        const { aluminiName } = req.body;
        const aluminis = await Alumini.find();
        const anameString = aluminiName.toString(); // Convert PRN to a string

        const resultAluminis = [];

        for (const alumini of aluminis) {
            const nameString = alumini.aluminiName.toString();
            const nameRegex = new RegExp(`${anameString}`, 'i');

            if (nameString.match(nameRegex)) {
                resultAluminis.push(alumini);
            }
        }

        if (resultAluminis.length === 0) {
            res.status(409).json({
                error: "No aluminis found."
            });
        } else {
            res.status(200).json({ students: resultAluminis, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while filtering the alumini details: " + error.message,
            success: false,
        });
    }
});


router.delete("/deleteAlumini",deleteAluminiValidation,  async (req, res) => {
    //  console.log("deletealumini working")
    try {
        const { PRN } = req.body;
        let alumini = await Alumini.deleteOne({ PRN });
        console.log(PRN)
        if (!alumini) {
            console.log("Doesn't exist")
            res.status(404).json({ error: `Alumini with PRN ${PRN}  dosent exist`, success: false });
        }

        journal = await Alumini.findOneAndDelete(PRN);
        console.log("Deleted")
        res.status(200).json({ message: "Alumini record deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ error: "An internal server error occurred while deleting the alumini: " + error.message, success: false, });
    }
});


module.exports = router