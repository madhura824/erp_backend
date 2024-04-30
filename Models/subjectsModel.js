const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subjectID: { type: String, required: true, unique: true, minlength: 1, maxlength: 50,default:'NULL' },
    subjectNameShort: { type: String, required: true, minlength: 2, maxlength: 10,default:'NULL' },
    subjectNameLong: { type: String, required: true, minlength: 10, maxlength: 70 ,default:'NULL'},
    subjectType: { type: String, required: true, enum: ['Theory', 'Practical', 'Both'] ,default:'NULL'},
    endTermsFlag: { type: Boolean, required: true, default: false },
    midTermsFlag: { type: Boolean, required: true, default: false },
    activeLearningFlag: { type: Boolean, required: true, default: false },
    theoryAssignmentsFlag: { type: Boolean, required: true, default: false },
    labAssignmentsFlag: { type: Boolean, required: true, default: false },
    maxEndTermMarks: { type: Number, required: true, min: 0, max: 200 ,default:200},
    maxMidTermMarks: { type: Number, required: true, min: 0, max: 200 ,default:200},
    maxActiveLearningMarks: { type: Number, required: true, min: 0, max: 200 ,default:200},
    maxTheoryAssignmentMarks: { type: Number, required: true, min: 0, max: 200 ,default:200},
    maxLabAssignmentMarks: { type: Number, required: true, min: 0, max: 200 ,default:200},
    numberOfLabSessionsPerWeek: { type: Number, required: true, min: 0, max: 200 ,default:200},
    numberOfTheorySessionsPerWeek: { type: Number, required: true, min: 0, max: 200 ,default:200}

});

module.exports = mongoose.model("Subject",subjectSchema);