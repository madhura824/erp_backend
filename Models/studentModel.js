const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  PRN: {
    type: Number,
    required: true,
    min: 1000000000,
    max: 9999999999,
    unique: true,
    default:9999999999
  },
  studentName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    default:'NULL'
  },
  studentRoll: {
    type: Number,
    min: 1,
    max: 1000,
    default:1000
  },
  studentPanel: {
    type: String,
    minlength: 1,
    maxlength: 1,
    default:'X'
  },
  currentYear: {
    type: Number,
    required: true,
    min: 1,
    max: 9999,
    default:9999
  },
  currentSem: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
    default:10
  },
  studentBatch: {
    type: Number,
    enum: [1, 2],
    default:1
  },
  studentCourse: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    default:'NULL'
  },
  studentDOB: {
    type: Date,
    required: true,
    default:new Date("1970-01-01T00:00:00Z")
  },
  phoneNo: {
    type: Number,
    required: true,
    min: 1000,
    max: 999999999999999,
    default:999999999999999
  },
  studentEmail: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    default:'NULL'
  },
  studentPassword: {
    type: String,
    required: true,
    default:'NULL'
  },
  totalSubjectCount: {
    type: Number, 
    min: 0,
    max: 200,
    default:200
  },
  emergencyNumber:{
  type: Number,
    required: true,
    min: 1000,
    max: 999999999999999,
    default:999999999999999
}
});

module.exports = mongoose.model("Student",studentSchema);