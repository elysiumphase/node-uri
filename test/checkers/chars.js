const { expect } = require('../Common');
const {
  isDomainChar,
  isSitemapToEncodeChar,
  isURIChar,
  isURIToEncodeChar,
  isSchemeChar,
  isPercentEncodingChar,
  isUserinfoChar,
} = require('../../lib/checkers/chars');
const {
  az,
  AZ,
  GZ,
  hexdig,
  digits,
  allowed,
  allowedURIChars,
  allowedURIToEncodeChars,
  allowedSitemapToEncodeChars,
  domainAllowedChars,
  allowedSchemeChars,
  allowedPercentEncodingChars,
  allowedUserinfoChars,
  disallowed,
  disallowedURIChars,
  disallowedURIToEncodeChars,
  disallowedSitemapToEncodeChars,
  disallowedDomainChars,
  disallowedSchemeChars,
  disallowedPercentEncodingChars,
  disallowedUserinfoChars,
  disallowedOtherChars,
} = require('../chars');

describe('#checkers chars', function() {
  context('when using isDomainChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < domainAllowedChars.length; i += 1) {
        expect(isDomainChar(domainAllowedChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return false if a char does not exist', function() {
      expect(isDomainChar()).to.be.a('boolean').and.to.be.false;
      expect(isDomainChar(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isDomainChar(null)).to.be.a('boolean').and.to.be.false;
      expect(isDomainChar(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is empty', function() {
      expect(isDomainChar('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not a string', function() {
      expect(isDomainChar([])).to.be.a('boolean').and.to.be.false;
      expect(isDomainChar({})).to.be.a('boolean').and.to.be.false;
      expect(isDomainChar(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isDomainChar(5)).to.be.a('boolean').and.to.be.false;
      expect(isDomainChar(true)).to.be.a('boolean').and.to.be.false;
      expect(isDomainChar(false)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not allowed', function() {
      for (let i = 0; i < disallowedSitemapToEncodeChars.length; i += 1) {
        expect(isDomainChar(disallowedSitemapToEncodeChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedURIChars.length; i += 1) {
        expect(isDomainChar(disallowedURIChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isDomainChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });

    it('should not start or end with a hyphen', function() {
      for (let i = 0; i < az.length; i += 1) {
        expect(isDomainChar(az[i])).to.be.a('boolean').and.to.be.true;
        expect(isDomainChar(az[i], { start: true, end: true })).to.be.a('boolean').and.to.be.true;
        expect(isDomainChar(az[i], { start: false, end: true })).to.be.a('boolean').and.to.be.true;
        expect(isDomainChar(az[i], { start: true, end: false })).to.be.a('boolean').and.to.be.true;
        expect(isDomainChar(az[i], { start: false, end: false })).to.be.a('boolean').and.to.be.true;
      }
      for (let i = 0; i < digits.length; i += 1) {
        expect(isDomainChar(digits[i])).to.be.a('boolean').and.to.be.true;
        expect(isDomainChar(digits[i], { start: true, end: true })).to.be.a('boolean').and.to.be.true;
        expect(isDomainChar(digits[i], { start: false, end: true })).to.be.a('boolean').and.to.be.true;
        expect(isDomainChar(digits[i], { start: true, end: false })).to.be.a('boolean').and.to.be.true;
        expect(isDomainChar(digits[i], { start: false, end: false })).to.be.a('boolean').and.to.be.true;
      }
      expect(isDomainChar('-', { start: true, end: true })).to.be.a('boolean').and.to.be.false;
      expect(isDomainChar('-', { start: false, end: true })).to.be.a('boolean').and.to.be.false;
      expect(isDomainChar('-', { start: true, end: false })).to.be.a('boolean').and.to.be.false;
      expect(isDomainChar('-', { start: false, end: false })).to.be.a('boolean').and.to.be.true;
    });
  });

  context('when using isSitemapToEncodeChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedSitemapToEncodeChars.length; i += 1) {
        expect(isSitemapToEncodeChar(allowedSitemapToEncodeChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return false if a char does not exist', function() {
      expect(isSitemapToEncodeChar()).to.be.a('boolean').and.to.be.false;
      expect(isSitemapToEncodeChar(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapToEncodeChar(null)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapToEncodeChar(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is empty', function() {
      expect(isSitemapToEncodeChar('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not a string', function() {
      expect(isSitemapToEncodeChar([])).to.be.a('boolean').and.to.be.false;
      expect(isSitemapToEncodeChar({})).to.be.a('boolean').and.to.be.false;
      expect(isSitemapToEncodeChar(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isSitemapToEncodeChar(5)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapToEncodeChar(true)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapToEncodeChar(false)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not allowed', function() {
      for (let i = 0; i < disallowedSitemapToEncodeChars.length; i += 1) {
        expect(isSitemapToEncodeChar(disallowedSitemapToEncodeChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isSitemapToEncodeChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });
  });

  context('when using isURIChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedURIChars.length; i += 1) {
        expect(isURIChar(allowedURIChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return false if a char does not exist', function() {
      expect(isURIChar()).to.be.a('boolean').and.to.be.false;
      expect(isURIChar(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isURIChar(null)).to.be.a('boolean').and.to.be.false;
      expect(isURIChar(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is empty', function() {
      expect(isURIChar('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not a string', function() {
      expect(isURIChar([])).to.be.a('boolean').and.to.be.false;
      expect(isURIChar({})).to.be.a('boolean').and.to.be.false;
      expect(isURIChar(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isURIChar(5)).to.be.a('boolean').and.to.be.false;
      expect(isURIChar(true)).to.be.a('boolean').and.to.be.false;
      expect(isURIChar(false)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not allowed', function() {
      for (let i = 0; i < disallowedURIChars.length; i += 1) {
        expect(isURIChar(disallowedURIChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isURIChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });
  });

  context('when using isURIToEncodeChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedURIToEncodeChars.length; i += 1) {
        expect(isURIToEncodeChar(allowedURIToEncodeChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return false if a char does not exist', function() {
      expect(isURIToEncodeChar()).to.be.a('boolean').and.to.be.false;
      expect(isURIToEncodeChar(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isURIToEncodeChar(null)).to.be.a('boolean').and.to.be.false;
      expect(isURIToEncodeChar(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is empty', function() {
      expect(isURIToEncodeChar('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not a string', function() {
      expect(isURIToEncodeChar([])).to.be.a('boolean').and.to.be.false;
      expect(isURIToEncodeChar({})).to.be.a('boolean').and.to.be.false;
      expect(isURIToEncodeChar(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isURIToEncodeChar(5)).to.be.a('boolean').and.to.be.false;
      expect(isURIToEncodeChar(true)).to.be.a('boolean').and.to.be.false;
      expect(isURIToEncodeChar(false)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not allowed', function() {
      for (let i = 0; i < disallowedURIToEncodeChars.length; i += 1) {
        expect(isURIToEncodeChar(disallowedURIToEncodeChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isURIToEncodeChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });
  });

  context('when using isSchemeChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedSchemeChars.length; i += 1) {
        expect(isSchemeChar(allowedSchemeChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return false if a char does not exist', function() {
      expect(isSchemeChar()).to.be.a('boolean').and.to.be.false;
      expect(isSchemeChar(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isSchemeChar(null)).to.be.a('boolean').and.to.be.false;
      expect(isSchemeChar(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is empty', function() {
      expect(isSchemeChar('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not a string', function() {
      expect(isSchemeChar([])).to.be.a('boolean').and.to.be.false;
      expect(isSchemeChar({})).to.be.a('boolean').and.to.be.false;
      expect(isSchemeChar(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isSchemeChar(5)).to.be.a('boolean').and.to.be.false;
      expect(isSchemeChar(true)).to.be.a('boolean').and.to.be.false;
      expect(isSchemeChar(false)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not allowed', function() {
      for (let i = 0; i < disallowedSchemeChars.length; i += 1) {
        expect(isSchemeChar(disallowedSchemeChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isSchemeChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });

    it('should start with a letter', function() {
      for (let i = 0; i < az.length; i += 1) {
        expect(isSchemeChar(az[i])).to.be.a('boolean').and.to.be.true;
        expect(isSchemeChar(az[i], { start: true })).to.be.a('boolean').and.to.be.true;
      }
      for (let i = 0; i < digits.length; i += 1) {
        expect(isSchemeChar(digits[i])).to.be.a('boolean').and.to.be.true;
        expect(isSchemeChar(digits[i], { start: true })).to.be.a('boolean').and.to.be.false;
      }
    });
  });

  context('when using isPercentEncodingChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedPercentEncodingChars.length; i += 1) {
        expect(isPercentEncodingChar(allowedPercentEncodingChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return false if a char does not exist', function() {
      expect(isPercentEncodingChar()).to.be.a('boolean').and.to.be.false;
      expect(isPercentEncodingChar(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isPercentEncodingChar(null)).to.be.a('boolean').and.to.be.false;
      expect(isPercentEncodingChar(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is empty', function() {
      expect(isPercentEncodingChar('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not a string', function() {
      expect(isPercentEncodingChar([])).to.be.a('boolean').and.to.be.false;
      expect(isPercentEncodingChar({})).to.be.a('boolean').and.to.be.false;
      expect(isPercentEncodingChar(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isPercentEncodingChar(5)).to.be.a('boolean').and.to.be.false;
      expect(isPercentEncodingChar(true)).to.be.a('boolean').and.to.be.false;
      expect(isPercentEncodingChar(false)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not allowed', function() {
      for (let i = 0; i < disallowedPercentEncodingChars.length; i += 1) {
        expect(isPercentEncodingChar(disallowedPercentEncodingChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isPercentEncodingChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });
  });

  context('when using isUserinfoChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedUserinfoChars.length; i += 1) {
        expect(isUserinfoChar(allowedUserinfoChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return false if a char does not exist', function() {
      expect(isUserinfoChar()).to.be.a('boolean').and.to.be.false;
      expect(isUserinfoChar(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isUserinfoChar(null)).to.be.a('boolean').and.to.be.false;
      expect(isUserinfoChar(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is empty', function() {
      expect(isUserinfoChar('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not a string', function() {
      expect(isUserinfoChar([])).to.be.a('boolean').and.to.be.false;
      expect(isUserinfoChar({})).to.be.a('boolean').and.to.be.false;
      expect(isUserinfoChar(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isUserinfoChar(5)).to.be.a('boolean').and.to.be.false;
      expect(isUserinfoChar(true)).to.be.a('boolean').and.to.be.false;
      expect(isUserinfoChar(false)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not allowed', function() {
      for (let i = 0; i < disallowedUserinfoChars.length; i += 1) {
        expect(isUserinfoChar(disallowedUserinfoChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedURIChars.length; i += 1) {
        expect(isUserinfoChar(disallowedURIChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isUserinfoChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });
  });
});
