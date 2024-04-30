const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

router.use(express.json());

router.post("/verify", async (req, res, next) => {
    // console.log("/verify called")
    var { token } = req.body;
    // console.log(req.body);
    try {
        var response = jwt.verify(token, process.env.SECRET);
        if (response.designation == "admin") {
            res.status(200).json({ userID: response.userID, success: true });  //next
        }
        else {
            res.status(401).json({ error: "Unauthorized: User is not an admin", success: false });
        }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            if (error.message === 'invalid token') {
                res.status(400).json({ error: "Invalid token", success: false });
            } else if (error.message === 'jwt must be provided') {
                res.status(400).json({ error: "JWT Token not provided", success: false });
            } else {
                res.status(500).json({ error: "tokenJsonWebTokenError occurred while authorizing token: " + error.message + error, success: false });
            }
        } else {
            res.status(500).json({ error: "Internal error occured while authorizing token: " + error.message, success: false });
        }
    }
});

module.exports = router;