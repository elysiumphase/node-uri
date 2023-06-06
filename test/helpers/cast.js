const { expect } = require('../Common');
const { cast: { num, number, int, integer } } = require('../../src/helpers');

describe('#cast helper', function() {
  context('when using number', function() {
    it('should return the primitive number value of a number', function() {
      expect(number(0)).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(number(1)).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(number(new Number(0))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(number(new Number(1))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(number(new Number(5))).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(number(Number(0))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(number(Number(1))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(number(Number(5))).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(number(5.5)).to.be.a('number').and.to.equals(5.5).and.to.not.be.an('object');
      expect(number(0xFF)).to.be.a('number').and.to.equals(255).and.to.not.be.an('object');
      expect(number(0b111110111)).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
      expect(number(0o767)).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
    });

    it('should return the primitive number value of a string representing a number', function() {
      expect(number('0')).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(number('1')).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(number('5')).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(number('5.5')).to.be.a('number').and.to.equals(5.5).and.to.not.be.an('object');
      expect(number('0xFF')).to.be.a('number').and.to.equals(255).and.to.not.be.an('object');
      expect(number('0b111110111')).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
      expect(number('0o767')).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
    });

    it('should return the primitive number value of a boolean', function() {
      expect(number(true)).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(number(false)).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(number(new Boolean(true))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(number(new Boolean(false))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(number(Boolean(1))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(number(Boolean(0))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
    });

    it('should return undefined when casting an infinite number', function() {
      expect(number(Infinity)).to.be.undefined;
      expect(number(-Infinity)).to.be.undefined;
      expect(number('Infinity')).to.be.undefined;
      expect(number('-Infinity')).to.be.undefined;
    });

    it('should return undefined when casting a symbol', function() {
      expect(number(Symbol('s'))).to.be.undefined;
    });

    it('should return undefined when casting a function', function() {
      expect(number(function f() {})).to.be.undefined;
    });

    it('should return undefined when casting a class', function() {
      expect(number(class c {})).to.be.undefined;
    });

    it('should return undefined when casting an error', function() {
      expect(number(new Error('error'))).to.be.undefined;
    });

    it('should return undefined when casting an array', function() {
      expect(number([])).to.be.undefined;
      expect(number([1, 2, 3])).to.be.undefined;
      expect(number([[1, 2], [3, 4, 5]])).to.be.undefined;
      expect(number(Array(5))).to.be.undefined;
      expect(number(new Array(1, 2, 3))).to.be.undefined;
    });

    it('should return undefined when casting an object', function() {
      expect(number({})).to.be.undefined;
      expect(number({ x: 5 })).to.be.undefined;
      expect(number(new function() {})).to.be.undefined;
    });

    it('should return undefined when casting a map', function() {
      expect(number(new Map())).to.be.undefined;
    });

    it('should return undefined when casting a set', function() {
      expect(number(new Set())).to.be.undefined;
    });

    it('should return undefined when casting a weakmap', function() {
      expect(number(new WeakMap())).to.be.undefined;
    });

    it('should return undefined when casting a weakset', function() {
      expect(number(new WeakSet())).to.be.undefined;
    });

    it('should return undefined when casting undefined', function() {
      expect(number(undefined)).to.be.undefined;
    });

    it('should return undefined when casting null', function() {
      expect(number(null)).to.be.undefined;
    });

    it('should return undefined when casting NaN', function() {
      expect(number(NaN)).to.be.undefined;
    });
  });

  context('when using num (that uses number function)', function() {
    it('should return the primitive number value of a number', function() {
      expect(num(0)).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(num(1)).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(num(new Number(0))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(num(new Number(1))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(num(new Number(5))).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(num(Number(0))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(num(Number(1))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(num(Number(5))).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(num(5.5)).to.be.a('number').and.to.equals(5.5).and.to.not.be.an('object');
      expect(num(0xFF)).to.be.a('number').and.to.equals(255).and.to.not.be.an('object');
      expect(num(0b111110111)).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
      expect(num(0o767)).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
    });

    it('should return the primitive number value of a string representing a number', function() {
      expect(num('0')).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(num('1')).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(num('5')).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(num('5.5')).to.be.a('number').and.to.equals(5.5).and.to.not.be.an('object');
      expect(num('0xFF')).to.be.a('number').and.to.equals(255).and.to.not.be.an('object');
      expect(num('0b111110111')).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
      expect(num('0o767')).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
    });

    it('should return the primitive number value of a boolean', function() {
      expect(num(true)).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(num(false)).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(num(new Boolean(true))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(num(new Boolean(false))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(num(Boolean(1))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(num(Boolean(0))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
    });

    it('should return undefined when casting an infinite number', function() {
      expect(num(Infinity)).to.be.undefined;
      expect(num(-Infinity)).to.be.undefined;
      expect(num('Infinity')).to.be.undefined;
      expect(num('-Infinity')).to.be.undefined;
    });

    it('should return undefined when casting a symbol', function() {
      expect(num(Symbol('s'))).to.be.undefined;
    });

    it('should return undefined when casting a function', function() {
      expect(num(function f() {})).to.be.undefined;
    });

    it('should return undefined when casting a class', function() {
      expect(num(class c {})).to.be.undefined;
    });

    it('should return undefined when casting an error', function() {
      expect(num(new Error('error'))).to.be.undefined;
    });

    it('should return undefined when casting an array', function() {
      expect(num([])).to.be.undefined;
      expect(num([1, 2, 3])).to.be.undefined;
      expect(num([[1, 2], [3, 4, 5]])).to.be.undefined;
      expect(num(Array(5))).to.be.undefined;
      expect(num(new Array(1, 2, 3))).to.be.undefined;
    });

    it('should return undefined when casting an object', function() {
      expect(num({})).to.be.undefined;
      expect(num({ x: 5 })).to.be.undefined;
      expect(num(new function() {})).to.be.undefined;
    });

    it('should return undefined when casting a map', function() {
      expect(num(new Map())).to.be.undefined;
    });

    it('should return undefined when casting a set', function() {
      expect(num(new Set())).to.be.undefined;
    });

    it('should return undefined when casting a weakmap', function() {
      expect(num(new WeakMap())).to.be.undefined;
    });

    it('should return undefined when casting a weakset', function() {
      expect(num(new WeakSet())).to.be.undefined;
    });

    it('should return undefined when casting undefined', function() {
      expect(num(undefined)).to.be.undefined;
    });

    it('should return undefined when casting null', function() {
      expect(num(null)).to.be.undefined;
    });

    it('should return undefined when casting NaN', function() {
      expect(num(NaN)).to.be.undefined;
    });

    it('should return the specified number value when casting a number that is in the specified range', function() {
      expect(num(5, { ge: 4, le: 9 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(num(5, { ge: 0 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(num(5, { le: 100 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(num(5, { le: 5 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(num(5, { ge: 5 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');

      expect(num('5', { ge: 4, le: 9 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(num('5', { ge: 0 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(num('5', { le: 100 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(num('5', { le: 5 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(num('5', { ge: 5 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
    });

    it('should return undefined when casting a number that is out of the specified range', function() {
      expect(num(5, { ge: 6, le: 9 })).to.be.undefined;
      expect(num(5, { ge: 6 })).to.be.undefined;
      expect(num(5, { le: 4 })).to.be.undefined;

      expect(num('5', { ge: 6, le: 9 })).to.be.undefined;
      expect(num('5', { ge: 6 })).to.be.undefined;
      expect(num('5', { le: 4 })).to.be.undefined;
    });

    it('should return undefined when casting a number whose specified range is not valid', function() {
      expect(num(5, { ge: 4, le: 2 })).to.be.undefined;
    });
  });

  context('when using integer', function() {
    it('should return the primitive integer value of a number', function() {
      expect(integer(0)).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(integer(1)).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(integer(new Number(0))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(integer(new Number(1))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(integer(new Number(5))).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(integer(Number(0))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(integer(Number(1))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(integer(Number(5))).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(integer(5.5)).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(integer(0xFF)).to.be.a('number').and.to.equals(255).and.to.not.be.an('object');
      expect(integer(0b111110111)).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
      expect(integer(0o767)).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
    });

    it('should return the primitive integer value of a string representing a number', function() {
      expect(integer('0')).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(integer('1')).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(integer('5')).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(integer('5.5')).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(integer('0xFF')).to.be.a('number').and.to.equals(255).and.to.not.be.an('object');
      expect(integer('0b111110111')).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
      expect(integer('0o767')).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
    });

    it('should return the primitive integer value of a boolean', function() {
      expect(integer(true)).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(integer(false)).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(integer(new Boolean(true))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(integer(new Boolean(false))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(integer(Boolean(1))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(integer(Boolean(0))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
    });

    it('should return undefined when casting an infinite number', function() {
      expect(integer(Infinity)).to.be.undefined;
      expect(integer(-Infinity)).to.be.undefined;
      expect(integer('Infinity')).to.be.undefined;
      expect(integer('-Infinity')).to.be.undefined;
    });

    it('should return undefined when casting a symbol', function() {
      expect(integer(Symbol('s'))).to.be.undefined;
    });

    it('should return undefined when casting a function', function() {
      expect(integer(function f() {})).to.be.undefined;
    });

    it('should return undefined when casting a class', function() {
      expect(integer(class c {})).to.be.undefined;
    });

    it('should return undefined when casting an error', function() {
      expect(integer(new Error('error'))).to.be.undefined;
    });

    it('should return undefined when casting an array', function() {
      expect(integer([])).to.be.undefined;
      expect(integer([1, 2, 3])).to.be.undefined;
      expect(integer([[1, 2], [3, 4, 5]])).to.be.undefined;
      expect(integer(Array(5))).to.be.undefined;
      expect(integer(new Array(1, 2, 3))).to.be.undefined;
    });

    it('should return undefined when casting an object', function() {
      expect(integer({})).to.be.undefined;
      expect(integer({ x: 5 })).to.be.undefined;
      expect(integer(new function() {})).to.be.undefined;
    });

    it('should return undefined when casting a map', function() {
      expect(integer(new Map())).to.be.undefined;
    });

    it('should return undefined when casting a set', function() {
      expect(integer(new Set())).to.be.undefined;
    });

    it('should return undefined when casting a weakmap', function() {
      expect(integer(new WeakMap())).to.be.undefined;
    });

    it('should return undefined when casting a weakset', function() {
      expect(integer(new WeakSet())).to.be.undefined;
    });

    it('should return undefined when casting undefined', function() {
      expect(integer(undefined)).to.be.undefined;
    });

    it('should return undefined when casting null', function() {
      expect(integer(null)).to.be.undefined;
    });

    it('should return undefined when casting NaN', function() {
      expect(integer(NaN)).to.be.undefined;
    });
  });

  context('when using int (that uses integer function)', function() {
    it('should return the primitive integer value of a number', function() {
      expect(int(0)).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(int(1)).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(int(new Number(0))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(int(new Number(1))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(int(new Number(5))).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int(Number(0))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(int(Number(1))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(int(Number(5))).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int(5.5)).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int(0xFF)).to.be.a('number').and.to.equals(255).and.to.not.be.an('object');
      expect(int(0b111110111)).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
      expect(int(0o767)).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
    });

    it('should return the primitive integer value of a string representing a number', function() {
      expect(int('0')).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(int('1')).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(int('5')).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int('5.5')).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int('0xFF')).to.be.a('number').and.to.equals(255).and.to.not.be.an('object');
      expect(int('0b111110111')).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
      expect(int('0o767')).to.be.a('number').and.to.equals(503).and.to.not.be.an('object');
    });

    it('should return the primitive integer value of a boolean', function() {
      expect(int(true)).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(int(false)).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(int(new Boolean(true))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(int(new Boolean(false))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
      expect(int(Boolean(1))).to.be.a('number').and.to.equals(1).and.to.not.be.an('object');
      expect(int(Boolean(0))).to.be.a('number').and.to.equals(0).and.to.not.be.an('object');
    });

    it('should return undefined when casting an infinite number', function() {
      expect(int(Infinity)).to.be.undefined;
      expect(int(-Infinity)).to.be.undefined;
      expect(int('Infinity')).to.be.undefined;
      expect(int('-Infinity')).to.be.undefined;
    });

    it('should return undefined when casting a symbol', function() {
      expect(int(Symbol('s'))).to.be.undefined;
    });

    it('should return undefined when casting a function', function() {
      expect(int(function f() {})).to.be.undefined;
    });

    it('should return undefined when casting a class', function() {
      expect(int(class c {})).to.be.undefined;
    });

    it('should return undefined when casting an error', function() {
      expect(int(new Error('error'))).to.be.undefined;
    });

    it('should return undefined when casting an array', function() {
      expect(int([])).to.be.undefined;
      expect(int([1, 2, 3])).to.be.undefined;
      expect(int([[1, 2], [3, 4, 5]])).to.be.undefined;
      expect(int(Array(5))).to.be.undefined;
      expect(int(new Array(1, 2, 3))).to.be.undefined;
    });

    it('should return undefined when casting an object', function() {
      expect(int({})).to.be.undefined;
      expect(int({ x: 5 })).to.be.undefined;
      expect(int(new function() {})).to.be.undefined;
    });

    it('should return undefined when casting a map', function() {
      expect(int(new Map())).to.be.undefined;
    });

    it('should return undefined when casting a set', function() {
      expect(int(new Set())).to.be.undefined;
    });

    it('should return undefined when casting a weakmap', function() {
      expect(int(new WeakMap())).to.be.undefined;
    });

    it('should return undefined when casting a weakset', function() {
      expect(int(new WeakSet())).to.be.undefined;
    });

    it('should return undefined when casting undefined', function() {
      expect(int(undefined)).to.be.undefined;
    });

    it('should return undefined when casting null', function() {
      expect(int(null)).to.be.undefined;
    });

    it('should return undefined when casting NaN', function() {
      expect(int(NaN)).to.be.undefined;
    });

    it('should return the specified integer value when casting a number that is in the specified range', function() {
      expect(int(5, { ge: 4, le: 9 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int(5, { ge: 0 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int(5, { le: 100 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int(5, { le: 5 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int(5, { ge: 5 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int(5.5, { ge: 5, le: 5 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');

      expect(int('5', { ge: 4, le: 9 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int('5', { ge: 0 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int('5', { le: 100 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int('5', { le: 5 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
      expect(int('5', { ge: 5 })).to.be.a('number').and.to.equals(5).and.to.not.be.an('object');
    });

    it('should return undefined when casting a number that is out of the specified range', function() {
      expect(int(5, { ge: 6, le: 9 })).to.be.undefined;
      expect(int(5, { ge: 6 })).to.be.undefined;
      expect(int(5, { le: 4 })).to.be.undefined;

      expect(int('5', { ge: 6, le: 9 })).to.be.undefined;
      expect(int('5', { ge: 6 })).to.be.undefined;
      expect(int('5', { le: 4 })).to.be.undefined;
    });

    it('should return undefined when casting a number whose specified range is not valid', function() {
      expect(int(5, { ge: 4, le: 2 })).to.be.undefined;
    });
  });
});
