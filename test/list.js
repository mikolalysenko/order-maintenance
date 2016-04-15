'use strict'

module.exports = testList

function testList (createList, t) {
  var i

  // Basic insert and compare
  var a = createList()
  var b = a.insert()
  t.equals(a.next, b)
  t.equals(b.prev, a)
  t.ok(a.compare(b) < 0)
  t.ok(b.compare(a) > 0)
  t.ok(a.compare(a) === 0)

  // More insertions
  var base = createList()
  for (i = 0; i < 1000; ++i) {
    base.insert()
  }
  var l = base.next
  while (l) {
    t.ok(l.prev.compare(l) < 0)
    t.ok(l.compare(l.prev) > 0)
    t.ok(l.compare(l) === 0)
    t.ok(l.compare(base) > 0)
    t.ok(base.compare(l) < 0)
    l = l.next
  }

  // Try remove
  for (i = 0; i < 500; ++i) {
    base.next.remove()
  }
  l = base.next
  while (l) {
    t.ok(l.prev.compare(l) < 0)
    t.ok(l.compare(l.prev) > 0)
    t.ok(l.compare(l) === 0)
    t.ok(l.compare(base) > 0)
    t.ok(base.compare(l) < 0)
    l = l.next
  }

  // Try inserting again
  for (i = 0; i < 1000; ++i) {
    base.insert()
  }
  l = base.next
  while (l) {
    t.ok(l.prev.compare(l) < 0)
    t.ok(l.compare(l.prev) > 0)
    t.ok(l.compare(l) === 0)
    t.ok(l.compare(base) > 0)
    t.ok(base.compare(l) < 0)
    l = l.next
  }
}
