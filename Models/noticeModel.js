const mongoose=require("mongoose");

const noticeSchema=new mongoose.Schema({

	noticeTitle:{minLength:1,maxLength:200,type:String,required:true,default:'NULL'},
	noticeDescription:{minLength:1,maxLength:1000,type:String,default:'NULL'},
	recipientDesignation:{
			type:String,
			enum:["Student","Teacher"],
			required:true,
			default:'NULL'
		},
	DOI:{type:Date,required:true,default:new Date("1970-01-01T00:00:00Z")}
})

module.exports=mongoose.model("Notice",noticeSchema);