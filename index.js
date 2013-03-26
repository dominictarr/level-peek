var fixRange = require('level-fix-range')
//get the first/last record in a range

exports = module.exports = first
exports.first    = first
exports.last     = last

function once(emitter, events, listener) {
  var remove = []
  events.forEach(function (e) {
    function onEvent (arg) {
      listener(e, arg)
      remove.forEach(function (r) {
        r()
      })
    }
    emitter.on(e, onEvent)
    remove.push(function () {
      emitter.removeListener(e, onEvent)
    })
  })
  return emitter
}


function peek (db, opts, cb) {
  var stream = once(db.createReadStream(opts), 
    ['data', 'error', 'end'],
    function (event, data) {
      if(event == 'error') cb(data)
      else if(event == 'end') cb(new Error('range not found'), null, null)
      else cb(null, data.key, data.value)
    })
}

function first (db, opts, cb) {
  opts.reverse = false
  return peek(db, fixRange(opts), cb)  
}

function last (db, opts, cb) {
  opts.reverse = true
  return peek(db, fixRange(opts), cb)
}
