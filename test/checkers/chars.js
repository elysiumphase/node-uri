const { expect } = require('../Common');
const {
  isSchemeChar,
  isUserinfoChar,
  isSitemapUserinfoChar,
  isDomainChar,
  isPathChar,
  isSitemapPathChar,
  isQueryOrFragmentChar,
  isSitemapQueryOrFragmentChar,
  isPercentEncodingChar,
} = require('../../lib/checkers/chars');
const {
  az,
  AZ,
  GZ,
  hexdig,
  digits,
  allowed,
  unreserved,
  genDelims,
  subDelims,
  reserved,
  sitemapSubDelims,
  allowedSchemeChars,
  allowedDomainChars,
  allowedPercentEncodingChars,
  allowedUserinfoChars,
  allowedPathChars,
  allowedQueryOrFragmentChars,
  allowedSitemapUserinfoChars,
  allowedSitemapPathChars,
  allowedSitemapQueryOrFragmentChars,
  allowedUserinfoCharsToEncode,
  allowedPathCharsToEncode,
  allowedQueryOrFragmentCharsToEncode,
  allowedSitemapUserinfoCharsToEncode,
  allowedSitemapPathCharsToEncode,
  allowedSitemapQueryOrFragmentCharsToEncode,
  disallowed,
  disallowedSchemeChars,
  disallowedDomainChars,
  disallowedPercentEncodingChars,
  disallowedUserinfoChars,
  disallowedPathChars,
  disallowedQueryOrFragmentChars,
  disallowedSitemapUserinfoChars,
  disallowedSitemapPathChars,
  disallowedSitemapQueryOrFragmentChars,
  disallowedUserinfoCharsToEncode,
  disallowedPathCharsToEncode,
  disallowedQueryOrFragmentCharsToEncode,
  disallowedSitemapUserinfoCharsToEncode,
  disallowedSitemapPathCharsToEncode,
  disallowedSitemapQueryOrFragmentCharsToEncode,
  disallowedOtherChars,
} = require('../chars');

