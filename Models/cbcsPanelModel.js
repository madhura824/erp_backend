// (year<1-10, Number>, semester<1-20, Number>, remainingSeats[Number], isActive<Boolean>)

const mongoose = require("mongoose");

const cbcsPanelSchema = new mongoose.Schema({
    year: { type: Number, min: 1, max: 9999, required: true ,default:9999},
    semester: { type: Number,min: 1,max: 20, required: true,default:20},
    courseType: { type: String, minLength: 5, maxLength: 100, required: true ,default:"X"},
    remainingSeats: [ { type: Number, min:0, max:60, required: true
    }],
    remainingStudents: [ { type: Number,  min: 1000000000,
        max: 9999999999,required: true,default:9999999999
    }],
    
    isActive: { type: Boolean, required: true,default:false}
});

module.exports = mongoose.model("CbcsPanels", cbcsPanelSchema);

