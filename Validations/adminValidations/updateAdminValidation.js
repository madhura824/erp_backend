const validator = require("validator");

const updateAdminValidation = async (req, res, next) => {
    // console.log("update admin val working")
    // next()
    try {
        const { adminName, adminID, password } = req.body;
        if (adminName == null || adminID == null) {
            res.status(400).json({ error: "The request body doesn't contain all the fields that are required to add the new user.", success: false });
        } else if (adminName.length < 5 || adminName.length > 50) {
            res.status(400).json({ error: "Name must be at least 5 characters long and must not be greater than 50", success: false });
        } else if (adminID.length < 8 || adminID.length > 20) {
            res.status(400).json({ error: "Admin ID must be at least 8 characters long and must not be greater than 20", success: false });
        } else if (password && password.length < 8) {                                                                                                //changed
            res.status(400).json({ error: "Password must be at least 8 characters long", success: false });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while updating the user's details.", success: false });
    }
};

module.exports = updateAdminValidation;