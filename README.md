# level-peek

peek the first or last record in a leveldb range.

## example

``` js
var levelup = require('levelup')
var db = levelup(PATH_TO_DB)

var peek = require('level-peek')

//get the first value, 'a' or after
peek.first(db, {start: 'a'}, function (err, key, value) {
  
})


//get last value, 'z' or before.
peek.last(db, {end: 'z'}, function (err, key, value) {
  
})
```

> note, it's tricky getting ranges right when doing reverse range queries.
> level-peek fixes this, by adjusting the range to make sense.
>


## License

MIT
