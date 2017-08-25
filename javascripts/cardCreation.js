'use strict';

var movie = require('./getMovies');
var handler = require('./handlers');
var card = {
   createCard: function(movies) {
     let cardMovieKeys = Object.keys(movies);
     $(cardMovieKeys).each((index, item) => {
       let thisMovie = movies[item];
       thisMovie.fbID = cardMovieKeys[index];
       let content =
       `<div class="col s4" id=card--${cardMovieKeys[index]}>
   				<div class="card sticky-action">
   					<div class="card-image waves-effect waves-block waves-light">
   					  <img class="activator icon${thisMovie.movieID}" src="${thisMovie.poster}">
   					</div>
   					<div class="card-content">
   					  <span class="card-title activator grey-text text-darken-4 icon${thisMovie.movieID}">${thisMovie.title}<i class="material-icons right icon${thisMovie.movieID}">more_vert</i></span>
   					  <p><a href="#">This is a link</a></p>
   					</div>
   					<div class="card-reveal" id=reveal${thisMovie.movieID}>
   					  <span class="card-title grey-text text-darken-4">Overview<i class="material-icons right">close</i></span>
   					  <p>${thisMovie.overview}</p>
              <span class="card-title grey-text text-darken-4">Cast</span>
              <p id=castReveal${thisMovie.movieID}></p>
   					</div>
   					<div class="card-action">
   						<a href="#" id=plus${thisMovie.movieID}><i class="material-icons" >add_circle</i></a>
   						<a href="#" id=watch${thisMovie.movieID}>Watched</a>
   					</div>
   				  </div>`;
        $('.row').append(content);
        handler.moreInfo(thisMovie);
        handler.watchList(thisMovie);
     });
   }
};

module.exports = card;
