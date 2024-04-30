const mongoose = require("mongoose");

const aluminiSchema= new mongoose.Schema({
  PRN: {
    type: Number,
    required: true,
    min: 1000000000,
    max: 9999999999,
    unique: true,
    default:9999999999
  },
    aluminiName: { type: String, required: true,min: 5, max: 50,unique:true,default:'NULL' },
    passoutYear: {min:1,max:9999, type:Number,required:true,default:9999},
    aluminiProgramme: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        default:'NULL'
      },
      favDomains: [{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        default:'NULL'
      }],
      favSubjects: [{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        default:'NULL'
      }],

      details:{  
        jobTitle: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
            default:'NULL'
          },
          companyName: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
            default:'NULL'
          },
          totalYearsInCompany: {min:1,max:50, type:Number,required:true,default:1},
          workingDomain: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
            default:'NULL'
          },
       
},

  githubLink: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    default:'NULL'
  },
  linkedinLink: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    default:'NULL'
  },
  phoneNo: {
    type: Number,
    required: true,
    min: 1000,
    max: 999999999999999,
    default:999999999999999
  },
  aluminiEmail: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    default:'NULL'
  },
  about: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500,
    default:'NULL'
  },
  image: {
    type: String,
    required: true,
    default:'NULL'
  }


});

module.exports = mongoose.model("Alumini",aluminiSchema);