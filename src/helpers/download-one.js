var filestube = require('../clients/filestube');
var filebit = require('../clients/filebit');
var debug = require('./debug');

var currentLink = 0;
var globalLinks = [];
var finalLinks = [];
var downloadAction;
var dwnld = function(title, first, last, mainCB) {
var downloadAction = function downloadAction(body) {
    if (!body) {
      debug.log('Link unactive, trying another one...');
      currentLink++;
      debug.log('CURRENT LYNK:', currentLink);
      stripLinks(globalLinks);
    } else {
      currentLink = 0;
      debug.log('Final link:', body);
      finalLinks.push(body);
      //episode++;
      console.log('EPISODE: ', episode, 'MAX: ', maxEpisodes);
      if (parseInt(episode, 10) === maxEpisodes) {//(finalLinks.length === 19) {
        debug.log('DONE.....');
        debug.log('LINKS:');
        debug.log(finalLinks);
        mainCB(finalLinks);
        } else {
          episode++
          if (episode < 10) {
            episode = "0" + episode;
          }
          DownloadVideo(titles+episode);
        }
    }
  };

  var titles = title;
  var maxEpisodes = last;
  var episode = first;
  if (episode < 10) {
    episode = "0" + episode;
  }

  DownloadVideo(titles + episode);
}

var stripLinks = function(linkToStrip) {
  //debug.log('CURRENT LINK:', currentLink, linkToStrip);
  filestube.stripFinalLink(linkToStrip[currentLink], function(link) {
    debug.log('LINK AFTER STRIPING:', link);
    if (link) {
      filebit.login(function(loggedIn) {
        if (loggedIn) {
          console.log('yo:', typeof downloadAction);
          filebit.getLinks(link, downloadAction);
        }
      });
    } else {
      currentLink++;
      if (globalLinks[currentLink]) {
        stripLinks(globalLinks);
      } else {
        debug.log('NO LINKS TO STRIP');
        //if (parseInt(episode, 10) === maxEpisodes) {//(finalLinks.length === 19) {
          debug.log('DONE.....');
          debug.log('LINKS:');
          debug.log(finalLinks);
          //mainCB(finalLinks);
        // } else {
        //   episode++
        //   if (episode < 10) {
        //     episode = "0" + episode;
        //   }
        //   DownloadVideo(titles+episode);
        // }
      }
      //DownloadVideo(titles + (episode < 10 ? '0'+episode : episode));
    }
  });
};

var DownloadVideo = function(title) {
  filestube.getLinks(
    title,
    {
      //type: 'mp4'
    },
    function(urls) {
      globalLinks = urls;
      stripLinks(urls);
    }
  );
};

module.exports = function() {
  DownloadVideo("redirected");
}//dwnld;
