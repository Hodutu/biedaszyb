'use strict';

var fc = require('filestube-client');
var fbc = require('filebit-client');
var biedaconfig = require('./biedaconfig.json');
var eachSeries = require('async').eachSeries;

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

  var show = function(){};
  var file = function(title, cb) {
    console.log('szukam...');
    fc.getAll(title, {}, function(links) {
      eachSeries(links, function(link, esCb) {
        // XXX: multiple links support!
        // This should work also for Array of links
        filebitRequest(link[0], function(err, result) {
          if (err) {
            esCb();
            console.log(err);
            return;
          }

          cb(result);
        });
      });
    });
  };

  return {
    show: show,
    file: file
  };
})();

module.exports = biedaszyb;

// biedaszyb.show(title, season, firstEpisode, lastEpisode, callback);
biedaszyb.file('How I Met Your Mother S01E01', function(result) {
  console.log('NO HEJKA!', result);
});//, callback);
