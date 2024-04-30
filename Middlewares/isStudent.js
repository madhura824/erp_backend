

const jwt = require("jsonwebtoken");



const isStudent = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization; // Get the token from the authorization header

    if (!authorizationHeader) {
        res.status(400).json({ error: "Token is missing.", success: false });
        return;
    }
    else{
        try {
            const token = authorizationHeader.split(" ")[1];
    
            const data = jwt.verify(token, process.env.SECRET);
            
           
           
            if ( data.designation.toLowerCase()==="student") {

               
                    var authData={
                     designation:data.designation.toLowerCase(),
                     userID:data.userID,
                     semester:data.semester,
                     year:data.year
                    }
                    
                  req.authData=authData
                  next()
            
                    
               
               
            } else {
                res.status(401).json({ error: "Unauthorized", success: false });
            }
        } catch (error) {
            //changes added the if else
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

module.exports = isStudent;
