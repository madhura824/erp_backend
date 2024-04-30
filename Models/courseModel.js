const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: { type: String, minLength: 5, maxLength: 100, required: true ,default:'NULL'},
     totalYears: { type: Number,min: 1,max: 10, required: true,default:10},
     totalSemesters: { type: Number, min: 1, max: 20, required: true,default:20}
});

module.exports = mongoose.model("Course",courseSchema);