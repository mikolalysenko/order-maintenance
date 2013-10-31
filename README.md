order-maintenance
=================
A data structure for [ordered list maintenance](http://en.wikipedia.org/wiki/Order-maintenance_problem).  This generalizes a [linked list](http://en.wikipedia.org/wiki/Linked_list), except it adds the ability to query the order of any two elements in the list in constant time.   This implementation is based on Bender's O(1) amortized algorithm using two-level indirection.

# Example

```javascript
var createList = require("ordered-list")

var head = createList(1, 0, -5, 10)

var p = head.next.next

console.log(p.value)

console.log(head.compare(p))
console.log(p.compare(head)
console.log(p.compare(p))
```

# API

```javascript
var createList = require("ordered-list")
```

## Constructor

### `var head = createList(item1,item2,...)`
Creates a list with the given items

* `item1` is the value of the first item in the list
* `item2` is the value of the second item in the list
* ... and so on

**Returns** A the first node in a new ordered list data structure.  If no arguments are specified, returns a list with one node having the value `undefined`.  Terminals of the list are `null`

## Node properties

### `node.next`
The next node in the list

### `node.prev`
The previous node in the list

### `node.value`
The value of the node

### `node.compare(other)`
Compares two nodes in the list.  If `other` giving the relative position of them within the list.

* `other` is another node in the list

**Returns** A number which has the value:

* <0 if node comes before other
* 0 if node === other
* >0 if node comes after other

### `node.insert(value)`
Inserts a node immediately after `node` into the list having value `value`

* `value` is the value of the new node to insert

### `node.remove()`
Removes a node from the list, modifying the list in place

### `node.split()`
Splits the list after the node.  

**Returns** The head of the rest of the list after `node`

## Credits
(c) 2013 Mikola Lysenko. MIT
