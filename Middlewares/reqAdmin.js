const Admin = require("../models/adminModel");

const reqAdmin = async (req, res, next) => {
  try {
    const designation = await Admin.findOne(req.userID);
    if (designation) {
      next();
    }
    else {
      res.status(401).json({ error: "User is not an Admin", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error occurred while verifying user designation", success: false });
  }
};

module.exports = reqAdmin;
