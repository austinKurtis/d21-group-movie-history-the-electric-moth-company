'use strict';

var fire = require('./firebaseCalls');
var movie = require('./getMovies');
var card = require('./cardCreation');
var users = require('./users');
var login = require('./login');
var handlers = require('./handlers');
var userView = require('./userView.js');

var movieObject = {};

users.logOut();

$("#search").on('keyup', function (pushEnter) {
  if (pushEnter.which === 13) {
    $('#searchView').html('');
    $('#userview-content').html('');
    $('.row').empty();
    $("#userView-content").hide();
    $("#searchView").show();
    let userVal = $("#search").val();
    movie.getSearch(userVal)
    .then((results) => {
      for (var i = 0; i < results.length; i++) {
        let item = results[i];
        if (item.poster_path === null) {
          movieObject[i] = {
            title: item.title,
            year: item.release_date,
            poster: 'images/PLACEHOLDER.jpg',
            overview: item.overview,
            movieID: item.id,
            rating: 0,
            watched: false
          };
        } else {
          movieObject[i] = {
            title: item.title,
            year: item.release_date,
            poster: `http://image.tmdb.org/t/p/w342${item.poster_path}`,
            overview: item.overview,
            movieID: item.id,
            rating: 0,
            watched: false
          };
        }
      }
      card.createCard(movieObject, true);
    });
    $("#search").val("");
  }
});
