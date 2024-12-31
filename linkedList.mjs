export function LinkedList() {
  let headPtr = null;

  function append(value) {
    let newNode = Node();
    newNode.value = value;

    if (headPtr === null) {
      headPtr = newNode;
    } else {
      let ptr = headPtr;
      while (ptr.nextNode !== null) ptr = ptr.nextNode;
      ptr.nextNode = newNode;
    }
  }

  function prepend(value) {
    let newNode = Node();
    newNode.value = value;

    if (headPtr !== null) newNode.nextNode = headPtr;
    headPtr = newNode;
  }

  function size() {
    let ptr = headPtr;
    let count = 0;

    while (ptr !== null) {
      count++;
      ptr = ptr.nextNode;
    }

    return count;
  }

  function head() {
    return headPtr;
  }

  function tail() {
    let ptr = headPtr;

    while (ptr.nextNode !== null) {
      ptr = ptr.nextNode;
    }

    return ptr;
  }

  function at(index) {
    let ptr = headPtr;
    let count = 0;

    while (ptr !== null) {
      if (count === index) return ptr.value[1];
      count++;
      ptr = ptr.nextNode;
    }
  }

  function pop() {
    let ptr = headPtr;

    if (headPtr !== null) {
      if (headPtr.nextNode === null) {
        // delete ptr;
        headPtr = null;
      } else {
        let preptr = ptr;
        while (ptr.nextNode !== null) {
          preptr = ptr;
          ptr = ptr.nextNode;
        }

        preptr.nextNode = null;
        // delete ptr;
      }
    }
  }

  function contains(value) {
    let ptr = headPtr;

    while (ptr !== null) {
      if (ptr.value[0] === value) return true;
      ptr = ptr.nextNode;
    }
    return false;
  }

  function find(value) {
    let ptr = headPtr;
    let index = 0;

    while (ptr != null) {
      if (ptr.value[0] === value) return index;
      index++;
      ptr = ptr.nextNode;
    }

    return null;
  }

  function toString() {
    let ptr = headPtr;

    while (ptr !== null) {
      process.stdout.write(`( ${ptr.value} ) -> `);
      ptr = ptr.nextNode;
    }

    process.stdout.write("null");
  }

  function insertAt(value, index) {
    let ptr = headPtr;
    let count = 0;
    let preptr = ptr;

    if (index === 0) {
      prepend(value);
      return;
    }

    while (ptr != null) {
      let newNode = Node();
      newNode.value = value;
      if (index === count) {
        newNode.nextNode = ptr;
        preptr.nextNode = newNode;
        return;
      }
      count++;
      preptr = ptr;
      ptr = ptr.nextNode;
    }
  }

  function removeAt(index) {
    let ptr = headPtr;
    let count = 0;
    let preptr = ptr;

    if (index === 0) {
      headPtr = ptr.nextNode;
      // delete ptr;
      return;
    }

    while (ptr !== null) {
      if (index === count) {
        preptr.nextNode = ptr.nextNode;
        // delete ptr;
      }
      count++;
      preptr = ptr;
      ptr = ptr.nextNode;
    }
  }

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}

function Node() {
  let value = null;
  let nextNode = null;

  return { value, nextNode };
}

// simple test
// const list = LinkedList();
// list.append("dog");
// list.append("cat");
// list.append("parrot");
// list.append("hamster");
// list.append("snake");
// list.append("turtle");
// list.toString();
