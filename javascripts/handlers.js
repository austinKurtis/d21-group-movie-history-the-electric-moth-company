'use strict';

var movie = require('./getMovies');
var fire = require('./firebaseCalls');

////---HANDLES USER INTERACTIONS---///
//Makes call to get cast from API
var handlers = {
  moreInfo: function(item) {
    $(`.icon${item.movieID}`).on("click", (e) => {
      if ($(`#castReveal${item.movieID}`).html() !== '') {

      } else {
        movie.getCredits(item.movieID)
        .then((cast) => {
          $(`#castReveal${item.movieID}`).html('');
          $(cast).each((cindex, citem) => {
            $(`#castReveal${item.movieID}`).append(`${citem.name} | `);
          });
        });
      }
    });
  },
///adds movie to watchlist
  watchList: function(item) {
    $(`#plus${item.movieID}`).on("click", (e) => {
      e.preventDefault();
      fire.returnWatchList()
      .then((watchList) => {
        let movieIDArr = [];
        let watchListKeys = Object.keys(watchList);
        $(watchListKeys).each((windex, witem) => {
          let thisMovie = watchList[witem];
          movieIDArr.push(thisMovie.movieID);
        });
        if (movieIDArr.indexOf(item.movieID) === -1) {
          fire.addToWatchList(item);
        }
      });
    });
  },

///adds movies to the watched list. If the movie is in the wishlist, adds to watched
  // markWatched: function(item) {
  //   $(`#watch${item.movieID}`).on("click", (e) => {
  //     e.preventDefault();
  //     fire.returnWatchList()
  //     .then((watchList) => {
  //       let uglyID;
  //       let watchListKeys = Object.keys(watchList);
  //       $(watchListKeys).each((windex, witem) => {
  //         let thisMovie = watchList[witem];
  //         if (thisMovie.movieID === item.movieID) {
  //           uglyID = watchListKeys[windex];
  //         }
  //       });
  //       if (uglyID === undefined) {
  //         item.watched = true;
  //         fire.addToWatchList(item);
  //       } else {
  //         fire.markWatched(uglyID);
  //       }
  //     });
  //   });
  // },

  ///submits rating to FB
  rateMovie: function(item, rating){
      fire.returnWatchList()
      .then((watchList) => {
        console.log("item", item);

        let uglyID;
        let watchListKeys = Object.keys(watchList);
        $(watchListKeys).each((windex, witem) => {
          let thisMovie = watchList[witem];
          if (thisMovie.movieID === item.movieID){
            uglyID = watchListKeys[windex];
          }
        });
        if (uglyID === undefined) {
          item.watched = true;
          item.rating = rating;
          fire.addToWatchList(item);
        } else {
          fire.rateMovie(uglyID, rating);
        }
      });
  },

  toggle: function(item) {
    $('.toggleButton').on("click", function(e) {
      console.log($('.toggleButton'));
      console.log("item", item);
      // console.log("card", card);
      let moviesToDisplay = {};
      let watchListKeys = Object.keys(item);
      $(watchListKeys).each((windex, witem) => {
        let thisMovie = item[witem];
        if ($(e.target).attr('id') === 'watchList' && thisMovie.watched === false) {
          moviesToDisplay[windex] = thisMovie;
        }

      });
      // card.createCard(moviesToDisplay);
    });
  }
};

module.exports = handlers;
