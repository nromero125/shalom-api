const Leader = require('../Models/Leaders');
const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    name: Joi.string().required(),
    position: Joi.string().required(),
    description: Joi.string()
});


//Get all Leaders
exports.index = async (req, res) => {
    try {
        await Leader.find({}, (err, leaders) => {
            if(err) return res.send(err);
            res.json({
                leaders
            });
        })
    } catch (err) {
        console.log(err);
    }
};

//Create new Leader
exports.create = async (req, res) => {
    try {
        const validate = schema.validate(req.body, {
           abortEarly: false
        });
        if(validate.error) return res.json(validate.error.details);
        const validatedLeader = validate.value;

        const leader = new Leader(validatedLeader);
        await leader.save((err, leader) => {
            if(err) return res.send(err);
            res.status(201).json(leader);
        });
    }  catch (err) {
        console.log(err);
    }
};

//Get leader by ID
exports.show = async (req, res) => {
    try {
        await Leader.findOne({ _id: req.params.id }, (err, leader) => {
           if(err) return res.send(err);
           res.json(leader);
        });
    }  catch (err) {
        console.log(err);
    }
};

//Update Leader

exports.update = async (req, res) => {
    try {
        const validate = schema.validate(req.body, {
            abortEarly: false
        });
        if(validate.error) return res.json(validate.error.details);
        const validatedLeader = validate.value;
        await Leader.findOneAndUpdate({ _id: req.params.id }, {$set: validatedLeader}, {useFindAndModify: false, new: true}, (err, leader) => {
            if(err) return res.send(err);
            res.json(leader);
        });
    }  catch (err) {
        console.log(err);
    }
};

// Handle delete Leader
exports.delete = async (req, res) => {
    try {
        await Leader.deleteOne({ _id: req.params.id }, (err, leader) => {
            if (err) return res.send(err);
            res.json({
                status: "success",
                message: "Leader deleted"
            });
        });
    }catch (err) {
        console.log(err);
    }
};