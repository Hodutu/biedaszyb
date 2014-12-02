# biedaszyb by [@michalbe](http://github.com/michalbe) #
Search for free, unlimit files on paid hostings


### What? ###
`biedaszyb` [eng. bootleg mine] helps in finding files on paid hosting sites and uses [filebit.pl](http://filebit.pl) proxy to download them without limits. Valid 'filebit' account needed.

### API: ###

'biedaszyb' has only two methods:

* __file(title, callback)__:

for one link.

* __show(title, season, firstEpisode, numberOfEpisodes, callback)__:

returns array of arrays the links to the tv shows.

### How to use: ###
```
npm install biedaszyb
```
create 'biedaconfig.json' file with your `filebit` credentials (use blank `biedaconfig.json.example` to keep proper file format).
Then:
```javascript
var biedaszyb = require('biedaszyb');

// to grab just one file
biedaszyb.show("Blok ekipa", 1, 1, 20, function(err, result){
  console.log(result);
  // 'http://yoelo.jczc.hwdp/3rtk7q1qv87a' <- file that could be downloaded without any limits
});