describe('#checkers chars', function() {
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

  context('when using isUserinfoChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedUserinfoChars.length; i += 1) {
        expect(isUserinfoChar(allowedUserinfoChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return true if a char to encode is valid', function() {
      for (let i = 0; i < allowedUserinfoCharsToEncode.length; i += 1) {
        expect(isUserinfoChar(allowedUserinfoCharsToEncode[i], true)).to.be.a('boolean').and.to.be.true;
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
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isUserinfoChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });

    it('should return false if a char to encode is not allowed', function() {
      for (let i = 0; i < disallowedUserinfoCharsToEncode.length; i += 1) {
        expect(isUserinfoChar(disallowedUserinfoCharsToEncode[i], true)).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isUserinfoChar(disallowedOtherChars[i], true)).to.be.a('boolean').and.to.be.false;
      }
    });
  });

  context('when using isSitemapUserinfoChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedSitemapUserinfoChars.length; i += 1) {
        expect(isSitemapUserinfoChar(allowedSitemapUserinfoChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return true if a char to encode is valid', function() {
      for (let i = 0; i < allowedSitemapUserinfoCharsToEncode.length; i += 1) {
        expect(isSitemapUserinfoChar(allowedSitemapUserinfoCharsToEncode[i], true)).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return false if a char does not exist', function() {
      expect(isSitemapUserinfoChar()).to.be.a('boolean').and.to.be.false;
      expect(isSitemapUserinfoChar(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapUserinfoChar(null)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapUserinfoChar(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is empty', function() {
      expect(isSitemapUserinfoChar('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not a string', function() {
      expect(isSitemapUserinfoChar([])).to.be.a('boolean').and.to.be.false;
      expect(isSitemapUserinfoChar({})).to.be.a('boolean').and.to.be.false;
      expect(isSitemapUserinfoChar(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isSitemapUserinfoChar(5)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapUserinfoChar(true)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapUserinfoChar(false)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not allowed', function() {
      for (let i = 0; i < disallowedSitemapUserinfoChars.length; i += 1) {
        expect(isSitemapUserinfoChar(disallowedSitemapUserinfoChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isSitemapUserinfoChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });

    it('should return false if a char to encode is not allowed', function() {
      for (let i = 0; i < disallowedSitemapUserinfoCharsToEncode.length; i += 1) {
        expect(isSitemapUserinfoChar(disallowedSitemapUserinfoCharsToEncode[i], true)).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isSitemapUserinfoChar(disallowedOtherChars[i], true)).to.be.a('boolean').and.to.be.false;
      }
    });
  });

  context('when using isDomainChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedDomainChars.length; i += 1) {
        expect(isDomainChar(allowedDomainChars[i])).to.be.a('boolean').and.to.be.true;
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
      for (let i = 0; i < disallowedDomainChars.length; i += 1) {
        expect(isDomainChar(disallowedDomainChars[i])).to.be.a('boolean').and.to.be.false;
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

  context('when using isPathChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedPathChars.length; i += 1) {
        expect(isPathChar(allowedPathChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return true if a char to encode is valid', function() {
      for (let i = 0; i < allowedPathCharsToEncode.length; i += 1) {
        expect(isPathChar(allowedPathCharsToEncode[i], true)).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return false if a char does not exist', function() {
      expect(isPathChar()).to.be.a('boolean').and.to.be.false;
      expect(isPathChar(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isPathChar(null)).to.be.a('boolean').and.to.be.false;
      expect(isPathChar(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is empty', function() {
      expect(isPathChar('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not a string', function() {
      expect(isPathChar([])).to.be.a('boolean').and.to.be.false;
      expect(isPathChar({})).to.be.a('boolean').and.to.be.false;
      expect(isPathChar(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isPathChar(5)).to.be.a('boolean').and.to.be.false;
      expect(isPathChar(true)).to.be.a('boolean').and.to.be.false;
      expect(isPathChar(false)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not allowed', function() {
      for (let i = 0; i < disallowedPathChars.length; i += 1) {
        expect(isPathChar(disallowedPathChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isPathChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });

    it('should return false if a char to encode is not allowed', function() {
      for (let i = 0; i < disallowedPathCharsToEncode.length; i += 1) {
        expect(isPathChar(disallowedPathCharsToEncode[i], true)).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isPathChar(disallowedOtherChars[i], true)).to.be.a('boolean').and.to.be.false;
      }
    });
  });

  context('when using isSitemapPathChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedSitemapPathChars.length; i += 1) {
        expect(isSitemapPathChar(allowedSitemapPathChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return true if a char to encode is valid', function() {
      for (let i = 0; i < allowedSitemapPathCharsToEncode.length; i += 1) {
        expect(isSitemapPathChar(allowedSitemapPathCharsToEncode[i], true)).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return false if a char does not exist', function() {
      expect(isSitemapPathChar()).to.be.a('boolean').and.to.be.false;
      expect(isSitemapPathChar(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapPathChar(null)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapPathChar(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is empty', function() {
      expect(isSitemapPathChar('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not a string', function() {
      expect(isSitemapPathChar([])).to.be.a('boolean').and.to.be.false;
      expect(isSitemapPathChar({})).to.be.a('boolean').and.to.be.false;
      expect(isSitemapPathChar(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isSitemapPathChar(5)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapPathChar(true)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapPathChar(false)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not allowed', function() {
      for (let i = 0; i < disallowedSitemapPathChars.length; i += 1) {
        expect(isSitemapPathChar(disallowedSitemapPathChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isSitemapPathChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });

    it('should return false if a char to encode is not allowed', function() {
      for (let i = 0; i < disallowedSitemapPathCharsToEncode.length; i += 1) {
        expect(isSitemapPathChar(disallowedSitemapPathCharsToEncode[i], true)).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isSitemapPathChar(disallowedOtherChars[i], true)).to.be.a('boolean').and.to.be.false;
      }
    });
  });

  context('when using isQueryOrFragmentChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedQueryOrFragmentChars.length; i += 1) {
        expect(isQueryOrFragmentChar(allowedQueryOrFragmentChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return true if a char to encode is valid', function() {
      for (let i = 0; i < allowedQueryOrFragmentCharsToEncode.length; i += 1) {
        expect(isQueryOrFragmentChar(allowedQueryOrFragmentCharsToEncode[i], true)).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return false if a char does not exist', function() {
      expect(isQueryOrFragmentChar()).to.be.a('boolean').and.to.be.false;
      expect(isQueryOrFragmentChar(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isQueryOrFragmentChar(null)).to.be.a('boolean').and.to.be.false;
      expect(isQueryOrFragmentChar(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is empty', function() {
      expect(isQueryOrFragmentChar('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not a string', function() {
      expect(isQueryOrFragmentChar([])).to.be.a('boolean').and.to.be.false;
      expect(isQueryOrFragmentChar({})).to.be.a('boolean').and.to.be.false;
      expect(isQueryOrFragmentChar(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isQueryOrFragmentChar(5)).to.be.a('boolean').and.to.be.false;
      expect(isQueryOrFragmentChar(true)).to.be.a('boolean').and.to.be.false;
      expect(isQueryOrFragmentChar(false)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not allowed', function() {
      for (let i = 0; i < disallowedQueryOrFragmentChars.length; i += 1) {
        expect(isQueryOrFragmentChar(disallowedQueryOrFragmentChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isQueryOrFragmentChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });

    it('should return false if a char to encode is not allowed', function() {
      for (let i = 0; i < disallowedQueryOrFragmentCharsToEncode.length; i += 1) {
        expect(isQueryOrFragmentChar(disallowedQueryOrFragmentCharsToEncode[i], true)).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isQueryOrFragmentChar(disallowedOtherChars[i], true)).to.be.a('boolean').and.to.be.false;
      }
    });
  });

  context('when using isSitemapQueryOrFragmentChar', function() {
    it('should return true if a char is valid', function() {
      for (let i = 0; i < allowedSitemapQueryOrFragmentChars.length; i += 1) {
        expect(isSitemapQueryOrFragmentChar(allowedSitemapQueryOrFragmentChars[i])).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return true if a char to encode is valid', function() {
      for (let i = 0; i < allowedSitemapQueryOrFragmentCharsToEncode.length; i += 1) {
        expect(isSitemapQueryOrFragmentChar(allowedSitemapQueryOrFragmentCharsToEncode[i], true)).to.be.a('boolean').and.to.be.true;
      }
    });

    it('should return false if a char does not exist', function() {
      expect(isSitemapQueryOrFragmentChar()).to.be.a('boolean').and.to.be.false;
      expect(isSitemapQueryOrFragmentChar(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapQueryOrFragmentChar(null)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapQueryOrFragmentChar(NaN)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is empty', function() {
      expect(isSitemapQueryOrFragmentChar('')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not a string', function() {
      expect(isSitemapQueryOrFragmentChar([])).to.be.a('boolean').and.to.be.false;
      expect(isSitemapQueryOrFragmentChar({})).to.be.a('boolean').and.to.be.false;
      expect(isSitemapQueryOrFragmentChar(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isSitemapQueryOrFragmentChar(5)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapQueryOrFragmentChar(true)).to.be.a('boolean').and.to.be.false;
      expect(isSitemapQueryOrFragmentChar(false)).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if a char is not allowed', function() {
      for (let i = 0; i < disallowedSitemapQueryOrFragmentChars.length; i += 1) {
        expect(isSitemapQueryOrFragmentChar(disallowedSitemapQueryOrFragmentChars[i])).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isSitemapQueryOrFragmentChar(disallowedOtherChars[i])).to.be.a('boolean').and.to.be.false;
      }
    });

    it('should return false if a char to encode is not allowed', function() {
      for (let i = 0; i < disallowedSitemapQueryOrFragmentCharsToEncode.length; i += 1) {
        expect(isSitemapQueryOrFragmentChar(disallowedSitemapQueryOrFragmentCharsToEncode[i], true)).to.be.a('boolean').and.to.be.false;
      }
      for (let i = 0; i < disallowedOtherChars.length; i += 1) {
        expect(isSitemapQueryOrFragmentChar(disallowedOtherChars[i], true)).to.be.a('boolean').and.to.be.false;
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
});
