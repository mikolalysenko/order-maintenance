"use strict"

var LOGM = 30
var M = 1<<LOGM
var MASK = M - 1

module.exports = createUpperList
module.exports.M = M
module.exports.LOGM = LOGM

function UpperNode(label, next, prev) {
  this.label = label
  this.next = next
  this.prev = prev
}

var proto = UpperNode.prototype

proto.insert = function() {
  var j=1
  var cur = this.next
  var v0 = this.label
  var wj = cur ? cur.label - v0 : 0
  for(; cur && cur.label-v0 <= j*j; ++j, cur=cur.next) {
  }
  var wj = (cur.label - v0) / j
  cur = this.next
  for(var k=1; k<j; ++k, cur=cur.next) {
    cur.label = (v0 + (wj * k)|0)
  }
  var nlabel = (v0 + this.next.label)>>>1
  var result = new UpperNode(nlabel, this.next, this)
  this.next.prev = result
  this.next = result
  return result
}

proto.remove = function() {
  this.next.prev = this.prev
  this.prev.next = this.next
  this.next = this.prev = null
}

proto.compare = function(other) {
  return this.label - other.label
}

proto.split = function() {
  if(this.next) {
    var other = this.next
    this.next = new UpperNode(M-1, null, null)
    other.prev = new UpperNode(0, null, null)
    return other
  } else {
    return createUpperList()
  }
}

function createUpperList() {
  var begin = new UpperNode(0, null, null)
  var end = new UpperNode(M-1, null, begin)
  begin.next = end
  return begin
}