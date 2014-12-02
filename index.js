'use strict';

var biedaconfig = require('./biedaconfig.json');

var gf = require('gimme-files');
var fbc = require('filebit-client');

var async = require('async');

var filebitRequest = function(link, cb) {
  fbc.login(
    biedaconfig.filebit.user,
    biedaconfig.filebit.password,
    function(error, loggedIn){
      if (error) {
        // we could not logged in
        cb(error);
        return;
      }

      // We are logged in, so let's download some file!
      fbc.getLink(link, function(error, finalLink) {
        if (error) {
          // we could not get proper link
          cb(error);
          return;
        }

        // We have nice link to download!
        cb(null, finalLink);
      });
    }
  );
};

var biedaszyb = (function(){

  var show = function(title, season, firstEpisode, howMany, cb){
    var titles = [];
    var finalLinks = [];

    var episode;
    for (var i=0; i<howMany; i++) {
      episode = (firstEpisode + i);
      episode = episode < 10 ? '0' + episode : episode;
      titles.push(title + ' S' + season + 'E' + episode);
    }
    console.log('titles', titles);
    async.eachSeries(titles, function(element, next) {
      file(element, function(error, result) {
        console.log('eldo', element, result);
        if (!error) {
          finalLinks.push(result);
        }
        next();
      });
    }, function() {
      cb(null, finalLinks);
    });
  };

  var file = function(title, cb) {
    gf(title, function(err, links) {
      if (err) {
        cb(err);
        return;
      }

      async.eachSeries(links, function(link, next) {
        filebitRequest(link, function(err, result) {
          if (err) {
            next();
            return;
          }
          cb(null, result);
        });
      }, function(e) {
        cb(new Error('No results found!'));
      });
    });
  };

  return {
    show: show,
    file: file
  };
})();

module.exports = biedaszyb;

biedaszyb.show('American Dad!', 10, 1, 2, function(err, result) {
  console.log('ERR', err);
  console.log('NO HEJKA!', result);
});
// biedaszyb.file('American Dad! S10E02', function(err, result) {
//   console.log('ERR', err);
//   console.log('NO HEJKA!', result);
// });
