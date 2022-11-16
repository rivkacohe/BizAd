const mongoose = require('mongoose');

const ServicesForUserchema = new mongoose.Schema({

    serviceName: {
        type: String,
        require: true,
    },

    userId: {
        type: Object,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    userServiceID: {
        type: String,
        require: true,
        unique: true,
    },
    remark: {
        type: String,
        require: false,
    },
});

const ServicesForUser = mongoose.model('ServicesForUser', ServicesForUserchema);

exports.ServicesForUser = ServicesForUser;