const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
     PRN: { type: Number , required: true,min: 1000000000, max: 9999999999 ,default:9999999999},
     year: { type: Number,min: 1,max: 9999, required: true,default:9999},
     semester: { type: Number, min: 1, max: 20, required: true,default:20},
     arrayofMarks: [ 
         {
            subjectID:{ type: String, minLength: 1, maxLength: 50, required: true,default:'NULL'},
            endterms:{type: Number, min: 0, max: 200, required: true,default:0},
            midterms:{ type: Number, min: 0, max: 200,required:true,default:0},
            activeLearning:{type: Number, min: 0, max: 200, required: true,default:0},
            theoryAssignments:{type: Number, min: 0, max: 200, required: true,default:0}, 	
            labAssignments:{type:Number,min: 0, max: 200, required: true,default:0},
         }
      ]
});

module.exports = mongoose.model("Result",resultsSchema);








