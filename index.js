'use strict';

var biedaconfig = require('./biedaconfig.json');

var fc = require('filestube-client');
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

    async.each(titles, function(element, callback) {
      file(element, function(err, result){
        if (!err) {
          finalLinks.push(result);
        }

        cb();
      });
    }, function() {
      cb(null, finalLinks);
    });
  };

  var file = function(title, cb) {
    fc.getAll(title, {}, function(links) {

      if (links.length === 0) {
        cb(new Error('No results'));
      }
      async.eachSeries(links, function(link, esCb) {
        // XXX: multiple links support!
        // This should work also for Arrays of links
        if (link.length > 1) {
          esCb();
          return;
        }

        filebitRequest(link[0], function(err, result) {
          if (err) {
            esCb();
            return;
          }
          cb(null, result);
        });
      }, function(e){
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

// biedaszyb.file('Fargo S01E01', function(err, result) {
//   console.log('ERR', err);
//   console.log('NO HEJKA!', result);
// });
