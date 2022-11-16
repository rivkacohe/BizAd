const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
});

const Service = mongoose.model('Service', ServiceSchema);

exports.Service = Service;