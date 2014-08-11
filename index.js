'use strict';

var filestube = require('filestube-client');
//var filebit = require('filebit-client');

var biedaszyb = function(title, first, last, mainCB) {
  var maxEpisodes = last;
  var episode = first;
  if (episode < 10) {
    episode = '0' + episode;
  }

  var changeLinksToFilebitLinks = function(links){

  };

  var getLinksFromFilestube = function(title){
    console.log('looking for', title);
    filestube.getAll(title, {type:'mkv'}, function(e){
      console.log('links downloaded from Filestube', e);
      mainCB(e)
    });
  }

  getLinksFromFilestube(title + episode);
};


biedaszyb('The Sopranos S01E', 1, 2, function(d) {
  console.log(d);
});

module.exports = biedaszyb;
