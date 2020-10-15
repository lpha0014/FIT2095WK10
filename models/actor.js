const mongoose = require('mongoose'); //access mongoose library
const actorSchema = new mongoose.Schema({ //create new schema
    _id: mongoose.Schema.Types.ObjectId, //declare id of each actor (_id)
    name: {
        type: String,
        required: true
    },
    bYear: { //mandatory field of type integer
        validate: {
            validator: function (newAge) { //boolean function
                if (Number.isInteger(newAge))
                    return true;
                else return false
            },
            message: 'Birth year should be integer'
        },
        type: Number,
        required: true
    },
    movies: [{ //list of movies - an array of references (id's) to 'Movie' collection
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }]
});
module.exports = mongoose.model('Actor', actorSchema); //export the model