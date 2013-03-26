

var test = require('tape')
var peek  = require('../')

var levelup = require('levelup')

var db = levelup('/tmp/test-level-peek')

db.batch([
  {key: 'A', value: 'apple', type: 'put'},
  {key: 'B', value: 'banana', type: 'put'},
  {key: 'C', value: 'cherry', type: 'put'},
  {key: 'D', value: 'durian', type: 'put'},
  {key: 'E', value: 'elder-berry', type: 'put'},
], function (err) {
  if(err) throw err


  test('peek', function (t) {
    var n = 4

    peek.first(db, {}, function (err, key, value) {
      t.equal(value, 'apple')
      next()
    })

    peek.last(db, {}, function (err, key, value) {
      t.equal(value, 'elder-berry')
      next()
    })

    peek.last(db, {end: 'C'}, function (err, key, value) {
      console.log('LAST')
      t.equal(value, 'cherry')
      next()
    })

    peek.first(db, {start: 'C'}, function (err, key, value) {
      t.equal(value, 'cherry')
      next()
    })

    function next () {
      if(--n) return
      console.log('END')
      t.end()
    }
  })

/*  test('stream', function () {
    db.createReadStream({reverse:true, start: 'B~'})
      .on('data', console.log)

  })
*/
})


