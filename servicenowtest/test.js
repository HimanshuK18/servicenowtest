const n ="";
console.log(isNaN(n));


var add = (function () {
    var counter = 0;
    return () => { 
        console.log(this); 
        return counter += 1;
     }
})();
var add1 = add();
var add2 = add();
var add23 = add();
var add24 = add();


console.log("got it");
var a = "42";
var b = 42;

let ob = {
    "FName": "sss",
    "LName": "Sdhgsdh",
    "age": 33
};
delete ob.age;

console.log(a == b);
console.log(a === b);
console.log("delete operator does not work on non objects " + delete a);
//Immediately Invoked Function Expressions
(function IIFE() {
    console.log("Hello!");
})();
//Immediately Invoked Function Expressions with Arrow
(() => {
    console.log('Ok');
    console.log('i am this.... ' + this.toString());
})();

console.log(this.a);
//generator function
function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let iterationCount = 0;
    for (let i = start; i < end; i += step) {
        iterationCount++;
        yield i;
    }
    return iterationCount;
}

// a void function return an unfedined type
function CallHi()
{
    var tt ="pp"
    sayHi(); 
}
CallHi();
function sayHi() {
    var w = "ss";
    console.log(this);
    console.log('Hi!');
}

let speech = sayHi();
console.log(speech); // undefined
//// closers in JS
function outer() {
    var b = 10;
    function inner() {

        var a = 20;
        console.log("a= " + a + " b= " + b);
        a++;
        b++;
    }
    return inner;
}
outer();

var X = outer(); //outer() invoked the first time
var Y = outer(); //outer() invoked the second time
console.log(typeof (X)); //X is of type function
console.log(typeof (Y)); //Y is of type function

X(); // X() invoked the first time
X(); // X() invoked the second time
X(); // X() invoked the third time
Y(); // Y() invoked the first time

///////////////////////////////////