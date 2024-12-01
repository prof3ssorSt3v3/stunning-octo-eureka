(() => {
  //iterable vs enumerable

  //Arrays are Iterable and Enumerable
  let names = ['Tina', 'Louise', 'Gene', 'Bob', 'Linda'];

  //Objects are Enumerable but not Iterable
  let obj = {
    id: 123,
    character: 'Bob Belcher',
  };
  Object.defineProperty(obj, 'show', {
    value: "Bob's Burgers",
    writable: false,
    enumerable: false,
    configurable: false,
  });

  //loop through Iterable with for, for..in, for..of, .forEach()
  for (let prop of names) {
    console.log(`ITERABLE ${prop}`);
  }

  //loop through Enumerable with for..in only
  for (let prop in obj) {
    console.log(`ENUMERABLE ${prop}`);
  }

  //add an iterator to the object
  addIterator(obj);
  //the following ONLY works if the object has an Iterator
  for (let prop of obj) {
    console.log(`ITERABLE ${prop}`);
  }
})();

function addIterator(obj) {
  //Symbol.iterator is like a hidden reserved property name used to add
  //an iterator to any object.
  obj[Symbol.iterator] = function () {
    //the iterator function returns an object with a property called next
    //the next property is a function that gets called with each iteration of
    //a for of loop, for in loop, forEach() method call
    let index = 0;
    return {
      next: () => {
        switch (index) {
          case 0:
            index++;
            return { done: false, value: obj.id };
          case 1:
            index++;
            return { done: false, value: obj.character };
          case 2:
            index++;
            return { done: false, value: obj.show };
          default:
            return { done: true, value: undefined };
        }
      },
    };
  };
}
