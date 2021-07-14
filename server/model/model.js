const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name : String,
    reg_no : String,
    dept : String,
    tag : String,
    domain : String,
    mobile : String,
    email : String 
});

const Member = mongoose.model("member",memberSchema);

module.exports = Member;

