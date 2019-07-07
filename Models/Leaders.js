const mongoose = require('mongoose');

const leaderSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    }
});

let Leader = module.exports = mongoose.model('Leader', leaderSchema);

module.exports.get = function (callback, limit) {
    Leader.find(callback).limit(limit);
};