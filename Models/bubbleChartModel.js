const mongoose = require("mongoose");


const BubbleSchema = new mongoose.Schema({
    panelName: { minLength:1, maxLength: 1 ,type: String, required: true},
    year: {type:Number,required:true,min:1,max:10},
    semester: {type:Number,required:true,min:1,max:20},
    streakdata: [{
        roll: {min:1,max:100,type:Number,required:true},
        streak: {min:0,max:200,type:Number,required:true}
    }],
});


module.exports = mongoose.model("bubblecharts", BubbleSchema);
