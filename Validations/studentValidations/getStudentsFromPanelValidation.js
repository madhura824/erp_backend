
const getStudentsFromPanelValidation = async (req, res, next) => {
    // console.log("getStudentsFromPanelValidation working")
    // next()
    try {
        const {
            studentPanel
        } = req.body;


        if ( studentPanel == null ) {
            res.status(400).json({ error: "The request body doesn't contain the Panel name.", success: false });
        } else if (studentPanel.length!=1) {
            res.status(400).json({ error: "Enter the panel name correctly (In capital letter eg: A)", success: false });
        }  else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error occurred while validating fields while adding the new user.", success: false });
    }
};

module.exports = getStudentsFromPanelValidation;
