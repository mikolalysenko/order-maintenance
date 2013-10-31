"use strict"

var createUpperList = require("./upper-list")
var M = createUpperList.M
var LOGM = createUpperList.LOGM
var MSTEP = (M/LOGM)|0

module.exports = createLowerList

function LowerNode(upper, label, next, prev, value) {
  this.upper = upper
  this.label = label
  this.next = next
  this.prev = prev
  this.value = value
}

var proto = LowerNode.prototype

proto.insert = function(value) {
  var n = M
  //Create node and link it
  var result = new LowerNode(this.upper, -1, this.next, this, value)
  if(this.next) {
    n = this.next.label
    this.next.prev = result
  }
  this.next = result
  //Update labels
  if(n === this.label+1) {
    //Scan to extents of subtree
    var count = 0
    var begin = this
    while(begin.prev && begin.prev.upper === this.upper) {
      begin = begin.prev
      count += 1
    }
    var end = this
    while(end.next && end.next.upper === this.upper) {
      end = end.next
      count += 1
    }
    end = end.next
    //Redistribute nodes
    var upper = this.upper
    var cur = begin
    while(true) {
      //Relabel nodes
      var label = 0
      for(var j=0; j<LOGM; ++j, cur = cur.next, label += MSTEP) {
        if(cur === end) {
          return result
        }
        cur.label = label
        cur.upper = upper
      }
      upper = upper.insert()
    }
  } else {
    result.label = Math.min((this.label + n)>>>1, this.label + LOGM)|0
  }
  return result
}

proto.remove = function() {
  var uniqueUpper = true
  if(this.next) {
    this.next.prev = this.prev
    uniqueUpper = this.next.upper !== this.upper
  }
  if(this.prev) {
    this.prev.next = this.next
    uniqueUpper = uniqueUpper && (this.prev.upper !== this.upper)
  }
  if(uniqueUpper) {
    this.upper.remove()
  }
}

proto.split = function() {
  if(this.next) {
    var other = this.next
    var nupper = this.upper.split()
    if(nupper.prev) {
      nupper = nupper.prev
    }
    this.next = null
    other.prev = null
    for(var cur=other; cur && cur.upper === this.upper; cur=cur.next) {
      cur.upper = nupper
    }
    return other
  } else {
    return null
  }
}

proto.compare = function(other) {
  var d = this.upper.compare(other)
  if(d) {
    return d
  }
  return this.label - other.label
}

function createLowerList() {
  var root = new LowerNode(createUpperList(), 0, null, null)
  if(arguments.length < 1) {
    return root
  }
  for(var i=arguments.length-1; i>=0; --i) {
    root.insert(arguments[i])
  }
  var result = root.next
  root.remove()
  return result
}