const mongoose = require('mongoose');//reference mongoose library
const Actor = require('../models/actor');//router needs access to models
const Movie = require('../models/movie');

module.exports = { //export an object where the function is a property of the object

    //getAllretrieves all the docs from the Actor collection and sends them back as a response.
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function (err, actors) { // lab task 7
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },
    //createOne creates a new document based on the parsed data in req.body
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) { //saves new document in 'Author' collection
            res.json(actor);
        });
    },
    //finds one doc by ID
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies') //.populate replaces each ID in the array ‘movies’ with its document.
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    //finds a document by its ID and sets new content that is retrieved from ‘req.body’
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    //deleteOne deletes the document that matches the criteria
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    //AddMovie adds a movie ID to the list of movies in an actor’s document.
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    //lab task 2 - delete actor and all its movies from actor id ???
    deleteAll: function (req, res) {
        Actor.findOneAndRemove({_id: req.params.id}, function (err,actors){
            if(err) return res.status(400).json(err);
            res.json();
            Movie.deleteMany({_id:actors.movies}, function(err) {
                if(err) return res.status(404).json(err);
                res.json();
            });
    });
    },
        //4. remove actors 
        removeActors: function (req, res) {
            Movie.findOneAndUpdate({
                _id: req.params.movId, }, {
                    $pull: {
                        "actors": mongoose.Types.ObjectId(req.params.actId)
                    }
                }, function (err,result) {
                if (err) {return res.status(404).json(err);}
                if (!result) return res.status(404).json();
                else {res.json(result);}
            });
        },
        extraRemove: function (req, res) {
            Actor.findOneAndUpdate({_id: req.params.actorId}, {
                    $set: {
                        "movies": [] //set to empty
                    }
                }, function (err, actor) {
                if (err) {return res.status(400).json(err);}
                if (!actor) {return res.status(404).json(err);}
                else {res.json();}
            });
        },
    addExistMovie: function (req,res) { //wk9
            Actor.findOne({ _id: req.params.aId }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                Movie.findOne({ _id: req.params.mId }, function (err, movie) {
                    if (err) return res.status(400).json(err);
                    if (!movie) return res.status(404).json();
                    actor.movies.push(movie._id);
                    actor.save(function (err) {
                        if (err) return res.status(500).json(err);
                        res.json(actor);
                    });
                })
            });
        },
};