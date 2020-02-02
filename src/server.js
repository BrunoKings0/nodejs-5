const express = require('express')
const movies = require('../imdb-movies.json')
const app = express()

var returnedMovie = {}

function randomObject(vector){
  return vector[Math.floor(Math.random() * vector.length)]
}

function returnMovie(object){
  returnedMovie.director = object.Director
  returnedMovie.movie = object.Title
  return returnedMovie
}

function findDirector(directorName){
   let result =  movies.filter( function(element) {
    return element.Director === directorName;
});
return result
}

app.get('/v1/movie', async (req, res, next) => {
 
  res.send(returnMovie(randomObject(movies)))
})


app.get('/v1/movie/:director', async (req, res, next) => {
  res.send(returnMovie(randomObject(findDirector(req.params.director))))
  //res.status(501).send('Not Implemented')
})

const start = async (port = 8080) => {
  app.listen(port, function () {
    console.info('%s listening at port %s', app.name, port)
  })
}

const stop = () => {
  app.close(() => {
    console.info('App Stopped')
  })
}

module.exports = {
  app,
  start,
  stop
}
