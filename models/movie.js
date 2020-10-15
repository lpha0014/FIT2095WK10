const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    actors: [{//define actors = an array of references (i.e. ids) to Actor collection - each movie doc can reference a set of Actors.
        type: mongoose.Schema.ObjectId,
        ref: 'Actor'
    }]
});

module.exports = mongoose.model('Movie', movieSchema);