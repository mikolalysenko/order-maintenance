"use strict"

module.exports = testList

function testList(createList, t) {
  var a = createList()  
  var b = a.insert()
  t.ok(a.compare(b) < 0)
  t.ok(b.compare(a) > 0)
  t.ok(a.compare(a) === 0)

  var l = createList()
  for(var i=0; i<1000; ++i) {
    l.insert()
  }
  var base = l
  l = l.next
  while(l) {
    t.ok(l.prev.compare(l) < 0)
    t.ok(l.compare(l.prev) > 0)
    t.ok(l.compare(l) === 0)
    t.ok(l.compare(base) > 0)
    t.ok(base.compare(l) < 0)
    l = l.next
  }
}