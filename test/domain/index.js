const { expect } = require('../Common');
const {
  isDomainLabel,
  isDomain,
} = require('../../lib/domain');

describe('#domain', function() {
  context('when using isDomainLabel', function() {
    it('should return true if a label is minimum 1 character and maximum 63', function() {
      expect(isDomainLabel('a')).to.be.a('boolean').and.to.be.true;
      expect(isDomainLabel('a'.repeat(63))).to.be.a('boolean').and.to.be.true;
    });

    it('should return false if a label is less than 1 character and more than 63', function() {
      expect(isDomainLabel('')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('a'.repeat(64))).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a label is not defined', function() {
      expect(isDomainLabel()).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel(null)).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a label is not a string', function() {
      expect(isDomainLabel({})).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel([])).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel(true)).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel(5)).to.be.a('boolean').and.to.be.false;
    });

    it('should return true if a label has lowercase letters, digits or hyphens, start or end with a digit', function() {
      expect(isDomainLabel('a')).to.be.a('boolean').and.to.be.true;
      expect(isDomainLabel('a2')).to.be.a('boolean').and.to.be.true;
      expect(isDomainLabel('2a2')).to.be.a('boolean').and.to.be.true;
      expect(isDomainLabel('aaaaa')).to.be.a('boolean').and.to.be.true;
      expect(isDomainLabel('1')).to.be.a('boolean').and.to.be.true;
      expect(isDomainLabel('a9999')).to.be.a('boolean').and.to.be.true;
      expect(isDomainLabel('9999a')).to.be.a('boolean').and.to.be.true;
      expect(isDomainLabel('a99-99')).to.be.a('boolean').and.to.be.true;
      expect(isDomainLabel('9-9-9-9-a')).to.be.a('boolean').and.to.be.true;
    });

    it('should return false if a label has other characters than lowercase letters, digits or hyphens', function() {
      expect(isDomainLabel('a$')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('a.2')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('2a"2')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('aa!aaa')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('11111*11111')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('a99.99')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('aùéè9')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('LABEL')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a label start or end with a hyphen', function() {
      expect(isDomainLabel('-a')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('-')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('2a2-')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('-aa-aaa-')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('-11-111-11-111')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('a99-99-')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('-9')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a label has consecutive hyphens', function() {
      expect(isDomainLabel('a-b-c--d')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('--')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('2--a')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('a--a--a')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('11--111-11-111')).to.be.a('boolean').and.to.be.false;
      expect(isDomainLabel('a--9999')).to.be.a('boolean').and.to.be.false;
    });
  });

  context('when using isDomain', function() {
    it('should return true if a domain name is localhost', function() {
      expect(isDomain('localhost')).to.be.a('boolean').and.to.be.true;
    });

    it('should return true if a domain name has minimum 2 labels and is maximum 255 characters', function() {
      expect(isDomain('g.com')).to.be.a('boolean').and.to.be.true;
      expect(isDomain(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(63)}`)).to.be.a('boolean').and.to.be.true;
    });

    it('should return true if a domain name ends with . as a root label', function() {
      expect(isDomain('example.com.')).to.be.a('boolean').and.to.be.true;
      expect(isDomain('a.com.')).to.be.a('boolean').and.to.be.true;
      expect(isDomain('b.com.')).to.be.a('boolean').and.to.be.true;
      expect(isDomain('a.b.c.d.')).to.be.a('boolean').and.to.be.true;
    });

    it('should return true if a domain label starts with xn-- to support IDN', function() {
      expect(isDomain('xn--fiq228c.com')).to.be.a('boolean').and.to.be.true;
      expect(isDomain('xn--espaol-zwa.com')).to.be.a('boolean').and.to.be.true;
      expect(isDomain('xn--fiq228c.xn--espaol-zwa.com')).to.be.a('boolean').and.to.be.true;
    });

    it('should return false if a domain label starts with xn-- but has invalid label characters', function() {
      expect(isDomain('xn--\'-6xd.com')).to.be.a('boolean').and.to.be.false;
      expect(isDomain('xn--/-6xd.com')).to.be.a('boolean').and.to.be.false;
      expect(isDomain('xn--6xd=.com')).to.be.a('boolean').and.to.be.false;
      expect(isDomain('xn--6xéd.com')).to.be.a('boolean').and.to.be.false;
      expect(isDomain('xn--6*xd.com')).to.be.a('boolean').and.to.be.false;
    });

    it('should return true if a domain name has non ASCII characters to support IDN', function() {
      expect(isDomain('中文.com')).to.be.a('boolean').and.to.be.true;
      expect(isDomain('español.com')).to.be.a('boolean').and.to.be.true;
      expect(isDomain('中文.español.com')).to.be.a('boolean').and.to.be.true;
    });

    it('should return false if a domain name is not defined', function() {
      expect(isDomain()).to.be.a('boolean').and.to.be.false;
      expect(isDomain(null)).to.be.a('boolean').and.to.be.false;
      expect(isDomain(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isDomain(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a domain name is not a string', function() {
      expect(isDomain({})).to.be.a('boolean').and.to.be.false;
      expect(isDomain([])).to.be.a('boolean').and.to.be.false;
      expect(isDomain(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isDomain(true)).to.be.a('boolean').and.to.be.false;
      expect(isDomain(5)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a domain label does not start with xn--', function() {
      expect(isDomain('xnn--fiq228c.com')).to.be.a('boolean').and.to.be.false;
      expect(isDomain('an--espaol-zwa.com')).to.be.a('boolean').and.to.be.false;
      expect(isDomain('xn--fiq228c.an--espaol-zwa.com')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a domain name has no label', function() {
      expect(isDomain('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a domain name is more than 255 characters', function() {
      expect(isDomain(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(63)}.com`)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a domain name has labels more than 63 characters', function() {
      expect(isDomain(`${'a'.repeat(63)}.${'b'.repeat(64)}.${'c'.repeat(62)}.${'d'.repeat(63)}`)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a domain name has only 1 label or an empty label', function() {
      expect(isDomain('g')).to.be.a('boolean').and.to.be.false;
      expect(isDomain(' ')).to.be.a('boolean').and.to.be.false;
      expect(isDomain('     ')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a domain name is less than 1 character and more than 63', function() {
      expect(isDomain('')).to.be.a('boolean').and.to.be.false;
      expect(isDomain(`${'a'.repeat(64)}.com`)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a domain name has some identical labels', function() {
      expect(isDomain('a.a.a')).to.be.a('boolean').and.to.be.false;
      expect(isDomain('a.b.b')).to.be.a('boolean').and.to.be.false;
      expect(isDomain('example.com.com')).to.be.a('boolean').and.to.be.false;
      expect(isDomain('game.develop.game')).to.be.a('boolean').and.to.be.false;
      expect(isDomain('中文.xn--fiq228c.com')).to.be.a('boolean').and.to.be.false;
      expect(isDomain(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'a'.repeat(63)}`)).to.be.a('boolean').and.to.be.false;
      expect(isDomain(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'b'.repeat(63)}.${'d'.repeat(63)}`)).to.be.a('boolean').and.to.be.false;
      expect(isDomain(`${'a'.repeat(63)}.${'a'.repeat(63)}.${'b'.repeat(63)}.${'d'.repeat(63)}`)).to.be.a('boolean').and.to.be.false;
      expect(isDomain(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'c'.repeat(63)}`)).to.be.a('boolean').and.to.be.false;
    });
  });
});
