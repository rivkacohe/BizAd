const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    bizNum: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    imageUrl: {
        type: String,
        require: true,
    },
    websiteUrl: {
        type: String,
        require: true,
    },
});

const Card = mongoose.model('Card', cardSchema);

exports.Card = Card;