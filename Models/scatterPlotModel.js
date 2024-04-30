const mongoose = require("mongoose");


const ScatterSchema = new mongoose.Schema({
    panelName: { minLength:1, maxLength: 1 ,type: String, required: true},
    year: {type:Number,required:true,min:1,max:10},
    semester: {type:Number,required:true,min:1,max:20},
    result: [{
        PRN: {min:1000000000,max:9999999999,type:Number,required:true},
        resultpercent: {min:0,max:100,type:Number,required:true}
    }],
    attendance: [{
        PRN: {min:1000000000,max:9999999999,type:Number,required:true},
        attendancepercent: {min:0,max:100,type:Number,required:true}
    }]
});


module.exports = mongoose.model("scatterplots", ScatterSchema);
