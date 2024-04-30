const express = require("express");
const router = express.Router();
const Admin = require("../Models/adminModel");
const addAdminValidation = require("../Validations/adminValidations/addAdminValidation");
const updateAdminValidation = require("../Validations/adminValidations/updateAdminValidation");
const getAdminValidation = require("../Validations/adminValidations/getAdminValidation");
const deleteAdminValidation = require("../Validations/adminValidations/deleteAdminValidation")
const bcrypt = require("bcrypt");

router.use(express.json());

router.post("/addAdmin", addAdminValidation, async (req, res) => {
    try {
        const { adminName, adminID, password } = req.body;


        const exists = await Admin.findOne({ adminID });

        if (exists) {
            res.status(409).json({ error: `Another admin with id ${adminID} already exists. Please use another ID.`, success: false });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const user = await Admin.create({ adminName, adminID, password: hash });
            res.status(200).json({ adminID, success: true });  //  { token, success: true };
        }
    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while adding the user: " + error.message,
            success: false,
        });
    }
});

router.post("/updateAdmin", updateAdminValidation, async (req, res) => {
    console.log("update dmin wroking")
    try {
        const { adminName, adminID, password } = req.body;
        const existingAdmin = await Admin.findOne({ adminID });

        if (existingAdmin) {
            let hash;
            if (!password) {
                hash = existingAdmin.hash;
            }
            else {
                const salt = await bcrypt.genSalt(10);
                hash = await bcrypt.hash(password, salt);
            }

            // Create an object containing the fields to be updated
            const updatedFields = { adminName, adminID, password: hash };

            // Use findOneAndUpdate to update the document
            const updatedDocument = await Admin.findOneAndUpdate(
                { adminID },
                updatedFields,
                { new: true }
            );

            if (updatedDocument) {
                res.status(200).json({ adminID, success: true });
            } else {
                res.status(500).json({ error: "Failed to update admin.", success: false });
            }
        } else {
            res.status(404).json({
                error: `Admin with adminID ${adminID} does not exist. Please create the admin.`,
                success: false
            });
        }
    } catch (error) {
        console.error("An error occurred while updating the admin:", error);
        res.status(500).json({
            error: "An internal server error occurred while updating the admin.",
            success: false
        });
    }
});
router.get("/getAdmin/:adminID", getAdminValidation, async (req, res) => {
    try {
        const adminID = req.params.adminID;
        console.log("Received adminID:", adminID); // Log the received adminID

        const admin = await Admin.findOne({ adminID }).select("-password");
        if (admin) {
            // Include the password in the response
            res.status(200).json({ admin, success: true });
        } else {
            res.status(404).json({ success: false, message: "Admin not found" });
        }
    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while fetching the user details: " + error.message,
            success: false,
        });
    }
});



router.get("/getAllAdmins", async (req, res) => {
    // console.log("get all admin working")

    try {

        const admin = await Admin.find().select("-password");

        if (!admin) {
            res.status(409).json({
                error: `There are no admin records. To see admin details here please add some admins`
            })
        }
        else {
            res.status(200).json({ admin, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error:
                "An internal server error occurred while fetching the admin details: " +
                error.message,
            success: false,
        });
    }

})

router.delete("/deleteAdmin", deleteAdminValidation, async (req, res) => {
    try {
        const { adminID } = req.body;

        let admin = await Admin.deleteOne({ adminID });

        if (!admin) {
            res.status(404).json({ error: `Admin with ID  ${adminID}  dosent exist`, success: false });
        }

        else {
            res.status(200).json({ message: "Admin record deleted successfully", success: true });
        }

    } catch (error) {
        res.status(500).json({ error: "An internal server error occurred while deleting the Admin: " + error.message, success: false, });
    }
});
router.post("/getAdminFromIDSubString", async (req, res) => {
    try {
        const { adminID } = req.body;
        const admins = await Admin.find();
        const idString = adminID.toString(); // Convert PRN to a string

        const resultAdmins = [];

        for (const admin of admins) {
            const adminIDString = admin.adminID.toString();
            const idRegex = new RegExp(`${idString}`, 'i');

            if (adminIDString.match(idRegex)) {
                resultAdmins.push(admin);
            }
        }

        if (resultAdmins.length === 0) {
            res.status(409).json({
                error: "No admins found."
            });
        } else {
            res.status(200).json({ admins: resultAdmins, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while filtering the admin details: " + error.message,
            success: false,
        });
    }
});

router.post("/getAdminFromNameSubstring", async (req, res) => {
    try {
        const { adminName } = req.body;
        const admins = await Admin.find();
        const anameString = adminName.toString(); // Convert PRN to a string

        const resultAdmins = [];

        for (const admin of admins) {
            const nameString = admin.adminName.toString();
            const nameRegex = new RegExp(`${anameString}`, 'i');

            if (nameString.match(nameRegex)) {
                resultAdmins.push(admin);
            }
        }

        if (resultAdmins.length === 0) {
            res.status(409).json({
                error: "No admins found."
            });
        } else {
            res.status(200).json({ admins: resultAdmins, success: true });
        }

    } catch (error) {
        res.status(500).json({
            error: "An internal server error occurred while filtering the admin details: " + error.message,
            success: false,
        });
    }
});
module.exports = router;