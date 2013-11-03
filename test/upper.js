"use strict"

var createList = require("../lib/upper-list")
var testList = require("./list")

require("tape")("upper list", function(t) {
  testList(createList, t)
  t.end()
})