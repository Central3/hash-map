import { LinkedList } from "./linkedList.mjs";

// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

/* 
  [
    index 1 = linkedlist -> [key, value], [key, value]
    index 2 = listkedlist -> [key, value]
    x16
  ]
*/

function HashMap() {
  const loadFactor = 0.75;
  let capacity = 16;
  const buckets = [];

  function hash(key) {
    const primeNumber = 31;
    let hashCode = 0;

    for (let i = 0; i < key.length; i++)
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;

    return hashCode;
  }

  function set(key, value) {
    const growthFactor = loadFactor * capacity;
    if (length() >= growthFactor) capacity *= 2;

    const index = hash(key);
    if (!buckets[index]) buckets[index] = LinkedList();

    if (buckets[index].contains(key)) {
      const pairIndex = buckets[index].find(key);
      buckets[index].removeAt(pairIndex);
    }
    buckets[index].append([key, value]);
  }

  function get(key) {
    const index = hash(key);
    if (buckets[index]) {
      const pairIndex = buckets[index].find(key);
      if (pairIndex >= 0) {
        return buckets[index].at(pairIndex);
      }
    }
    return null;
  }

  function has(key) {
    const index = hash(key);
    if (buckets[index]) return buckets[index].contains(key);
    return false;
  }

  function remove(key) {
    const index = hash(key);
    if (buckets[index] && buckets[index].contains(key)) {
      buckets[index].removeAt(buckets[index].find(key));
      return true;
    }
    return false;
  }

  function length() {
    let length = 0;

    for (const bucket of buckets) {
      if (bucket) length += bucket.size();
    }

    return length;
  }

  function clear() {
    buckets.length = 0;
  }

  function keys() {
    const keys = [];

    buckets.forEach((bucket) => {
      if (bucket) {
        let ptr = bucket.head();
        while (ptr) {
          keys.push(ptr.value[0]);
          ptr = ptr.nextNode;
        }
      }
    });

    return keys;
  }

  function values() {
    const values = [];

    buckets.forEach((bucket) => {
      if (bucket) {
        let ptr = bucket.head();
        while (ptr) {
          values.push(ptr.value[1]);
          ptr = ptr.nextNode;
        }
      }
    });

    return values;
  }

  function entries() {
    const entries = [];

    buckets.forEach((bucket) => {
      if (bucket) {
        let ptr = bucket.head();
        while (ptr) {
          entries.push(ptr.value);
          ptr = ptr.nextNode;
        }
      }
    });

    return entries;
  }

  return { set, get, has, remove, length, clear, keys, values, entries };
}

// test cases
const test = HashMap();
test.set("apple", "red");
test.set("apple", "green");
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

console.log(test.entries());
