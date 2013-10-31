"use strict"

var createList = require("../ordered-list.js")


require("tape")(function(t) {

  var l = createList(100, 10, 5, 8, 100, "potato")

  console.log(l.compare(l.next.next))

  var p  = l.next.next.next.split()

  console.log(p.value)


  t.end()
})