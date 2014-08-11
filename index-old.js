'use strict';

var filestube = require('filestube-client');
var filebit = require('filebit-client');

var biedaszyb = function(title, first, last, mainCB) {

  var currentLink = 0;
  var globalLinks = [];
  var finalLinks = [];

  var downloadAction = function(body) {
    if (!body) {
      console.log('Link unactive, trying another one...');
      currentLink++;
      console.log('CURRENT LYNK:', currentLink);
      stripLinks(globalLinks);
    } else {
      currentLink = 0;
      console.log('Final link:', body);
      finalLinks.push(body);
      //episode++;
      console.log('EPISODE: ', episode, 'MAX: ', maxEpisodes);
      if (parseInt(episode, 10) === maxEpisodes) {
        console.log('DONE.....');
        console.log('LINKS:');
        console.log(finalLinks);
        mainCB(finalLinks);
        } else {
          episode++;
          if (episode < 10) {
            episode = '0' + episode;
          }
          DownloadVideo(title+episode);
        }
    }
  };

  var stripLinks = function(linkToStrip) {
    filestube.stripFinalLink(linkToStrip[currentLink], function(link) {
      console.log('LINK AFTER STRIPING:', link);
      if (link) {
        filebit.login(function(loggedIn) {
          if (loggedIn) {
            filebit.getLinks(link, downloadAction);
          }
        });
      } else {
        currentLink++;
        if (globalLinks[currentLink]) {
          stripLinks(globalLinks);
        } else {
          console.log('NO LINKS TO STRIP');
          if (parseInt(episode, 10) === maxEpisodes) {
            console.log('DONE.....');
            console.log('LINKS:');
            console.log(finalLinks);
            mainCB(finalLinks);
          } else {
            episode++;
            if (episode < 10) {
              episode = '0' + episode;
            }
            DownloadVideo(title+episode);
          }
        }
        //DownloadVideo(title + (episode < 10 ? '0'+episode : episode));
      }
    });
  };

  var DownloadVideo = function(title) {
    console.log('elo?', title);
    filestube.getAll(
      title,
      {
        type: 'mkv'
      },
      function(urls) {
        console.log('no elo!')
        console.log(urls);
        globalLinks = urls;
        stripLinks(urls);
      }
    );
  };

  var maxEpisodes = last;
  var episode = first;
  if (episode < 10) {
    episode = '0' + episode;
  }

  DownloadVideo(title + episode);
};


biedaszyb('Sopranos S01E', 1, 2, function(d){
  console.log(d);
});

module.exports = biedaszyb;
