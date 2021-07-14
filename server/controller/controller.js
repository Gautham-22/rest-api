const Member = require("../model/model");

const getMembers = async (req,res) => {
    try {
        const members = await Member.find({});
        res.json(members);
    } catch(err) {
        res.status(500).json({ message : err.message })
    }      
}

const getMember = async (req,res) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {                        // for id's that are formatted incorrectly
        return res.status(400).json({message : "Invalid id"});
    }
    try {
        const member = await Member.findById(id);
        if(!member) {
            return res.status(404).json({message : "No such user exists"});
        }
        res.json(member);
    } catch(err) {
        res.status(500).json({ message : err.message })
    }
}

const postMember = async (req,res) => {
    const member = new Member(req.validatedInputs);
    try {
        const newMember = await member.save();
        res.status(201).json(newMember);
    } catch(err) {
        res.status(400).json({ message : err.message })
    }
}

const updateMember = async (req,res) => {
    let id = req.params.id;
    let options = {};
    options = req.body;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {                        // for id's that are formatted incorrectly
        return res.status(400).json({message : "Invalid id"});
    }
    try {
        const updatedMember = await Member.findByIdAndUpdate(id,options);
        if(!updatedMember) {
            return res.status(404).json({message : "No such user exists"})
        }
        res.status(200).json(updatedMember);
    } catch(err) {
        res.status(400).json({ message : err.message })
    }
}

const deleteMember = async (req,res) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {                        // for id's that are formatted incorrectly
        return res.status(400).json({message : "Invalid id"});
    }
    try {
        const deletedMember = await Member.findByIdAndDelete(id);
        if(!deletedMember) {
            return res.status(404).json({message : "No such user exists"})
        }
        res.status(200).json(deletedMember);
    } catch(err) {
        res.status(400).json({ message : err.message })
    }
}

module.exports = {
    getMembers,
    getMember,
    postMember,
    updateMember,
    deleteMember
}