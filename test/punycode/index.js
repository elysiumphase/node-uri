const { expect } = require('../Common');
const {
  punycode,
  punydecode,
} = require('../../lib/punycode');

describe('#punycode', function() {
  context('when using punycode', function() {
    it('should return an empty string if no domain is provided', function() {
      expect(punycode()).to.be.a('string').and.to.equals('');
      expect(punycode(null)).to.be.a('string').and.to.equals('');
      expect(punycode(undefined)).to.be.a('string').and.to.equals('');
      expect(punycode(NaN)).to.be.a('string').and.to.equals('');
      expect(punycode('')).to.be.a('string').and.to.equals('');
    });

    it('should return an empty string if domain is not a string', function() {
      expect(punycode({})).to.be.a('string').and.to.equals('');
      expect(punycode([])).to.be.a('string').and.to.equals('');
      expect(punycode(new Error('error'))).to.be.a('string').and.to.equals('');
      expect(punycode(255)).to.be.a('string').and.to.equals('');
      expect(punycode(true)).to.be.a('string').and.to.equals('');
    });

    it('should return an empty string if domain is not valid', function() {
      expect(punycode('xn--iñvalid.com')).to.be.a('string').and.to.equals('');
      expect(punycode('http://www.host.com')).to.be.a('string').and.to.equals('');
      expect(punycode('http://www')).to.be.a('string').and.to.equals('');
      expect(punycode(':-')).to.be.a('string').and.to.equals('');
      expect(punycode('::')).to.be.a('string').and.to.equals('');
    });

    it('should return a punycode ASCII serialization of the domain if domain is a valid IDN', function() {
      expect(punycode('español.com')).to.be.a('string').and.to.equals('xn--espaol-zwa.com');
      expect(punycode('中文.com')).to.be.a('string').and.to.equals('xn--fiq228c.com');
      expect(punycode('中文.español.com')).to.be.a('string').and.to.equals('xn--fiq228c.xn--espaol-zwa.com');
    });

    it('should return a punycode ASCII serialization of the domain if domain is a valid ASCII FQDN', function() {
      expect(punycode('example.com.')).to.be.a('string').and.to.equals('example.com.');
      expect(punycode('a.b.c.d.e.fg')).to.be.a('string').and.to.equals('a.b.c.d.e.fg');
    });
  });

  context('when using punydecode', function() {
    it('should return an empty string if no domain is provided', function() {
      expect(punydecode()).to.be.a('string').and.to.equals('');
      expect(punydecode(null)).to.be.a('string').and.to.equals('');
      expect(punydecode(undefined)).to.be.a('string').and.to.equals('');
      expect(punydecode(NaN)).to.be.a('string').and.to.equals('');
      expect(punydecode('')).to.be.a('string').and.to.equals('');
    });

    it('should return an empty string if domain is not a string', function() {
      expect(punydecode({})).to.be.a('string').and.to.equals('');
      expect(punydecode([])).to.be.a('string').and.to.equals('');
      expect(punydecode(new Error('error'))).to.be.a('string').and.to.equals('');
      expect(punydecode(255)).to.be.a('string').and.to.equals('');
      expect(punydecode(true)).to.be.a('string').and.to.equals('');
    });

    it('should return an empty string if domain is not valid', function() {
      expect(punydecode('xn--iñvalid.com')).to.be.a('string').and.to.equals('');
      expect(punydecode('http://www.host.com')).to.be.a('string').and.to.equals('');
      expect(punydecode('http://www')).to.be.a('string').and.to.equals('');
      expect(punydecode(':-')).to.be.a('string').and.to.equals('');
      expect(punydecode('::')).to.be.a('string').and.to.equals('');
    });

    it('should return a Unicode serialization of the domain if domain is a valid IDN serialized', function() {
      expect(punydecode('xn--espaol-zwa.com')).to.be.a('string').and.to.equals('español.com');
      expect(punydecode('xn--fiq228c.com')).to.be.a('string').and.to.equals('中文.com');
      expect(punydecode('xn--fiq228c.xn--espaol-zwa.com')).to.be.a('string').and.to.equals('中文.español.com');
    });

    it('should return a Unicode serialization of the domain if domain is a valid ASCII FQDN', function() {
      expect(punydecode('example.com.')).to.be.a('string').and.to.equals('example.com.');
      expect(punydecode('a.b.c.d.e.fg')).to.be.a('string').and.to.equals('a.b.c.d.e.fg');
    });
  });
});
