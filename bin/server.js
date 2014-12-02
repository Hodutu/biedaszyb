'use strict';

var http = require('http');
var biedaszyb = require('../');

http.createServer(function (req, res) {
  var args = req.url.slice(1).split('/');

  var title = args[0];
  var season = parseInt(args[1], 10);
  var start = parseInt(args[2], 10);
  var howManyEpisodes = parseInt(args[3], 10);

  if (title && season && start && howManyEpisodes) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    console.log('searching...');
    biedaszyb.show(title, season, start, howManyEpisodes, function(err, result){
      if (err) {
        console.log(err);
        return;
      }

      console.log(result);

      result.forEach(function(link){
        res.write(link + '\n');
      });

      res.end();
    });
  }
}).listen(1337, '127.0.0.1');
