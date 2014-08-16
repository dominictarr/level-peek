
var pl = require('pull-level')
var pull = require('pull-stream')

function first (cb) {
  var data
  return pull.drain(function (_data) {
    data = _data
    return false
  }, function (err) {
    cb(err === true ? null : err, data && data.key, data && data.value)
  })
}

exports.first = function (db, opts, cb) {
  opts = opts || {}
  opts.limit = 1
  pull(pl.read(db, opts), first(cb))
}

exports.last = function (db, opts, cb) {
  opts = opts || {}
  opts.reverse = true
  opts.limit = 1
  pull(pl.read(db, opts), first(cb))

}
