

var test = require('tape')
var peek  = require('../')

var levelup = require('level-test')()

var db = levelup('test-level-peek')

db.batch([
  {key: 'A', value: 'apple', type: 'put'},
  {key: 'B', value: 'banana', type: 'put'},
  {key: 'C', value: 'cherry', type: 'put'},
  {key: 'D', value: 'durian', type: 'put'},
  {key: 'E', value: 'elder-berry', type: 'put'},
], function (err) {
  if(err) throw err


  test('peek.first', function (t) {
    var n = 7

    peek.first(db, {}, function (err, key, value) {
      t.equal(value, 'apple')
      t.end()
    })

  })

  test('peek.last', function (t) {

    peek.last(db, {}, function (err, key, value) {
      t.equal(value, 'elder-berry')
      t.end()
    })

  })

  test('peek.last({lte: "C"})', function (t) {

    peek.last(db, {lte: 'C'}, function (err, key, value) {
      console.log('LAST')
      t.equal(value, 'cherry')
      t.end()
    })

  })

  test('peek.last({lte: "D~"})', function (t) {

    peek.last(db, {lte: 'D~'}, function (err, key, value) {
      console.log('LAST')
      t.equal(value, 'durian')
      t.end()
    })
  })

  //start: from a middle record
  test('peek.first({start: "C"})', function (t) {

    peek.first(db, {start: 'C'}, function (err, key, value) {
      t.equal(value, 'cherry')
      t.end()
    })

  })

  //start to after the last record.
  test('peek.last({lte: "E~"})', function (t) {

    peek.last(db, {lte: 'E~'}, function (err, key, value) {
      t.equal(value, 'elder-berry')
      t.end()
    })

  })

  test("peek.last({lte: 'E~', gte: 'E!'})", function (t) {
    peek.last(db, {gte: 'E!', lte: 'E~'}, function (err, key, value) {
      t.equal(value, undefined)
      t.end()
    })
  })
})


