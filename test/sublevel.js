

var test = require('tape')
var peek  = require('../')

var levelup = require('level-test')()
var sublevel = require('level-sublevel')

var db = sublevel(levelup('test-level-peek2'))

db.batch([
  {key: 'key!0000001', value: 'foo', type: 'put'},
  {key: 'key!0000002', value: 'bar', type: 'put'},
  {key: 'key!0000003', value: 'baz', type: 'put'},
  {key: '~~~', value: 'EOF', type: 'put'},
], function (err) {
  if(err) throw err


  test('last', function (t) {
    var n = 2

    peek.last(db, {gte: 'key ', lte: 'key~'}, function (err, key, value) {
      t.equal(value, 'baz')
      t.end()
    })
  })

  test('first', function (t) {
    var n = 2

    peek.first(db, {gte: 'key ', lte: 'key~'}, function (err, key, value) {
      t.equal(value, 'foo')
      t.end()
    })
  })


})

