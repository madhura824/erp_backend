const mongoose = require("mongoose");

const panelsSchema=new mongoose.Schema({
	panelName:{min:1,max:1,type:String ,unique:true,required:true,default:'X'},
	courseType:{ type: String, minLength: 5, maxLength: 100, required: true, default:'X'},
	studentList:[{
			PRN:{min:1000000000,max:9999999999,type:Number,required:true,default:9999999999},
			studentRoll:{min:1,max:1000,type:Number,default:1000},
			attendance:[{
				subjectName:{minLength:2,maxLength:10,type:String,default:'NULL'},
				attendedTheorySessions:{min:0,max:300,type:Number,default:0},
				attendedLabSessions:{min:0,max:300,type:Number,default:0}
			}]
	}],
	subDetails:[{
			teacherID:{minLength:8,maxLength:20,type:String,required:true,default:'NULL'},
			subjectID:{minLength:1,maxLength:50,type:String,required:true,default:'NULL'},
			totalTheorySessions:{min:0,max:300,type:Number,required:true,default:300},
			totalLabSessions:{min:0,max:300,type:Number,required:true,default:300}
	}],
	currentYear:{type:Number,required:true,min:1,max:9999,default:9999},
	currentSem:{type:Number,required:true,min:1,max:20,default:20},
	semStartDate:{type:Date,required:true,default:new Date("1970-01-01T00:00:00Z")},
	semEndDate:{type:Date,required:true,default:new Date("1970-01-01T00:00:00Z")}

})
module.exports=mongoose.model("panels",panelsSchema);