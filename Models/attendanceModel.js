
const mongoose = require("mongoose");


const attendanceSchema = new mongoose.Schema({
    panelName: { minLength:1, maxLength: 1 ,type: String, required: true,default:"X"},
    year:{min:1,max:9999, type:Number,required:true,default:9999},
    semester:{min:1,max:20,type:Number,required:true,default:20},
    slotDetails: [{
            subjectID: { minLength: 2, maxLength: 50 ,type: String, required: true,default:NULL},
            slotType: { type: String, required: true, enum: ['Theory', 'Practical'],default:"Theory"},
            batch: { type: Number, enum: [1, 2],default:2},
            date: { type: Date, required: true,default: new Date("1970-01-01T00:00:00Z")  },
            presentStudents:[{
            PRN: {  min: 1000000000, max: 9999999999,type:Number, required: true,default:9999999999}  
            }]
    }]
});


module.exports = mongoose.model("Attendance", attendanceSchema);
