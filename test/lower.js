'use strict'

var createList = require('../lib/lower-list')
var testList = require('./list')

require('tape')('lower list', function (t) {
  testList(createList, t)
  t.end()
})
