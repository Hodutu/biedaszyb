'use strict';

var biedaconfig = require('./biedaconfig.json');

var fc = require('filestube-client');
var fbc = require('filebit-client');

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
    fc.getAll(title, {}, function(links) {

      if (links.length === 0) {
        cb(new Error('No results'));
      }
      eachSeries(links, function(link, esCb) {
        // XXX: multiple links support!
        // This should work also for Array of links
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

// biedaszyb.show(title, season, firstEpisode, lastEpisode, callback);
biedaszyb.file('Fargo S01E01', function(err, result) {
  console.log('ERR', err);
  console.log('NO HEJKA!', result);
});
