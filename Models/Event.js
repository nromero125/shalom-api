const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

let Event = module.exports = mongoose.model('Event', eventSchema);

module.exports.get = function (callback, limit) {
    Event.find(callback).limit(limit);
};