# biedaszyb by [@michalbe](http://github.com/michalbe) #
Massive search for files with no download limits on paid hostings


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
biedaszyb.show("Blok ekipa", 1, 1, 5, function(err, result){
  console.log(result);
  // ['http://yoelo.jczc.hwdp/3rtk7q1qv87a1' <- Array of 5 episodes of 1st season of 'Blok Ekipa' that can be downloaded without any limits
  // 'http://yoelo.jczc.hwdp/3rtk7q1qv87a2'
  // 'http://yoelo.jczc.hwdp/3rtk7q1qv87a3'
  // 'http://yoelo.jczc.hwdp/3rtk7q1qv87a4'
  // 'http://yoelo.jczc.hwdp/3rtk7q1qv87a5']
});
