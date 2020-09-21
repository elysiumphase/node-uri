const { expect } = require('../Common');
const { object: { exists, is } } = require('../../lib/helpers');

describe('#object helper', function() {
  context('when using exists', function() {
    it('should return true when testing a string', function() {
      expect(exists('')).to.be.a('boolean').and.to.be.true;
      expect(exists(' ')).to.be.a('boolean').and.to.be.true;
      expect(exists('x')).to.be.a('boolean').and.to.be.true;
      expect(exists("")).to.be.a('boolean').and.to.be.true;
      expect(exists(" ")).to.be.a('boolean').and.to.be.true;
      expect(exists("x")).to.be.a('boolean').and.to.be.true;
      expect(exists(new String(''))).to.be.a('boolean').and.to.be.true;
      expect(exists(new String(' '))).to.be.a('boolean').and.to.be.true;
      expect(exists(new String('x'))).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a number', function() {
      expect(exists(5)).to.be.a('boolean').and.to.be.true;
      expect(exists(5.5)).to.be.a('boolean').and.to.be.true;
      expect(exists(Infinity)).to.be.a('boolean').and.to.be.true;
      expect(exists(0xFF)).to.be.a('boolean').and.to.be.true;
      expect(exists(0b111110111)).to.be.a('boolean').and.to.be.true;
      expect(exists(0o767)).to.be.a('boolean').and.to.be.true;
      expect(exists(new Number('5'))).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a boolean', function() {
      expect(exists(true)).to.be.a('boolean').and.to.be.true;
      expect(exists(false)).to.be.a('boolean').and.to.be.true;
      expect(exists(new Boolean('true'))).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a symbol', function() {
      expect(exists(Symbol('x'))).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a function', function() {
      expect(exists(function f() {})).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing an object', function() {
      class c {};
      expect(exists({})).to.be.a('boolean').and.to.be.true;
      expect(exists({ x: 5 })).to.be.a('boolean').and.to.be.true;
      expect(exists(c)).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing an error', function() {
      expect(exists(new Error('error'))).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a date', function() {
      expect(exists(Date.now())).to.be.a('boolean').and.to.be.true;
      expect(exists(new Date())).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing an array', function() {
      expect(exists([])).to.be.a('boolean').and.to.be.true;
      expect(exists([5])).to.be.a('boolean').and.to.be.true;
      expect(exists(new Array())).to.be.a('boolean').and.to.be.true;
      expect(exists(new Array(0))).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a map', function() {
      expect(exists(new Map())).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a set', function() {
      expect(exists(new Set())).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a weakmap', function() {
      expect(exists(new WeakMap())).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a weakset', function() {
      expect(exists(new WeakSet())).to.be.a('boolean').and.to.be.true;
    });

    it('should return false when testing undefined', function() {
      expect(exists(undefined)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false when testing NaN', function() {
      expect(exists(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false when testing null', function() {
      expect(exists(null)).to.be.a('boolean').and.to.be.false;
    });
  });

  context('when using is', function() {
    it('should return true when testing a string', function() {
      expect(is(String, '')).to.be.a('boolean').and.to.be.true;
      expect(is(String, ' ')).to.be.a('boolean').and.to.be.true;
      expect(is(String, 'x')).to.be.a('boolean').and.to.be.true;
      expect(is(String, "")).to.be.a('boolean').and.to.be.true;
      expect(is(String, " ")).to.be.a('boolean').and.to.be.true;
      expect(is(String, "x")).to.be.a('boolean').and.to.be.true;
      expect(is(String, new String(''))).to.be.a('boolean').and.to.be.true;
      expect(is(String, new String(' '))).to.be.a('boolean').and.to.be.true;
      expect(is(String, new String('x'))).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a number', function() {
      expect(is(Number, 5)).to.be.a('boolean').and.to.be.true;
      expect(is(Number, 5.5)).to.be.a('boolean').and.to.be.true;
      expect(is(Number, Infinity)).to.be.a('boolean').and.to.be.true;
      expect(is(Number, 0xFF)).to.be.a('boolean').and.to.be.true;
      expect(is(Number, 0b111110111)).to.be.a('boolean').and.to.be.true;
      expect(is(Number, 0o767)).to.be.a('boolean').and.to.be.true;
      expect(is(Number, new Number('5'))).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a boolean', function() {
      expect(is(Boolean, true)).to.be.a('boolean').and.to.be.true;
      expect(is(Boolean, false)).to.be.a('boolean').and.to.be.true;
      expect(is(Boolean, new Boolean('true'))).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a symbol', function() {
      expect(is(Symbol, Symbol('x'))).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a function', function() {
      expect(is(Function, function f() {})).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing an object', function() {
      class c {};
      expect(is(Object, {})).to.be.a('boolean').and.to.be.true;
      expect(is(Object, { x: 5 })).to.be.a('boolean').and.to.be.true;
      expect(is(Object, c)).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing an error', function() {
      expect(is(Error, new Error('error'))).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a date', function() {
      expect(is(Date, new Date())).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing an array', function() {
      expect(is(Array, [])).to.be.a('boolean').and.to.be.true;
      expect(is(Array, [5])).to.be.a('boolean').and.to.be.true;
      expect(is(Array, new Array())).to.be.a('boolean').and.to.be.true;
      expect(is(Array, new Array(0))).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a map', function() {
      expect(is(Map, new Map())).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a set', function() {
      expect(is(Set, new Set())).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a weakmap', function() {
      expect(is(WeakMap, new WeakMap())).to.be.a('boolean').and.to.be.true;
    });

    it('should return true when testing a weakset', function() {
      expect(is(WeakSet, new WeakSet())).to.be.a('boolean').and.to.be.true;
    });

    it('should return false when testing NaN to be a Number', function() {
      expect(is(Number, NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false when the type does not exist', function() {
      expect(is(undefined, '')).to.be.a('boolean').and.to.be.false;
      expect(is(NaN, '')).to.be.a('boolean').and.to.be.false;
      expect(is(null, '')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false when the value does not exist', function() {
      expect(is(String, undefined)).to.be.a('boolean').and.to.be.false;
      expect(is(String, NaN)).to.be.a('boolean').and.to.be.false;
      expect(is(String, null)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false when both type and value don\'t exist', function() {
      expect(is(undefined, undefined)).to.be.a('boolean').and.to.be.false;
      expect(is(undefined, NaN)).to.be.a('boolean').and.to.be.false;
      expect(is(undefined, null)).to.be.a('boolean').and.to.be.false;
      expect(is(NaN, undefined)).to.be.a('boolean').and.to.be.false;
      expect(is(NaN, NaN)).to.be.a('boolean').and.to.be.false;
      expect(is(NaN, null)).to.be.a('boolean').and.to.be.false;
      expect(is(null, undefined)).to.be.a('boolean').and.to.be.false;
      expect(is(null, NaN)).to.be.a('boolean').and.to.be.false;
      expect(is(null, null)).to.be.a('boolean').and.to.be.false;
    });
  });
});
