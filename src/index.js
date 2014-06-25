var http = require('http');
var dwnld = require('./helpers/download');

//http.createServer(function (req, res) {
  // var args = req.url.slice(1).split('/');
  //
  // var title = args[0];
  // var start = parseInt(args[1], 10);
  // var howManyEpisodes = parseInt(args[2], 10);

  //res.writeHead(200, {'Content-Type': 'text/plain'});

  dwnld();


//}).listen(1337, '127.0.0.1');
