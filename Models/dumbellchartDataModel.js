const mongoose = require("mongoose");

const DumbellChartSchema = new mongoose.Schema({
     Panel:{type:String,minlength:1,maxlength:1},
     SubMaxMin:[{
        subName:{type:String,minlength:2,maxlength:10},
        maxMarks:{type:Number,min:0,max:100},
        minMarks:{type:Number,min:0,max:100}
     }]
});

module.exports = mongoose.model("DumbellChartData", DumbellChartSchema);