

const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
  //  console.log(authorizationHeader + "\n\n\n\n" + token_);
    if (!authorizationHeader) {
        res.status(400).json({ error: "Token is missing.", success: false });
        return;
    }
    else {
        try {
            const token = authorizationHeader.split(" ")[1];

            const data = jwt.verify(token, process.env.SECRET);

            console.log(data.userID)

            console.log(typeof (data.userID))

            if (data.designation.toLowerCase() === "admin") {
                var authData = {
                    designation: data.designation.toLowerCase(),
                    userID: data.userID
                }

                req.authData = authData
                next()

            } else {
                res.status(401).json({ error: "Unauthorized: User is not an admin", success: false });
            }

        } catch (error) {

            //changes added the if-else
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
    }


};

module.exports = isAdmin;
