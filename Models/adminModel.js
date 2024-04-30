const mongoose = require("mongoose");

const adminSchema= new mongoose.Schema({
    adminName: { type: String, required: true,min: 5, max: 50,unique:true,default:'NULL' },
    adminID: { type: String, required: true ,min: 8, max: 20,default:'NULL'},
    password: { type: String, required: true,default:'NULL'},
});

module.exports = mongoose.model("Admin",adminSchema);