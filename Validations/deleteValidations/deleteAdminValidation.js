

const deleteAdminValidation = async (req, res, next) => {
    try {
        const {adminID} = req.body;


         if (adminID==null) {
            res.status(400).json({ error: "Admin ID is required", success: false });
        } 
        else if (adminID.length<8 || adminID.length>20) {
            res.status(400).json({ error: "ID must be between minimum of length 8 and maximum 20", success: false });
        } 
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while  deleting admin.", success: false });
    }
};

module.exports = deleteAdminValidation;
