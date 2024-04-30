const mongoose = require("mongoose");

const backlogSchema = new mongoose.Schema({
    PRN: { type: Number , required: true,min: 1000000000, max: 9999999999 },
    backDetails :[ {subjectID{ type: String, minLength: 1, maxLength: 50, reuired: true},
                      year: { type: Number,min: 1,max: 10 required: true},
                      semester: { type: Number, min: 1, max: 20 required: true}
                   }]
  
});

module.exports = mongoose.model("Backlog", backlogSchema);
