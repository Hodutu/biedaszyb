'use strict';

var fc = require('filestube-client');
var fbc = require('filebit-client');
var biedaconfig = require('./biedaconfig.json');

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
        console.log(finalLink);
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
      links.forEach(function(link) {
        // XXX: multiple links support!
        // This should work also for Array of links
        filebitRequest(link[0], function(err, result){
        //filebitRequest('http://d01.megashares.com/dl/Eoq4b6K/How.I.Met.Your
        //.Mother.S01E01.DVDRip.XviD-TOPAZ.avi', function(err, result){
          if (err){
            console.log(err);
            return;
          }

          console.log('link finished: ', result);
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
biedaszyb.file('How I Met Your Mother S01E01');//, callback);
