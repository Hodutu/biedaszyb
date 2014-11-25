'use strict';

var fc = require('filestube-client');

var biedaszyb = (function(){

  var show = function(){};
  var file = function(title, cb) {
    console.log('szukam');
    fc.getAll(title, {}, function(links) {
      console.log(links);
    });
  };

  return {
    show: show,
    file: file
  };
})();

module.exports = biedaszyb;

// biedaszyb.show(title, season, firstEpisode, lastEpisode, callback);
biedaszyb.file('Blokersi');//, callback);
