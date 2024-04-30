const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    teacherID: { type: String, required: true, minLength: 8, maxLength: 20, unique: true ,default:'NULL'},
    name: { type: String, minLength: 5, maxLength: 50, required: true ,default:'NULL'},
    specialization: { type: String, minLength: 1, maxLength: 50, required: true ,default:'NULL'},
    designation: { type: String, minLength: 1, maxLength: 50, required: true ,default:'NULL'},
    DOB: { type: Date, required: true ,default:new Date("1970-01-01T00:00:00Z")},
    phoneNo: { type: Number, min: 1000, max: 999999999999999, required: true ,default:999999999999999},
    email: { type: String, minLength: 8, maxLength: 50, required: true,default:'NULL' },
    password: { type: String, required: true ,default:'NULL'},
});

module.exports = mongoose.model("Teacher",teacherSchema);