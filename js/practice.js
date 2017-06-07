//In this practice file I recreate much of the the underscore library from scratch
//in order to practice functional programming.

var earnings = {
  earningsYr1: 2,
  earningsYr2: 246242543
}

var person = {
  name: "Gema",
  age: "Unkown",
  properties: function(){
    for (var keys in person){
      //  console.log
    }
  }
}

var numbers = [1,2,3];

var nums = [10,11,12];

var _ = {};

function cl(callback){
  console.log(callback)
}

//Each
//Iterates through a collection (being either an array, object, or array-like object)
//Each applies the iteratee to each element

_.each = function(list, iteratee){
  if (Array.isArray(list)){
    list.forEach((value, index, collection) => {
      iteratee(value, index, collection)
    });
  } else {
    for (var key in list) {
      iteratee(list[key], key, list)
    }
  }
  return list;
}


// console.log(_.each(nums, (value, index, collection) => {
//   // return collection[index] = value + 1;
//   return collection[index] = value + 100;
// }))

//remake map functionality

function map(list, iteratee){
  //will store results into a new array.
  var arr = [];
    //will do so by pushing each of the results into the created var arr;
  //will need to iterate through the list in order to apply the fx to each.
  if (Array.isArray(list)){
    list.forEach((value) => arr.push(iteratee(value)));
  } else {
    for (var key in list) {
      arr.push(list[key]);
    }
  }
  return arr;
}

// cl(map(earnings, (item) => "hello " + item))


//REDUCE

//Takes in an array, callback, accumulator
//conducts the callback on each item starting with the accumulator || arr[0]

function reduce(collection, callback, accumulator){
  if (Array.isArray(collection)){
    collection.forEach((item, index) => {
      accumulator = (accumulator === undefined) ? item : callback(accumulator, item);
    })
  }else {
    for (var key in collection){
      accumulator = (accumulator === undefined) ? collection[key] : callback(accumulator, collection[key]);
    }
  }
  return accumulator;
}

console.log(reduce(earnings, (last, next) => {
  return last > next ? last : next;
}, 1000000000));

//REDUCE RIGHT

//if collection is array.
//reduce starting from right side

//same if collection is object.

function reduceRight(collection, iteratee, memo){
  var arr = [];
  if (!Array.isArray(collection)){
    for (var key in collection){
      arr.push(collection[key])
    }
    for (var i = arr.length - 1; i >= 0; i--) {
      memo = memo === undefined ? arr[i] : iteratee(memo, arr[i]);
    }
  }else {
    for (var i = collection.length - 1; i >= 0; i--) {
      memo = memo === undefined ? collection[i] : iteratee(memo, collection[i]);
    }
  }
  return memo;
}

// cl(reduceRight(earnings, (prev, item) => {
//   return (prev > item) ? prev : item;
// }));

//FIND
//Looks through each value in a collection, returing the first value that passes a truth test.
//or undefined if no value passes the test.
//returns as soon as is true.

function find(collection, predicate) {
  if (Array.isArray(collection)){
    for (var i = 0; i < collection.length; i++) {
      if (predicate(collection[i], i, collection)) return collection[i];
    }
  }else {
    for (var key in collection){
      if (predicate(collection[key], key, collection)) return collection[key];
    }
  }
}


// cl(find([1,2,3], (item, index, collection) => {
//     if (item === 1) return item;
// }));


//FILTER

//Take an array and return all the values that pass a truth test.

function filter(collection, predicate){
  //create an array where items will be stored that pass the truth test.
  var arr = [];
  if (Array.isArray(collection)){
    collection.forEach((item, index, collection) => {
      if (predicate(item, index, collection)) arr.push(item);
    });
  } else {
    for(var key in collection){
      if (predicate(collection[key], key, collection)) arr.push(collection[key]);
    }
  }
  return arr;
}

console.log(filter({age:20, earnings: 20000, hands: 2}, (item) => item >= 10))

//WHERE

//returns an array of values where all of the keys and values match

function where(collection, properties){
  //create an array where all of the objects that match will be stored.
  var arr = [];
  //Loop through properties to push all matches to arr.
  //Will need to loop through all items in collection first to make sure that each of the properties needing to be true are true for each item in collection before moving on.
  collection.forEach((value, index, collection) => {
  //This variable counts whether the inner loop has been through all the outer properties
  var valuesCount = 0, match = true;
      //For each property, do something
      for(var key in properties){
        //1. count number of properties needing to be true. both match and count for properties will need to match.
        //2. Create a variable to make sure that all of the properties are true. Set default to true. Mark false if any are false. push to array if true.
        var propertiesCount = 0;
        //Access object properties and values at the array value.
        for (var prop in value){
          //for each item in the properties, it's going to look for the same key and value in each item and if they all match will push that to array.
          propertiesCount++;
          //Once it goes through all the props in value object, increment valuesCount.
          if (propertiesCount === Object.keys(value).length) valuesCount++;
          // if (Object.keys(properties).length === propertiesCount)0
          if (prop === key && properties[key] != value[prop]) match = false;
          //continue to go back through making sure that all of the properties match the value, and push to the array if they do.
          if ((valuesCount === Object.keys(properties).length) && match === true) {
              arr.push(value);
              // console.log(propertiesCount, prop, key, arr)
          }
          //count the number of properties checked in value,
          //if gone through all the properties in value, increment properties count.
        }
      }
  });
  return arr;
}

