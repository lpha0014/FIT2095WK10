var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    //getAll function uses the Movie model to retrieve all the documents
    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    //createOne function creates a new movie document
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    //getOne function uses Movie model to retrieve a document (a movie) using its _id
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    //1. delete movie by id
    deleteOne: function (req, res) {
        Movie.findOneAndDelete({ _id: req.params.id }, function (err,result) {
            if (err) {return res.status(400).json(err)};
            if (!result) return res.status(404).json();
            res.json();
        });

    },
    // 3. remove movies 
    removeMovies: function (req, res) {
            Actor.findOneAndUpdate({
                _id: req.params.actorId, }, {
                    $pull: {
                        "movies": mongoose.Types.ObjectId(req.params.movieId)
                    }
                }, function (err,result) {
                if (err) {return res.status(400).json(err);}
                if (!result) return res.status(404).json();
                else {res.json();}
        });
    },
    //5. Add an existing actor to the list of actors in a movie
    addExistAuthor: function (req,res) {
        console.log("addExistAuthor")
        Movie.findOneAndUpdate({
            _id: req.params.mId
        }, {
            $push: {
                "actors": mongoose.Types.ObjectId(req.params.aId)
            }
        },
        {upsert:false},
        function (err, actor) {
            if(err) res.status(400).json(err)
            res.json(actor)
         });
        },
    //6. GET all the movies produced between year1 and year2
    getBtwAll: function (req, res) {
            if (req.params.year1 > req.params.year2){
                let query = { "year": { $gte: req.params.year2, $lte: req.params.year1}};
                Movie.find(query, 'year', function (err, movie){
                    if (err) res.status(404).json(err)
                    if (!movie) return res.status(404).json();
                    res.json(movie); 
                }) 
            }
            else{
                res.json('year 1 < year2')
            }
        },
    //9. Delete all the movies that are produced between two years
    deleteBtwAll: function (req, res) {
            if (req.body.year1 > req.body.year2){
                console.log(req.body.year1 + " " + req.body.year2)
                let query = { 'year': { $gte: req.body.year2, $lte: req.body.year1}};
                Movie.deleteMany(query, function (err, movie){
                    if (err) res.status(404).json(err)
                    if (!movie) return res.status(404).json();
                    res.json(); 
                }) 
            }
            else{
                res.json('year 1 < year 2')
            }
        },
//wk9 lab task 3
    removeayear: function(req, res) {
        Movie.deleteMany({year: {$lt: req.params.ayear}}, function(err,movie) {
            if (err) res.status(404).json(err);
            res.json();
        })
    }
};