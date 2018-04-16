/*
STACK
Abstract data type
LIFO - Last in, first out
Collection of elements with push and pop operations.
Note that there is a natural order. Elements are removed in the reverse order of their addition.
DO NOT use an array and the native push/pop method in your implementation. That's too easy, yeah? =P
Use an object as the underlying data structure.
*** Operations:
myStack.push(value)
=> count of stack
add value to collection
myStack.pop()
=> most recent element added collection
Remove item so that it is no longer in collection
myStack.peek()
=> most recent element added collection
Similiar to pop, but do not remove element from collection
myStack.count()
=> number of elements in stack
*** Additional Exercises:
Modify your stack to take a max capacity and return a string if you try to add an element when there's no more room:
myStack.push(value)
=> "Max capacity already reached. Remove element before adding a new one."
Create a contains method to check if a value is in the stack:
myStack.contains('findme')
=> true/false
What's the time complexity?
Create an until method to get the number of pops until you get to a certain value:
stack values - (first)2-5-7-3-6-9(last)
myStack.until(7)
=> 4
What's the time complexity?
 */

function Node (value) {
    this.value = value
    this.next = null
}

function Stack (capacity) {
  // implement me...
  this.capacity = capacity
  this.nodes = {
      bottom: null,
      top: null
  }
  this.size = 0,
  this.minimum = null
}

Stack.prototype.push = function (value) {
  // implement me...
  // check if the max capacity is reached
  if (this.capacity <= this.size) {
    return "Max capacity already reached. Remove element before adding a new one."
  }
  let currentNode = this.nodes.bottom
  let newNode = new Node(value) 
  if (!currentNode) {
    this.nodes.bottom = newNode
    this.minimum = newNode.value
  } else {
    while (currentNode.next !== null) {
      currentNode = currentNode.next
    }
    currentNode.next = newNode
    if (this.minimum > newNode.value) {
      this.minimum = newNode.value
    }
  }
  this.nodes.top = newNode
  this.size++   
  return this.size
};
// Time complexity: O(N)

Stack.prototype.pop = function () {
    let currentNode = this.nodes.bottom
    let topNode = this.nodes.top
    let output = undefined

    // prompt error if trying to remove element from empty stack
    if (this.size === 0) {
      return false
    }

    if (this.minimum === this.nodes.top.value) {
      this.minimum = this.nodes.bottom.value
    }

    // if there's only one element in the stack, set bottom and top to null
    if (currentNode === topNode) {
      output = currentNode.value
      this.nodes.bottom = null
      this.nodes.top = null
      this.minimum = null
    }

    // traverse to the second last node and delete the next node
    while (currentNode.next) {
      if (this.minimum > currentNode.value) {
        this.minimum = currentNode.value
      }
      if (currentNode.next === topNode) {
        output = this.nodes.top.value
        currentNode.next = null
        this.nodes.top = currentNode
        break
      }
      currentNode = currentNode.next
    }
    this.size--
    return output

  // implement me...
};
// Time complexity: O(N)

Stack.prototype.peek = function () {
  // implement me...
  if (this.size <= 0) {
    return false
  }
  return this.nodes.top.value  
};
// Time complexity: O(1)

Stack.prototype.count = function () {
  // implement me...
  return this.size
};
// Time complexity: O(1)

Stack.prototype.contains = function (value) {
  let currentNode = this.nodes.bottom
  // traverse the stack to check the nodes

  // check end node
  if (currentNode.value === value) {
    return true
  }
  
  while (currentNode.next) {
    currentNode = currentNode.next
    if (currentNode.value === value) {
      return true
    }
  }
  return false
}
// Time complexity: O(N)

Stack.prototype.until = function (value) {
  let count = this.size
  let currentNode = this.nodes.bottom

  while(currentNode.next) {
    if (currentNode.value === value) {
      break
    }
    currentNode = currentNode.next    
    count--
  }
  return count > 0 ? count : "not found"
}
// Time complexity: O(N)

// 1. Implement a stack with a minimum method which returns the minimum element currently in the stack. This method should have O(1) time complexity. Make sure your implementation 

Stack.prototype.min = function () {
  return this.minimum
}
// Time complexity: O(1)

// 2. Sort a stack so that its elements are in ascending order.
Stack.prototype.sort = function () {
  let newStack = new Stack(this.capacity)
  // let currentNode = this.nodes.bottom
  let innerNode = this.nodes.bottom
  let iterations = 0

  while(iterations < this.size) {
    innerNode = this.nodes.bottom
    while(innerNode.next) {
      // bubble sort
      if (innerNode.value > innerNode.next.value) {
        // simple swap without adding variables 
        innerNode.next.value = innerNode.value + innerNode.next.value
        innerNode.value = innerNode.next.value - innerNode.value
        innerNode.next.value = innerNode.next.value - innerNode.value
      }
      innerNode = innerNode.next
    }
    iterations++
  }
}
// Time complexity: O(N^2)

// 3. Given a string, determine if the parenthesis in the string are balanced.
function balancedParens(str) {
  let stack = new Stack(str.length)
  str.split('').forEach(s => {
    if (s === '(') {
      stack.push(s)
    }

    if (s === ')') {
      if (!stack.pop()) return false
    }
  })
  if (stack.size > 0) {
    return  false
  }
  return true
}

// 4. Tower of Hanoi
function towerOfHanoi(size) {
  let s1 = new Stack(size)
  let s2 = new Stack(size)
  let s3 = new Stack(size)
  // let currentPiece = null

  for (var i = 0; i < size; i ++) {
    s1.push(size - i)
  }
  console.log(s1, s2, s3)
  if (size % 2 === 0) {
    while (s1.size > 0 || s2.size > 0) {
      // a -> b
      move(s1, s2)
      // a -> c
      move(s1, s3)
      // b -> c
      move(s2, s3)
      // console.log(s1, s2, s3) 
    }
  } else {
    // if the size of the tower is even
    while (s1.size > 0 || s2.size > 0) {
      // a -> c
      move(s1, s3)
      // a -> b
      move(s1, s2)
      // b -> c
      move(s2, s3)
      // console.log(s1, s2, s3)
    }
  }
  console.log(s1, s2, s3)

  function move(_s1, _s2) {
    if ((_s1.peek() < _s2.peek() && _s1.size > 0) || _s2.peek() === false) {
      _s2.push(_s1.pop())
    } else {
      _s1.push(_s2.pop())
    }
  }
}

let a = new Stack(10)
a.push(9)
a.push(5)
a.push(2)
a.push(10)
a.push(7)
a.push(11)
a.push(1)
a.pop()
// console.log(a)
// console.log(a.until(11))
a.min()
a.sort()


/*
*** Exercises:
1. Implement a stack with a min method which returns the minimum element currently in the stack. This method should have O(1) time complexity. Make sure your implementation handles duplicates.
2. Sort a stack so that its elements are in ascending order.
3. Given a string, determine if the parenthesis in the string are balanced.
Ex: balancedParens( 'sqrt(5*(3+8)/(4-2))' ) => true
Ex: balancedParens( 'Math.min(5,(6-3))(' ) => false
4. Towers of Hanoi - https://en.wikipedia.org/wiki/Tower_of_Hanoi
You are given three towers (stacks) and N disks, each of different size. You can move the disks according to three constraints:
   1. only one disk can be moved at a time
   2. when moving a disk, you can only use pop (remove the top element) and push (add to the top of a stack)
   3. no disk can be placed on top of a disk that is smaller than it
The disks begin on tower#1. Write a function that will move the disks from tower#1 to tower#3 in such a way that none of the constraints are violated.
 */