var peeps = [
  {name: "Gema",
  last: "David",
   age: 25},
  {name: "Gema",
  last: "Bellytron",
   age: 25}
 ]

// cl(where(peeps, {age: 25, last: "David"}))

//findWhere

//looks through a collection and returns the first value that matches a result.
function findWhere(collection, properties){
  for (var i = 0; i < collection.length; i++) {
    var valuesCount = 0, match = true;
    for (var prop in properties){
      var propertiesCount = 0;
      for (var key in collection[i]) {
        propertiesCount++;
        if (propertiesCount === Object.keys(collection[i]).length) valuesCount++;
        if (prop === key && collection[i][key] !== properties[prop]) match = false;
        if (valuesCount === Object.keys(properties).length && match === true) return collection[i];
      }
    }
  }
}

// cl(findWhere(peeps, {name:"Gema", last: "Bellytron"}));

//REJECT

//returns all the elements in the list without the elements that the truth test passes.

function reject(collection, predicate){
  arr = [];

  return filter(collection, (item) => {
    return !predicate(item);
  });

  // collection.forEach((item)=>{
  //   if (!predicate(item)) arr.push(item);
  // })
  // return arr;

}

// cl(reject([1,2,3], (item) => item === 7));

//EVERY

//Returns true if all of the items in a collection pass a truth test.

function every(collection, predicate){
  //Create value to be returned. Start with default of true. If any do not match, just return that.
  var match = true;
  //check if collection is array
  if (Array.isArray(collection)){
    //sIterate through each collection item to identify whether each item passes the test.
    return collection.reduce((prev, next)=>{
      if (!prev) return false;
      if (predicate(next)) return false;
    },true)
    // collection.forEach((item)=>{
    //   if (!match) return match;
    //   if (!predicate(item)) match = false;
    // })
  }else{
    for(var key in collection) {
      if (!match) return match;
      if (!predicate(collection[key])) match = false;
    }
  }
  return match;
}

// cl(every([1,2,3], (item) => item < 10));

//SOME

//Returns true if any of the items match the truth test.

function some(collection, predicate){
  var match = false;
  //Test for arrays
  return !every(collection, (item) => {
    return !predicate(item)
  })
}

// cl(some([1,2,3], item => item === 4));

//CONTAINS

//Returns true if the value passed is present in the list.
//uses indexOf if array.
//passes start index value.

function contains(list, value, startIndex) {

  //differentiate between object and array
  if (Array.isArray(list)) {
    return (list.indexOf(value) === -1) ? false: true;
  } else {
    //is an object
    for (var key in list){
      if (list[key] === value) return true;
    }
    return false;

  }
}
cl(contains({age: 28}, 28));

//INVOKE

//Calls the named method on each of the items.
// function invoke(list, methodName, arguments){
//   return list.map((item, index, collection)=>{
//     return
//   })
// }

//PLUCK

//take a collection
//grab all of the values associated the the key provided.

function pluck(collection, propertyName){
  //Use map since something will need to be done on every single item in the array.
  return collection.map(item => item[propertyName]);
}
console.log(pluck([{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}], 'age'));

//MAX

//returns largest value in list with given criteria.

function max(list, iteratee){
  if (list.length === 0) return -Infinity;
  return reduce(list, (prev, next)=> {
    return (iteratee === undefined) ? (prev > next) ? prev : next : iteratee(prev) > iteratee(next) ? prev : next;
  })
}

cl(max([1,2,3]));

//MIN

//returns smallest value in list by criteria provided.

function min(list, iteratee) {
  if (list.length === 0) return -Infinity;
  return reduce(list, (prev, next) => {
    return (iteratee === undefined) ? (prev < next) ? prev : next : iteratee(prev) < iteratee(next) ? prev : next;
  });
}

cl(min([1,2,3]));

//SHUFFLE

//get a random number from an array and return

function shuffle(list){
  var arr = [];

  for (var i = list.length; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * ((list.length - 1) - 0 + 1)) + 0,
        number = list.splice(randomIndex, 1)[0];
        arr.push(number);
  }

    return arr;

}

cl(shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]));


//redo forEach

//redo Map
//Map is just a for each that has an array inside and pushes to that then returns.

//reduce

function reduce(collection, iteratee, accumulator){
  //iteratee through each item in the collection and set value of accumulator each time.
  if (Array.isArray(collection)){
    collection.forEach((item)=>{
      accumulator = accumulator === undefined ? item : iteratee(accumulator, item);
    });
  } else {
    for (var key in collection){
      accumulator = accumulator === undefined ? collection[key] : iteratee(accumulator, collection[key]);
    }
  }
  return accumulator;
}

cl(reduce([1,2,3], (prev, next) => {
  return (prev < next) ? prev : next;
}, 0));


//Filter

//filter returns all of the objects that are true based on the criteria provided

function filter(collection, predicate){

  var arr = [];
  if (Array.isArray(collection)){
    collection.forEach(item=>{
      if (predicate(item)) arr.push(item);
    })
  } else {
    for (var key in collection){
      if (predicate(collection[key])) arr.push(collection[key]);
    }
  }

  return arr;
}

// console.log(filter({name: "dave", hobbies: {sports: "football", art: "painting " }}, item => item.hobbies.sports == "football"))
