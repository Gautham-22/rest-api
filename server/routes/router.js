const express = require("express");
const router = express.Router();
const EmailValidator = require("email-validator");
const {phone} = require("phone");
const { getMembers, getMember, postMember, updateMember, deleteMember} = require("../controller/controller");

router.get("/",getMembers);

router.get("/:id",getMember);

router.post("/",validation,postMember);

router.put("/:id",updateMember);

router.delete("/:id",deleteMember);

function validation(req,res,next) {
    let inputs = req.body;
    for (var prop in inputs) {
        if (inputs.hasOwnProperty(prop)) {
            inputs[prop] = `${inputs[prop]}`.trim();  // converts everything to string and removes unnecessary end spaces
        }
    }
    let validation = validateInputs(inputs);
    if(!validation.success) {
        return res.status(400).json({message : validation.msg});
    } 
    req.validatedInputs = inputs;
    next();
}

function validateInputs(inputs) {
    let validation = {
        success : false,
        msg : ""
    }
    let countryCode = "IN"; // default countryCode
    if(inputs.countryCode) {
        countryCode = inputs.countryCode;
    }
    let phoneValidation = phone(inputs.mobile,{country : countryCode});
    if(!(inputs.name).match(/^[a-zA-Z\s]+$/)) {   
        validation.msg = "Invalid name";
    }else if(!(inputs.reg_no).match(/^[0-9]+$/)) {
        validation.msg = "Invalid register number";
    }else if(!(inputs.dept).match(/^[a-zA-Z\s]+$/)) {
        validation.msg = "Invalid department";
    }else if(!(inputs.tag).match(/^[a-zA-Z\s]+$/)) {
        validation.msg = "Invalid tag";
    }else if(!(inputs.domain).match(/^[a-zA-Z\s]+$/)) {
        validation.msg = "Invalid domain";
    }else if(!phoneValidation.isValid) {
        validation.msg = "Invalid mobile number";
    }else if(!EmailValidator.validate(inputs.email)) {
        validation.msg = "Invalid email";
    } else {
        validation.success = true;
    }
    return validation;
}

module.exports = router;