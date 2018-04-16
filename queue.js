/*

QUEUE

Abstract data type
FIFO - First in, first out
Collection of elements with enqueue and dequeue operations.
Note that there is a natural order. Elements are removed in the reverse order of their addition.

DO NOT use an array and the native push/shift method in your implementation. Use an object as the underlying data structure.


*** Operations:

myQueue.enqueue(value)
=> count of queue
add value to collection

myQueue.dequeue()
=> oldest element added collection
Remove item so that it is no longer in collection

myQueue.peek()
=> oldest element added collection
Similiar to dequeue, but do not remove element from collection

myQueue.count()
=> number of elements in queue


*** Additional Exercises:

Modify your queue to take a max capacity and return a string if you try to add an element when there's no more room:
myQueue.enqueue(value)
=> "Max capacity already reached. Remove element before adding a new one."

Create a contains method to check if a value is in the queue:
myQueue.contains('findme')
=> true/false
What's the time complexity?

Create an until method to get the number of dequeues until you get to a certain value:
queue values - (first)2-5-7-3-6-9(last)
myQueue.until(7)
=> 3
What's the time complexity?




 */

function Queue(capacity) {
    // implement me...
    this.capacity = capacity
    this.nodes = {
        first: null,
        last: null
    },
    this.size = 0,
    this.Node = function(value) {
        this.last = null,
        this.next = null,
        this.value = value
    }
  }
  
  Queue.prototype.enqueue = function(value) {
    // implement me...
    if (this.size >= this.capacity) {
        return "Max capacity already reached. Remove element before adding a new one."
    }

    let currentNode = this.nodes.last
    let newNode = new this.Node(value)
    // if there are nothing in the queue
    if (!currentNode) {
        this.nodes.last = newNode
    } else {
        while (currentNode.next) {
            currentNode.next
        }
        currentNode.next = newNode
        currentNode.next.last = currentNode
    }
  };
  // Time complexity:
  
  Queue.prototype.dequeue = function() {
    // implement me...
  };
  // Time complexity:
  
  Queue.prototype.peek = function() {
    // implement me...
  };
  
  Queue.prototype.count = function() {
    // implement me...
  };
  // Time complexity:
  
  
  
  /*
  *** Exercises:
  
  1. Implement a queue using two stacks.
  
  2. Implement a double-ended queue, with the following methods: enqueueLeft, dequeueLeft, enqueueRight, dequeueRight.
  
  3. Given a tree, print out the value of each node in breadth-first order using a queue data structure.
  
  
   */