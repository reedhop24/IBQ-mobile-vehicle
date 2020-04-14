const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
    quoteNumber: {
        type: String,
        required: true
    }, 
    vehArr: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('vehicles', quoteSchema);