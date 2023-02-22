/*A unit test contains a describe function, an it function and an assertion statement. 
A unit test typically takes this form; 
1. describe( group of tests description, callback). The describe function takes two arguments a text 
   that describe the group of tests to be 
   performed and a callback. Within this callback are individual test that takes this form;
2. it(a test description, callback)  Within the latter callback there is an assertion
   statement that takes this form;
3. expect(returnedValue).toEqual(targetValue). In this assertion example, 
   expect and toEqual keywords are used to test or compare the returned value to target value.*/

import {expect, jest, test} from '@jest/globals';
import { sayHelloWorld, letterCount } from "./testDrivenDevlopment";

describe('hello world test suite', () => {
    it('check if sayHelloWorld is function',() => {
        expect(typeof sayHelloWorld).toBe('function')
    })
    it('returns a string Hello World',() => {
        expect(sayHelloWorld()).toBe('Hello World!')
    })
});


// I wanted to write a test for a hypothetical function that takes two argument,
// a character and a string, and returns the count of that chracter in the string.
describe('test suite for letterCount function', () => {
    it('is letterCount a function', () => {
        expect(typeof letterCount).toEqual('function')
    })
    it('returns the correct count of given character in a string', () => {
        let result = letterCount('l','silent')
        expect(result).toEqual(1)
    })
    it('returns undefined if given character is not in string', () => {
        let result = letterCount('p','silent')
        expect(result).toBeUndefined()
    })
})