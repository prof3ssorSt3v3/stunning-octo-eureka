(() => {
  //iterable vs enumerable

  //Arrays, Strings, HTMLCollection, NodeList are Iterable and Enumerable
  let names = ['Tina', 'Louise', 'Gene', 'Bob', 'Linda'];

  //Objects are Enumerable but not Iterable
  let obj = {
    character: 'Bob Belcher',
    id: 123,
  };
  Object.defineProperty(obj, 'show', {
    value: "Bob's Burgers",
    writable: false,
    enumerable: false,
    configurable: false,
  });
  // obj.show = 'Supernatural'; //fails because writable: false

  //loop through Iterable with for, for..in, for..of, .forEach()
  //Iterable objects have an Iterator property
  for (let prop of names) {
    console.log(`ITERABLE ${prop}`); //values
  }

  //loop through Enumerable with for..in only
  for (let prop in obj) {
    console.log(`ENUMERABLE ${prop}`); //keys (property names)
  }

  //add an iterator to the object
  addIterator(obj);
  //the following ONLY works if the object has an Iterator
  for (let prop of obj) {
    console.log(`ITERABLE ${prop}`);
  }

  bob();
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
          case 3:
            index++;
            return { done: false, value: Math.sin(1) };
          default:
            return { done: true, value: undefined };
        }
      },
    };
  };
}

function* hello() {
  yield 123;
  console.log('after the first call to next()');
  yield 'hello';
  yield 'John';
}

function bob() {
  let myIterator = hello();
  console.log(myIterator.next());
  console.log(myIterator.next());
  console.log(myIterator.next());
  console.log(myIterator.next());

  // for (let val in hello()) {
  //   console.log(val);
  // }
}
