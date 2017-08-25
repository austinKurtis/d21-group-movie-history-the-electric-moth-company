'use strict';

var movie = require('./getMovies');
var handler = require('./handlers');
var fire = require('./firebaseCalls');
var movieRating = {};
var card = {
   createCard: function(movies, status) {
     console.log("movieSearch", movies);

     let cardMovieKeys = Object.keys(movies);
     $(cardMovieKeys).each((index, item) => {
       let thisMovie = movies[item];
       thisMovie.fbID = cardMovieKeys[index];
       let movieContent =
       `<div class="col s4" id=card--${cardMovieKeys[index]}>
   				<div class="card sticky-action">
   					<div class="card-image waves-effect waves-block waves-light">
   					  <img class="activator icon${thisMovie.movieID}" src="${thisMovie.poster}">
   					</div>

   					<div class="card-content">
              <span class="card-title activator grey-text text-darken-4 icon${thisMovie.movieID} col s10 truncate">${thisMovie.title}</span>
              <i class="material-icons right icon${thisMovie.movieID} col s2 activator">more_vert</i>
   					</div>
   					<div class="card-reveal" id=reveal${thisMovie.movieID}>
   					  <span class="card-title grey-text text-darken-4">Overview<i class="material-icons right">close</i></span>
   					  <p>${thisMovie.overview}</p>
              <span class="card-title grey-text text-darken-4">Cast</span>
              <p id=castReveal${thisMovie.movieID}></p>
   					</div>
   					<div class="card-action">
   						<a href="#" id=plus${thisMovie.movieID}><i class="material-icons" >add_circle</i></a>
   					</div>
						<div id=rateYo${index} class=rateYo></div>
          </div>
   			</div>`;

        if (status === true) {
          $('#searchView').append(movieContent);
        } else if (status === false) {
          $('#userview-content').append(movieContent);
        }
        // $('.row').append(movieContent);
				$(function (content) {
					$(`#rateYo${index}`).rateYo({
						fullStar: true,
						numStars: 10,
            rating: thisMovie.rating/2
					})
					 .on("rateyo.set", function (e, data) {
                  console.log("The rating is set to " + data.rating + "!");
									let rating = data.rating * 2;
									console.log("Movie Rating:", movieRating.rating);
									handler.rateMovie(thisMovie, rating);
              });
					});
        handler.moreInfo(thisMovie);
        handler.watchList(thisMovie);
        // handler.markWatched(thisMovie);

	});
	}
};


module.exports = card;
