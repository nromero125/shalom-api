const Joi = require('@hapi/joi');
const Event = require('../Models/Event');

const schema = Joi.object().keys({
    title: Joi.string().required(),
    subtitle: Joi.string(),
    date: Joi.string().required(),
    time: Joi.string().required()
});


//Show all events
exports.index = async (req, res) => {
    try {
        await Event.find({}, (err, events) => {
            if(err) return res.send(err);
            res.json(events);
        });
    } catch (err) {
        console.log(err);
    }
};

//Handle create event
exports.create = async (req, res) => {
    try {
        const validate = schema.validate(req.body, {
            abortEarly: false
        });

        if(validate.error) return res.json(validate.error.details);
        let validatedEvent = validate.value;
        const event = new Event(validatedEvent);
        await event.save((err, event) => {
            if(err) return res.send(err);
            res.status(201).json(event);
        });
    } catch (err) {
        console.log(err)
    }
};

// Handle show event
exports.show = async (req, res) => {
    try {
        await Event.findOne({ _id : req.params.id }, (err, event) => {
            if (err) return res.send(err);
            res.json(event);
        });
    } catch (err) {
        console.log(err);
    }
};

// Handle delete Event
exports.update = async (req, res) => {
    try{
        const validate = schema.validate(req.body, {
            abortEarly: false
        });

        if(validate.error) return res.json(validate.error.details);
        let validatedEvent = validate.value;
        await Event.findOneAndUpdate({ _id: req.params.id }, {$set: validatedEvent}, {useFindAndModify: false, new: true}, (err, event) =>{
            if (err) return res.send(err);
            res.json(event);
        });
    }  catch (err) {
        console.log(err);
    }
};

// Handle delete Leader
exports.delete = async (req, res) => {
    try {
        await Event.deleteOne({ _id: req.params.id }, (err, event) => {
            if (err) return res.send(err);
            res.json({
                status: "success",
                message: "Event deleted"
            });
        });
    }catch (err) {
        console.log(err);
    }
};