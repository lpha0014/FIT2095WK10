//reference the required packages
const bodyParser = require('body-parser');
const { LOADIPHLPAPI } = require('dns');
const express = require('express');
const mongoose = require('mongoose');
//reference routers
const actors = require('./routers/actor');
const movies = require('./routers/movie');
//create app from Expressjs and configure it
const app = express();
app.listen(8080);

let path = require('path');
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

//our express app is configured to understand both formats:JSON and urlencoded
app.use(bodyParser.json()); //json is enough
app.use(bodyParser.urlencoded({ extended: false })); //to use www.form-urlncoded; accept only primitive datatypes without extending datatypes

//Ask mongoose to connect to a database named ‘movies’ 
mongoose.connect('mongodb://localhost:27017/wk7', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});


//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie); //to add a movie
app.delete('/actors/:id', actors.deleteOne);

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);

//lab tasks

//9. Delete all the movies that are produced between two years. 
//year1 & year2 must be sent to the backend server through the request’s body in JSON.
app.delete('/movies/deleteMovies', movies.deleteBtwAll);

//1. Delete movie by id:
app.delete('/movies/:id', movies.deleteOne);

//	2. Delete an actor and all its movies
app.delete('/actors1/:id', actors.deleteAll)

//	3. Remove a movie from the list of movies of an actor
app.delete('/movies/:actorId/:movieId', movies.removeMovies);

//4. Remove an actor from the list of actors in a movie
app.delete('/actors/:movId/:actId', actors.removeActors);

//5. Add an existing actor to the list of actors in a movie
app.post('/movie/:mId/:aId', movies.addExistAuthor);
//wk9 - add existing movie to actor
app.post('/actor/:aId/:mId', actors.addExistMovie)
//6. Retrieve (GET) all the movies produced between year1 and year2, where year1>year2.
app.get('/movies/:year1/:year2', movies.getBtwAll);

//extra task - removes all movies in array of an actor  (empty list of movies within the actor)
app.delete('/extraRemove/:actorId', actors.extraRemove)

app.delete('/removeayear/:ayear', movies.removeayear) //wk9 task 3