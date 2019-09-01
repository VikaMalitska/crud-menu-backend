const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = new mongoose.Schema({
    name: {
        type: String,
        default: "SecretHotDog"
    },
    ingredients: {
        type: [],
        required: [true,"ingredients are required!"]
    }
});

Schema.plugin(AutoIncrement, {inc_field: 'id'});


module.exports = mongoose.model('Hotdog', Schema);