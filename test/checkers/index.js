const { expect } = require('../Common');
const {
  checkPercentEncoding,
  checkSitemapEncoding,
  checkPathqf,
  checkURISyntax,
  checkURI,
  checkHttpURL,
  checkHttpsURL,
  checkHttpSitemapURL,
  checkHttpsSitemapURL,
  checkWebURL,
  checkSitemapURL,
} = require('../../lib/checkers');
const {
  uri,
  notUri,
  http,
  notHttp,
  https,
  notHttps,
  unicode,
  idn,
  notIdn,
  sitemap,
  notSitemap,
} = require('../uris');
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

describe('#checkers', function() {
  context('when using checkPercentEncoding', function() {
    it('should throw an uri error when uri is not a string', function() {
      expect(() => checkPercentEncoding()).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding(undefined)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding(null)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding(NaN)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding([])).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding(new Error('error'))).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding(5)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding(true)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding(false)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding({})).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
    });

    it('should return an offset at 0 if a string is empty', function() {
      expect(checkPercentEncoding('')).to.be.a('number').and.to.equals(0);
    });

    it('should return an offset at 0 if a string is not empty but index is missing', function() {
      expect(checkPercentEncoding('percent%20encoding')).to.be.a('number').and.to.equals(0);
    });

    it('should return an offset at 0 if a string is not empty but index is not a number', function() {
      expect(checkPercentEncoding('percent%20encoding', {})).to.be.a('number').and.to.equals(0);
      expect(checkPercentEncoding('percent%20encoding', [])).to.be.a('number').and.to.equals(0);
      expect(checkPercentEncoding('percent%20encoding', 5)).to.be.a('number').and.to.equals(0);
      expect(checkPercentEncoding('percent%20encoding', true)).to.be.a('number').and.to.equals(0);
      expect(checkPercentEncoding('percent%20encoding', 'index')).to.be.a('number').and.to.equals(0);
      expect(checkPercentEncoding('percent%20encoding', new Error('error'))).to.be.a('number').and.to.equals(0);
    });

    it('should return an offset at 0 if % character is at a bad index', function() {
      expect(checkPercentEncoding('percent%20encoding', 6)).to.be.a('number').and.to.equals(0);
      expect(checkPercentEncoding('percent%20encoding', 8)).to.be.a('number').and.to.equals(0);
    });

    it('should return a correct offset if % character is at the specified index when stringLen is specified', function() {
      expect(checkPercentEncoding('percent%20encoding', 7, 18)).to.be.a('number').and.to.equals(2);
      expect(checkPercentEncoding('percent%C3%BCencoding', 7, 21)).to.be.a('number').and.to.equals(2);
      expect(checkPercentEncoding('percent%C3%BCencoding', 10, 21)).to.be.a('number').and.to.equals(2);
    });

    it('should return an offset at 0 if % character is at the specified index but stringLen is less than or equal to index', function() {
      expect(checkPercentEncoding('percent%20encoding', 7, 2)).to.be.a('number').and.to.equals(0);
      expect(checkPercentEncoding('percent%20encoding', 7, 7)).to.be.a('number').and.to.equals(0);
    });

    it('should throw an uri error if % character is at the specified index but stringLen is misused (index or index + 1 length)', function() {
      expect(() => checkPercentEncoding('percent%20encoding', 7, 8)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding('percent%20encoding', 7, 9)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
    });

    it('should return a correct offset if % character is at the specified index', function() {
      expect(checkPercentEncoding('percent%20encoding', 7)).to.be.a('number').and.to.equals(2);
      expect(checkPercentEncoding('percent%C3%BCencoding', 7)).to.be.a('number').and.to.equals(2);
      expect(checkPercentEncoding('percent%C3%BCencoding', 10)).to.be.a('number').and.to.equals(2);
    });

    it('should throw an uri error when percent encoding is malformed', function() {
      expect(() => checkPercentEncoding('percent%2encoding', 7)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding('percent%2éncoding', 7)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding('percent%2%', 7)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding('percent%%%', 7)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding('percent%2-encoding', 7)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding('percent%encoding', 7)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding('percent%', 7)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding('percent%A', 7)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPercentEncoding('percent%9', 7)).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
    });
  });

  context('when using checkSitemapEncoding', function() {
    it('should throw an uri error when uri is not a string', function() {
      expect(() => checkSitemapEncoding()).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkSitemapEncoding(undefined)).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkSitemapEncoding(null)).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkSitemapEncoding(NaN)).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkSitemapEncoding([])).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkSitemapEncoding(new Error('error'))).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkSitemapEncoding(5)).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkSitemapEncoding(true)).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkSitemapEncoding(false)).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkSitemapEncoding({})).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
    });

    it('should return an offset at 0 if a string is empty', function() {
      expect(checkSitemapEncoding('')).to.be.a('number').and.to.equals(0);
    });

    it('should return an offset at 0 if a string is not empty but index is missing', function() {
      expect(checkSitemapEncoding('percent&encoding')).to.be.a('number').and.to.equals(0);
    });

    it('should return an offset at 0 if a string is not empty but index is not a number', function() {
      expect(checkSitemapEncoding('percent&encoding', {})).to.be.a('number').and.to.equals(0);
      expect(checkSitemapEncoding('percent&encoding', [])).to.be.a('number').and.to.equals(0);
      expect(checkSitemapEncoding('percent&encoding', 5)).to.be.a('number').and.to.equals(0);
      expect(checkSitemapEncoding('percent&encoding', true)).to.be.a('number').and.to.equals(0);
      expect(checkSitemapEncoding('percent&encoding', 'index')).to.be.a('number').and.to.equals(0);
      expect(checkSitemapEncoding('percent&encoding', new Error('error'))).to.be.a('number').and.to.equals(0);
    });

    it('should return an offset at 0 if entity is at a bad index', function() {
      expect(checkSitemapEncoding('percent&encoding', 6)).to.be.a('number').and.to.equals(0);
      expect(checkSitemapEncoding('percent&encoding', 8)).to.be.a('number').and.to.equals(0);
    });

    it('should return a correct offset if entity is at the specified index when stringLen is specified', function() {
      expect(checkSitemapEncoding('percent&amp;encoding', 7, 18)).to.be.a('number').and.to.equals(4);
      expect(checkSitemapEncoding('percent&amp;&apos;encoding', 12, 26)).to.be.a('number').and.to.equals(5);
    });

    it('should return an offset at 0 if entity is at the specified index but stringLen is less than or equal to index', function() {
      expect(checkSitemapEncoding('percent&amp;encoding', 7, 2)).to.be.a('number').and.to.equals(0);
      expect(checkSitemapEncoding('percent&amp;encoding', 7, 7)).to.be.a('number').and.to.equals(0);
    });

    it('should throw an uri error if entity is at the specified index but stringLen is misused (index or index + 1 length)', function() {
      expect(() => checkSitemapEncoding('percent&amp;encoding', 7, 8)).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkSitemapEncoding('percent&amp;encoding', 7, 9)).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
    });

    it('should return a correct offset if entity is at the specified index', function() {
      expect(checkSitemapEncoding('percent&amp;encoding', 7)).to.be.a('number').and.to.equals(4);
      expect(checkSitemapEncoding('percent&apos;encoding', 7)).to.be.a('number').and.to.equals(5);
    });

    it('should throw an uri error when sitemap encoding is malformed', function() {
      expect(() => checkSitemapEncoding('percent&ampencoding', 7)).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkSitemapEncoding('percent&&', 7)).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkSitemapEncoding('percent&apos', 7)).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
    });

    it('should not throw an uri error when sitemap encoding has invalid characters as isSitemap* funcs are in charge of it', function() {
      expect(() => checkSitemapEncoding('percent*encoding', 7)).to.not.throw();
      expect(() => checkSitemapEncoding('percent\'', 7)).to.not.throw();
    });
  });

  context('when using checkPathqf', function() {
    it('should throw an uri error when options is missing or is not an object', function() {
      expect(() => checkPathqf()).to.throw(URIError).with.property('code', 'URI_INVALID_CHECKING_COMPONENT');
      expect(() => checkPathqf(undefined)).to.throw(URIError).with.property('code', 'URI_INVALID_CHECKING_COMPONENT');
      expect(() => checkPathqf(NaN)).to.throw(URIError).with.property('code', 'URI_INVALID_CHECKING_COMPONENT');
      expect(() => checkPathqf([])).to.throw(URIError).with.property('code', 'URI_INVALID_CHECKING_COMPONENT');
      expect(() => checkPathqf(new Error('error'))).to.throw(URIError).with.property('code', 'URI_INVALID_CHECKING_COMPONENT');
      expect(() => checkPathqf(5)).to.throw(URIError).with.property('code', 'URI_INVALID_CHECKING_COMPONENT');
      expect(() => checkPathqf(true)).to.throw(URIError).with.property('code', 'URI_INVALID_CHECKING_COMPONENT');
      expect(() => checkPathqf(false)).to.throw(URIError).with.property('code', 'URI_INVALID_CHECKING_COMPONENT');
    });

    it('should throw an uri error when type is unknown', function() {
      expect(() => checkPathqf({ type: 'type' })).to.throw(URIError).with.property('code', 'URI_INVALID_CHECKING_COMPONENT');
    });

    it('should not throw an uri error when string parameter is not a string or missing', function() {
      expect(() => checkPathqf({ type: 'path', string: 5 })).to.not.throw();
      expect(() => checkPathqf({ type: 'query', string: [] })).to.not.throw();
      expect(() => checkPathqf({ type: 'fragment', string: true })).to.not.throw();
      expect(() => checkPathqf({ type: 'path', string: new Error('error') })).to.not.throw();
    });

    it('should throw an uri error when type is path and string has invalid char', function() {
      expect(() => checkPathqf({ type: 'path', string: disallowedPathChars })).to.throw(URIError).with.property('code', 'URI_INVALID_PATH_CHAR');
      expect(() => checkPathqf({ type: 'path', string: disallowedOtherChars })).to.throw(URIError).with.property('code', 'URI_INVALID_PATH_CHAR');
      expect(() => checkPathqf({ type: 'path', string: disallowed })).to.throw(URIError).with.property('code', 'URI_INVALID_PATH_CHAR');
    });

    it('should throw an uri error when type is query and string has invalid char', function() {
      expect(() => checkPathqf({ type: 'query', string: disallowedQueryOrFragmentChars })).to.throw(URIError).with.property('code', 'URI_INVALID_QUERY_CHAR');
      expect(() => checkPathqf({ type: 'query', string: disallowedOtherChars })).to.throw(URIError).with.property('code', 'URI_INVALID_QUERY_CHAR');
      expect(() => checkPathqf({ type: 'query', string: disallowed })).to.throw(URIError).with.property('code', 'URI_INVALID_QUERY_CHAR');
    });

    it('should throw an uri error when type is fragment and string has invalid char', function() {
      expect(() => checkPathqf({ type: 'fragment', string: disallowedQueryOrFragmentChars })).to.throw(URIError).with.property('code', 'URI_INVALID_FRAGMENT_CHAR');
      expect(() => checkPathqf({ type: 'fragment', string: disallowedOtherChars })).to.throw(URIError).with.property('code', 'URI_INVALID_FRAGMENT_CHAR');
      expect(() => checkPathqf({ type: 'fragment', string: disallowed })).to.throw(URIError).with.property('code', 'URI_INVALID_FRAGMENT_CHAR');
    });

    it('should throw an uri error when type is path and string has invalid sitemap char', function() {
      expect(() => checkPathqf({ type: 'path', string: disallowedSitemapPathChars, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_PATH_CHAR');
      expect(() => checkPathqf({ type: 'path', string: disallowedOtherChars, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_PATH_CHAR');
      expect(() => checkPathqf({ type: 'path', string: disallowed, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_PATH_CHAR');
      expect(() => checkPathqf({ type: 'path', string: AZ, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_PATH_CHAR');
    });

    it('should throw an uri error when type is query and string has invalid sitemap char', function() {
      expect(() => checkPathqf({ type: 'query', string: disallowedSitemapQueryOrFragmentChars, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_QUERY_CHAR');
      expect(() => checkPathqf({ type: 'query', string: disallowedOtherChars, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_QUERY_CHAR');
      expect(() => checkPathqf({ type: 'query', string: disallowed, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_QUERY_CHAR');
      expect(() => checkPathqf({ type: 'query', string: AZ, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_QUERY_CHAR');
    });

    it('should throw an uri error when type is fragment and string has invalid sitemap char', function() {
      expect(() => checkPathqf({ type: 'fragment', string: disallowedSitemapQueryOrFragmentChars, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_FRAGMENT_CHAR');
      expect(() => checkPathqf({ type: 'fragment', string: disallowedOtherChars, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_FRAGMENT_CHAR');
      expect(() => checkPathqf({ type: 'fragment', string: disallowed, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_FRAGMENT_CHAR');
      expect(() => checkPathqf({ type: 'fragment', string: AZ, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_FRAGMENT_CHAR');
    });

    it('should throw an uri error when string has invalid percent encoding', function() {
      expect(() => checkPathqf({ type: 'path', string: 'path%2' })).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPathqf({ type: 'query', string: '%query' })).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPathqf({ type: 'fragment', string: 'frag%2ment' })).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPathqf({ type: 'path', string: 'frag%Cment', sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPathqf({ type: 'query', string: 'frag%Pment', sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
      expect(() => checkPathqf({ type: 'fragment', string: 'frag%XYment', sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
    });

    it('should throw an uri error when string has invalid sitemap encoding if option is true', function() {
      expect(() => checkPathqf({ type: 'path', string: 'frag\'ment', sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_PATH_CHAR');
      expect(() => checkPathqf({ type: 'query', string: 'frag*ment', sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_QUERY_CHAR');
      expect(() => checkPathqf({ type: 'fragment', string: 'frag&ampment', sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
      expect(() => checkPathqf({ type: 'fragment', string: 'frag&aposment', sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_ENCODING');
    });

    it('should not throw an uri error when string has invalid sitemap encoding if option is false or missing', function() {
      expect(() => checkPathqf({ type: 'path', string: 'frag\'ment' })).to.not.throw();
      expect(() => checkPathqf({ type: 'query', string: 'frag*ment' })).to.not.throw();
      expect(() => checkPathqf({ type: 'fragment', string: 'frag&ampment' })).to.not.throw();
      expect(() => checkPathqf({ type: 'fragment', string: 'frag&aposment' })).to.not.throw();

      expect(() => checkPathqf({ type: 'path', string: 'frag\'ment', sitemap: false })).to.not.throw();
      expect(() => checkPathqf({ type: 'query', string: 'frag*ment', sitemap: false })).to.not.throw();
      expect(() => checkPathqf({ type: 'fragment', string: 'frag&ampment', sitemap: false })).to.not.throw();
      expect(() => checkPathqf({ type: 'fragment', string: 'frag&aposment', sitemap: false })).to.not.throw();
    });

    it('should not throw an uri error when string has valid sitemap encoding if option is true or false', function() {
      expect(() => checkPathqf({ type: 'fragment', string: 'frag&amp;ment' })).to.not.throw();
      expect(() => checkPathqf({ type: 'fragment', string: 'frag&apos;ment' })).to.not.throw();

      expect(() => checkPathqf({ type: 'fragment', string: 'frag&amp;ment', sitemap: true })).to.not.throw();
      expect(() => checkPathqf({ type: 'fragment', string: 'frag&apos;ment', sitemap: true })).to.not.throw();
    });

    it('should not throw an uri error when type is path and string has valid chars', function() {
      expect(() => checkPathqf({ type: 'path', string: allowedPathChars.replace('%', '') })).to.not.throw();
    });

    it('should not throw an uri error when type is query and string has valid chars', function() {
      expect(() => checkPathqf({ type: 'query', string: allowedQueryOrFragmentChars.replace('%', '') })).to.not.throw();
    });

    it('should not throw an uri error when type is fragment and string has valid chars', function() {
      expect(() => checkPathqf({ type: 'fragment', string: allowedQueryOrFragmentChars.replace('%', '') })).to.not.throw();
    });

    it('should not throw an uri error when type is path and string has valid sitemap chars', function() {
      expect(() => checkPathqf({ type: 'path', string: allowedSitemapPathChars.replace(/[%&]/g, ''), sitemap: true })).to.not.throw();
    });

    it('should not throw an uri error when type is query and string has sitemap chars', function() {
      expect(() => checkPathqf({ type: 'query', string: allowedSitemapQueryOrFragmentChars.replace(/[%&]/g, ''), sitemap: true })).to.not.throw();
    });

    it('should not throw an uri error when type is fragment and string has sitemap chars', function() {
      expect(() => checkPathqf({ type: 'fragment', string: allowedSitemapQueryOrFragmentChars.replace(/[%&]/g, ''), sitemap: true })).to.not.throw();
    });
  });

  // context('when using checkURISyntax', function() {
  //   it('should throw an uri error when uri is not a string', function() {
  //     expect(() => checkURISyntax()).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURISyntax(undefined)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURISyntax(null)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURISyntax(NaN)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURISyntax([])).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURISyntax(new Error('error'))).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURISyntax(5)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURISyntax(true)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURISyntax(false)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURISyntax({})).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //   });
  //
  //   it('should throw an uri error when uri has no scheme', function() {
  //     // scheme cannot be an empty string following parseURI behavior
  //     expect(() => checkURISyntax('/Users/dir/file.js')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
  //     expect(() => checkURISyntax('://example.com')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
  //     expect(() => checkURISyntax(':')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
  //   });
  //
  //   // parseURI always returns an empty path, regexp makes it impossible to have a null path
  //
  //   it('should not throw an uri error when uri has no path', function() {
  //     expect(() => checkURISyntax('http:')).to.not.throw();
  //   });
  //
  //   // if authority is present following parseURI behavior path will always be at least empty or start with /
  //
  //   it('should throw an uri error when authority is not present and path starts with //', function() {
  //     expect(() => checkURISyntax('http://example.co.jp//path')).to.not.throw();
  //     expect(() => checkURISyntax('http:////path')).to.throw(URIError).with.property('code', 'URI_INVALID_PATH');
  //   });
  //
  //   it('should throw an uri error when host was invalid once parsed', function() {
  //     expect(() => checkURISyntax('foo://xn--iñvalid.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //     expect(() => checkURISyntax('foo://')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //   });
  //
  //   it('should not throw if an uri has at least a scheme and a path', function() {
  //     expect(() => checkURISyntax('http://example.com')).to.not.throw();
  //     expect(() => checkURISyntax('http://example.com/path')).to.not.throw();
  //   });
  //
  //   it('should not throw when authority is not present and path does not start with //', function() {
  //     expect(() => checkURISyntax('foo:path')).to.not.throw();
  //   });
  //
  //   it('should return a specific object if no errors were thrown', function() {
  //     let check = checkURISyntax('foo://中文.com:8042/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'foo');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', null);
  //     expect(check).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', 8042);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/over/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'name=ferret');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', 'nose');
  //     expect(check).to.be.an('object').and.to.have.property('schemeLen', 3);
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkURISyntax('foo://example.com:80g42/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'foo');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'example.com:80g42');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', 'example.com:80g42');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', null);
  //     expect(check).to.be.an('object').and.to.have.property('host', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', '80g42');
  //     expect(check).to.be.an('object').and.to.have.property('path', '/over/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'name=ferret');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', 'nose');
  //     expect(check).to.be.an('object').and.to.have.property('schemeLen', 3);
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //   });
  // });
  //
  // context('when using checkURI that uses checkURISyntax', function() {
  //   // SAME TESTS FROM checkURISyntax to check consistency
  //   it('should throw an uri error when uri is not a string', function() {
  //     expect(() => checkURI()).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURI(undefined)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURI(null)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURI(NaN)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURI([])).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURI(new Error('error'))).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURI(5)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURI(true)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURI(false)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkURI({})).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //   });
  //
  //   it('should throw an uri error when uri has no scheme', function() {
  //     // scheme cannot be an empty string following parseURI behavior
  //     expect(() => checkURI('/Users/dir/file.js')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
  //     expect(() => checkURI('://example.com')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
  //     expect(() => checkURI(':')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
  //   });
  //
  //   // parseURI always returns an empty path, regexp makes it impossible to have a null path
  //
  //   it('should not throw an uri error when uri has no path', function() {
  //     expect(() => checkURI('http:')).to.not.throw();
  //   });
  //
  //   // if authority is present following parseURI behavior path will always be at least empty or start with /
  //
  //   it('should throw an uri error when authority is not present and path starts with //', function() {
  //     expect(() => checkURI('http://example.co.jp//path')).to.not.throw();
  //     expect(() => checkURI('http:////path')).to.throw(URIError).with.property('code', 'URI_INVALID_PATH');
  //   });
  //
  //   it('should not throw if an uri has at least a scheme and a path', function() {
  //     expect(() => checkURI('http://example.com')).to.not.throw();
  //     expect(() => checkURI('http://example.com/path')).to.not.throw();
  //   });
  //
  //   it('should not throw when authority is not present and path does not start with //', function() {
  //     expect(() => checkURI('foo:path')).to.not.throw();
  //   });
  //
  //   // ADDITIONAL TESTS
  //   it('should throw an uri error when scheme has invalid chars', function() {
  //     expect(() => checkURI('htép://example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME_CHAR');
  //     expect(() => checkURI('ht°p://example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME_CHAR');
  //   });
  //
  //   it('should throw an uri error when uri has invalid percent encodings', function() {
  //     expect(() => checkURI('http://www.bar.baz/foo%2')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('http://www.bar.baz/foo%2éd')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //   });
  //
  //   it('should throw an uri error when userinfo has invalid characters', function() {
  //     expect(() => checkURI('foo://usér:pass@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_USERINFO_CHAR');
  //     expect(() => checkURI('foo://us€r:pass@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_USERINFO_CHAR');
  //     expect(() => checkURI('foo://user:pa[ss@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_USERINFO_CHAR');
  //     expect(() => checkURI('foo://usEr:pass@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_USERINFO_CHAR');
  //     expect(() => checkURI('foo://usEr:pasS@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_USERINFO_CHAR');
  //   });
  //
  //   it('should throw an uri error when userinfo has invalid percent encodings', function() {
  //     expect(() => checkURI('foo://user%:pass@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://user%20%2z:pass@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://user:%acpass@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://user:pass%@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://user:pass%a@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //   });
  //
  //   it('should throw an uri error when host is not a valid ip', function() {
  //     expect(() => checkURI('foo://999.999.999.999:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //     expect(() => checkURI('foo://3ffe:b00::1::a/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //   });
  //
  //   it('should throw an uri error when host is not a valid domain', function() {
  //     expect(() => checkURI('foo://aaaaaa:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //     expect(() => checkURI('foo://com.com/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //     expect(() => checkURI('foo://example..com/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //   });
  //
  //   it('should throw an uri error when port is not a number', function() {
  //     expect(() => checkURI('foo://example.com:80g42/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PORT');
  //   });
  //
  //   it('should throw an uri error when invalid characters are found following scheme://authority', function() {
  //     expect(() => checkURI('foo://example.com:8042/over/thère?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/ôver/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/over\\there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/\\over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/over^there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/{over}/the`re?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/over|there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/over}/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/over/{there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //   });
  //
  //   it('should throw an uri error when invalid percent encodings are found following scheme://authority', function() {
  //     expect(() => checkURI('foo://example.com:8042/over/there%20%20%?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/over/there%2?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/over/there%Aa?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/%2cover/there%20%20?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/%a2over/there%20%20%?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/%gover/there%20%20%?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/%20over/there%20%20%?name=ferret%#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/%20over/there%20%20%?name=ferret%%#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/over/there%20%20%?name=f%erret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret#nose%')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret#nose%A')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret#nose%ef')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret#nose%ac')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret#nose%9')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret#nose%8c')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret#nose%a9')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //   });
  //
  //   it('should not throw an uri error when unescaped but allowed sitemap characters are found following scheme://authority if sitemap is false', function() {
  //     expect(() => checkURI('foo://example.com:8042/it\'sover/there?name=ferret#nose', { sitemap: false })).to.not.throw();
  //     expect(() => checkURI('foo://example.com:8042/it"s%20over/there?name=ferret#nose', { sitemap: false })).to.not.throw();
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret&pseudo=superhero#nose', { sitemap: false })).to.not.throw();
  //   });
  //
  //   it('should throw an uri error when unescaped sitemap characters are found following scheme://authority if sitemap is true', function() {
  //     expect(() => checkURI('foo://example.com:8042/it\'sover/there?name=ferret#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/it"s%20over/there?name=ferret#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret&pseudo=superhero#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret&pseudo=superhero#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/over/&quotthere?name=ferret#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/over&am/there?name=ferret#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret&apo#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret&g#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret&l;#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //   });
  //
  //   it('should not throw an uri error if an uri is valid', function() {
  //     expect(() => checkURI('urn:isbn:0-486-27557-4')).to.not.throw();
  //     expect(() => checkURI('foo://example.com')).to.not.throw();
  //     expect(() => checkURI('foo://example.co.jp')).to.not.throw();
  //     expect(() => checkURI('foo://example.co.jp.')).to.not.throw();
  //     expect(() => checkURI('foo://example.co.jp.')).to.not.throw();
  //     expect(() => checkURI('foo://example.com.:8042/over/')).to.not.throw();
  //     expect(() => checkURI('foo://example.com:8042/over/there')).to.not.throw();
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret')).to.not.throw();
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkURI('foo://user:pass@example.com:8042/over/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkURI('f://g.h')).to.not.throw();
  //     expect(() => checkURI('f://g.h.')).to.not.throw();
  //     expect(() => checkURI('f:')).to.not.throw();
  //     expect(() => checkURI('urn:')).to.not.throw();
  //   });
  //
  //   it('should not throw an uri error if a sitemap uri is valid', function() {
  //     expect(() => checkURI('foo://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose')).to.not.throw();
  //     expect(() => checkURI('foo://example.com:8042/it&apos;over/there?name=ferret&amp;pseudo=superhero#nose')).to.not.throw();
  //     expect(() => checkURI('foo://example.com:8042/it&quot;over/there?name=ferret&amp;pseudo=superhero#nose')).to.not.throw();
  //     expect(() => checkURI('foo://example.com:8042/&lt;over/there?name=ferret&amp;pseudo=superhero#nose')).to.not.throw();
  //     expect(() => checkURI('foo://example.com:8042/$gt;over/there?name=ferret&amp;pseudo=superhero#nose')).to.not.throw();
  //   });
  //
  //   it('should return a specific object if no errors were thrown', function() {
  //     let check = checkURI('foo://中文.com:8042/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'foo');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', null);
  //     expect(check).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', 8042);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/over/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'name=ferret');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', 'nose');
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkURI('ftp://user:pass@example.com/');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'ftp');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
  //     expect(check).to.be.an('object').and.to.have.property('host', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', null);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/');
  //     expect(check).to.be.an('object').and.to.have.property('query', null);
  //     expect(check).to.be.an('object').and.to.have.property('fragment', null);
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //   });
  // });
  //
  // context('when using checkHttpURL that uses checkURI', function() {
  //   // SAME TESTS FROM checkURISyntax to check consistency
  //   it('should throw an uri error when uri is not a string', function() {
  //     expect(() => checkHttpURL()).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkHttpURL(undefined)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkHttpURL(null)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkHttpURL(NaN)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkHttpURL([])).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkHttpURL(new Error('error'))).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkHttpURL(5)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkHttpURL(true)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkHttpURL(false)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //     expect(() => checkHttpURL({})).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
  //   });
  //
  //   it('should throw an uri error when uri has no scheme', function() {
  //     // scheme cannot be an empty string following parseURI behavior
  //     expect(() => checkHttpURL('/Users/dir/file.js')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
  //     expect(() => checkHttpURL('://example.com')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
  //     expect(() => checkHttpURL(':')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
  //   });
  //
  //   // if authority is present following parseURI behavior path will always be at least empty or start with /
  //
  //   it('should throw an uri error when authority is not present and path starts with //', function() {
  //     expect(() => checkHttpURL('http://example.co.jp//path')).to.not.throw();
  //     expect(() => checkHttpURL('http:////path')).to.throw(URIError).with.property('code', 'URI_INVALID_PATH');
  //   });
  //
  //   it('should not throw if an uri has at least a scheme and a path', function() {
  //     expect(() => checkHttpURL('http://example.com')).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com/path')).to.not.throw();
  //   });
  //
  //   // SAME TESTS FROM checkURI to check consistency
  //   it('should throw an uri error when scheme has invalid chars', function() {
  //     expect(() => checkHttpURL('htép://example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME_CHAR');
  //     expect(() => checkHttpURL('ht°p://example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME_CHAR');
  //   });
  //
  //   it('should throw an uri error when userinfo has invalid characters', function() {
  //     expect(() => checkHttpURL('http://usér:pass@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_USERINFO_CHAR');
  //     expect(() => checkHttpURL('http://us€r:pass@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_USERINFO_CHAR');
  //     expect(() => checkHttpURL('http://user:pa[ss@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_USERINFO_CHAR');
  //     expect(() => checkHttpURL('http://usEr:pass@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_USERINFO_CHAR');
  //     expect(() => checkHttpURL('http://usEr:pasS@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_USERINFO_CHAR');
  //   });
  //
  //   it('should throw an uri error when userinfo has invalid percent encodings', function() {
  //     expect(() => checkHttpURL('http://user%:pass@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://user%20%2z:pass@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://user:%acpass@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://user:pass%@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://user:pass%a@example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //   });
  //
  //   it('should throw an uri error when host is not a valid ip', function() {
  //     expect(() => checkHttpURL('http://999.999.999.999:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //     expect(() => checkHttpURL('http://3ffe:b00::1::a/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //   });
  //
  //   it('should throw an uri error when host is not a valid domain', function() {
  //     expect(() => checkHttpURL('http://aaaaaa:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //     expect(() => checkHttpURL('http://com.com/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //     expect(() => checkHttpURL('http://example..com/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //     expect(() => checkHttpURL('http://xn--iñvalid.com/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //     expect(() => checkHttpURL('http:///path', { web: true })).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //   });
  //
  //   it('should throw an uri error when port is not a number', function() {
  //     expect(() => checkHttpURL('http://example.com:80g42/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PORT');
  //   });
  //
  //   it('should throw an uri error when invalid characters are found following scheme://authority', function() {
  //     expect(() => checkHttpURL('http://example.com:8042/over/thère?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/ôver/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/over\\there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/\\over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/over^there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/{over}/the`re?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/over|there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/over}/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/over/{there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_CHAR');
  //   });
  //
  //   it('should throw an uri error when invalid percent encodings are found following scheme://authority', function() {
  //     expect(() => checkHttpURL('http://example.com:8042/over/there%20%20%?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there%2?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there%Aa?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/%2cover/there%20%20?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/%a2over/there%20%20%?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/%gover/there%20%20%?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/%20over/there%20%20%?name=ferret%#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/%20over/there%20%20%?name=ferret%%#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there%20%20%?name=f%erret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose%')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose%A')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose%ef')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose%ac')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose%9')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose%8c')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose%a9')).to.throw(URIError).with.property('code', 'URI_INVALID_PERCENT_ENCODING');
  //   });
  //
  //   it('should not throw an uri error when unescaped but allowed sitemap characters are found following scheme://authority if sitemap is false', function() {
  //     expect(() => checkHttpURL('http://example.com:8042/it\'sover/there?name=ferret#nose', { sitemap: false })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/it"s%20over/there?name=ferret#nose', { sitemap: false })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret&pseudo=superhero#nose', { sitemap: false })).to.not.throw();
  //   });
  //
  //   it('should throw an uri error when unescaped sitemap characters are found following scheme://authority if sitemap is true', function() {
  //     expect(() => checkHttpURL('http://example.com:8042/it\'sover/there?name=ferret#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/it"s%20over/there?name=ferret#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret&pseudo=superhero#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret&pseudo=superhero#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/over/&quotthere?name=ferret#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/over&am/there?name=ferret#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret&apo#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret&g#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret&l;#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SITEMAP_CHAR');
  //   });
  //
  //   // ADDITIONAL TESTS
  //   it('should not throw an uri error if a http sitemap uri is valid and sitemap is true', function() {
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/it&apos;sover/there?name=ferret#nose', { sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/it&quot;sover/there?name=ferret#nose', { sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/&lt;over&gt;/there?name=ferret#nose', { sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/&amp;sover/&gt;there&lt;?name=ferret#nose', { sitemap: true })).to.not.throw();
  //   });
  //
  //   it('should not throw an uri error if a http sitemap uri is valid and sitemap is false', function() {
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/it&apos;sover/there?name=ferret#nose', { sitemap: false })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/it&quot;sover/there?name=ferret#nose', { sitemap: false })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/&lt;over&gt;/there?name=ferret#nose', { sitemap: false })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/&amp;sover/&gt;there&lt;?name=ferret#nose', { sitemap: false })).to.not.throw();
  //   });
  //
  //   it('should not throw an uri error if a https sitemap uri is valid when https is true and sitemap is false', function() {
  //     expect(() => checkHttpURL('https://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { https: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com:8042/it&apos;sover/there?name=ferret#nose', { https: true, sitemap: false })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com:8042/it&quot;sover/there?name=ferret#nose', { https: true, sitemap: false })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com:8042/&lt;over&gt;/there?name=ferret#nose', { https: true, sitemap: false })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com:8042/&amp;sover/&gt;there&lt;?name=ferret#nose', { https: true, sitemap: false })).to.not.throw();
  //   });
  //
  //   it('should not throw an uri error if a https sitemap uri is valid when https and sitemap are true', function() {
  //     expect(() => checkHttpURL('https://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { https: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com:8042/it&apos;sover/there?name=ferret#nose', { https: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com:8042/it&quot;sover/there?name=ferret#nose', { https: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com:8042/&lt;over&gt;/there?name=ferret#nose', { https: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com:8042/&amp;sover/&gt;there&lt;?name=ferret#nose', { https: true, sitemap: true })).to.not.throw();
  //   });
  //
  //   it('should not throw an uri error if a http or https sitemap uri is valid when web is true', function() {
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { web: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/it&apos;sover/there?name=ferret#nose', { web: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/it&quot;sover/there?name=ferret#nose', { web: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/&lt;over&gt;/there?name=ferret#nose', { web: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com:8042/&amp;sover/&gt;there&lt;?name=ferret#nose', { web: true, sitemap: true })).to.not.throw();
  //
  //     expect(() => checkHttpURL('https://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { web: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com:8042/it&apos;sover/there?name=ferret#nose', { web: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com:8042/it&quot;sover/there?name=ferret#nose', { web: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com:8042/&lt;over&gt;/there?name=ferret#nose', { web: true, sitemap: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com:8042/&amp;sover/&gt;there&lt;?name=ferret#nose', { web: true, sitemap: true })).to.not.throw();
  //   });
  //
  //   it('should throw an uri error if scheme is not http when no option is provided', function() {
  //     expect(() => checkHttpURL('foo://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('ftp://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('f://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('c://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('https://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //   });
  //
  //   it('should throw an uri error if scheme is not http when no option is provided', function() {
  //     expect(() => checkHttpURL('foo://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('ftp://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('f://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('c://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('https://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //
  //     expect(() => checkHttpURL('foo://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('ftp://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('f://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('c://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('https://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //   });
  //
  //   it('should throw an uri error if scheme is not http when https and web options are false', function() {
  //     expect(() => checkHttpURL('foo://example.com:8042/over/there?name=ferret#nose', { https: false, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('ftp://example.com:8042/over/there?name=ferret#nose', { https: false, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('f://example.com:8042/over/there?name=ferret#nose', { https: false, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('c://example.com:8042/over/there?name=ferret#nose', { https: false, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('https://example.com:8042/over/there?name=ferret#nose', { https: false, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //
  //     expect(() => checkHttpURL('foo://example.com:8042/over/there?name=ferret#nose', { https: false, web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('ftp://example.com:8042/over/there?name=ferret#nose', { https: false, web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('f://example.com:8042/over/there?name=ferret#nose', { https: false, web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('c://example.com:8042/over/there?name=ferret#nose', { https: false, web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('https://example.com:8042/over/there?name=ferret#nose', { https: false, web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //   });
  //
  //   it('should throw an uri error if authority is null for http, https and sitemap urls', function() {
  //     expect(() => checkHttpURL('http:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //     expect(() => checkHttpURL('https:isbn:0-486-27557-4', { https: true, web: false })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //     expect(() => checkHttpURL('https:isbn:0-486-27557-4', { https: true, web: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //     expect(() => checkHttpURL('https:isbn:0-486-27557-4', { https: false, web: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //     expect(() => checkHttpURL('https:isbn:0-486-27557-4', { web: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //
  //     expect(() => checkHttpURL('http:isbn:0-486-27557-4', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //     expect(() => checkHttpURL('https:isbn:0-486-27557-4', { https: true, web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //     expect(() => checkHttpURL('https:isbn:0-486-27557-4', { https: true, web: true, sitemap: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //     expect(() => checkHttpURL('https:isbn:0-486-27557-4', { https: false, web: true, sitemap: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //     expect(() => checkHttpURL('https:isbn:0-486-27557-4', { web: true, sitemap: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //   });
  //
  //   it('should throw an uri error if scheme is not http when https is false and web is true', function() {
  //     expect(() => checkHttpURL('foo://example.com:8042/over/there?name=ferret#nose', { https: false, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('ftp://example.com:8042/over/there?name=ferret#nose', { https: false, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('f://example.com:8042/over/there?name=ferret#nose', { https: false, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('c://example.com:8042/over/there?name=ferret#nose', { https: false, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('https://example.com:8042/over/there?name=ferret#nose', { https: false, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //
  //     expect(() => checkHttpURL('foo://example.com:8042/over/there?name=ferret#nose', { https: false, web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('ftp://example.com:8042/over/there?name=ferret#nose', { https: false, web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('f://example.com:8042/over/there?name=ferret#nose', { https: false, web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('c://example.com:8042/over/there?name=ferret#nose', { https: false, web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('https://example.com:8042/over/there?name=ferret#nose', { https: false, web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //   });
  //
  //   it('should not throw an uri error when uri is a valid http url', function() {
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com/')).to.not.throw();
  //     expect(() => checkHttpURL('http://user:pass@example.com:8042/over/there?name=ferret')).to.not.throw();
  //     expect(() => checkHttpURL('http://user:pass@example.com')).to.not.throw();
  //     expect(() => checkHttpURL('http://user:pass@example.com./')).to.not.throw();
  //     expect(() => checkHttpURL('http://user:pass@example.com.')).to.not.throw();
  //     expect(() => checkHttpURL('http://user:pass@example.com:8042/over/there#nose')).to.not.throw();
  //   });
  //
  //   it('should throw an uri error if scheme is not https when https is true and web is false', function() {
  //     expect(() => checkHttpURL('foo://example.com:8042/over/there?name=ferret#nose', { https: true, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('ftp://example.com:8042/over/there?name=ferret#nose', { https: true, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('f://example.com:8042/over/there?name=ferret#nose', { https: true, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('c://example.com:8042/over/there?name=ferret#nose', { https: true, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose', { https: true, web: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //
  //     expect(() => checkHttpURL('foo://example.com:8042/over/there?name=ferret#nose', { https: true, web: false, sitempa: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('ftp://example.com:8042/over/there?name=ferret#nose', { https: true, web: false, sitempa: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('f://example.com:8042/over/there?name=ferret#nose', { https: true, web: false, sitempa: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('c://example.com:8042/over/there?name=ferret#nose', { https: true, web: false, sitempa: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose', { https: true, web: false, sitempa: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //   });
  //
  //   it('should throw an uri error if scheme is not https when https is true and web is true', function() {
  //     expect(() => checkHttpURL('foo://example.com:8042/over/there?name=ferret#nose', { https: true, web: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('ftp://example.com:8042/over/there?name=ferret#nose', { https: true, web: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('f://example.com:8042/over/there?name=ferret#nose', { https: true, web: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('c://example.com:8042/over/there?name=ferret#nose', { https: true, web: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose', { https: true, web: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //
  //     expect(() => checkHttpURL('foo://example.com:8042/over/there?name=ferret#nose', { https: true, web: true, sitempa: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('ftp://example.com:8042/over/there?name=ferret#nose', { https: true, web: true, sitempa: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('f://example.com:8042/over/there?name=ferret#nose', { https: true, web: true, sitempa: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('c://example.com:8042/over/there?name=ferret#nose', { https: true, web: true, sitempa: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose', { https: true, web: true, sitempa: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //   });
  //
  //   it('should not throw an uri error when uri is a valid https url when https is true', function() {
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose'), { https: true }).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com/', { https: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://user:pass@example.com:8042/over/there?name=ferret', { https: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://user:pass@example.com', { https: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://user:pass@example.com./', { https: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://user:pass@example.com.', { https: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://user:pass@example.com:8042/over/there#nose', { https: true })).to.not.throw();
  //   });
  //
  //   it('should not throw an uri error when uri is a valid http or https url when web is true', function() {
  //     expect(() => checkHttpURL('http://example.com:8042/over/there?name=ferret#nose', { web: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://example.com/', { web: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://user:pass@example.com:8042/over/there?name=ferret', { web: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://user:pass@example.com', { web: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://user:pass@example.com./', { web: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://user:pass@example.com.', { web: true })).to.not.throw();
  //     expect(() => checkHttpURL('http://user:pass@example.com:8042/over/there#nose', { web: true })).to.not.throw();
  //
  //     expect(() => checkHttpURL('https://example.com:8042/over/there?name=ferret#nose', { web: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://example.com/', { web: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://user:pass@example.com:8042/over/there?name=ferret', { web: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://user:pass@example.com', { web: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://user:pass@example.com./', { web: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://user:pass@example.com.', { web: true })).to.not.throw();
  //     expect(() => checkHttpURL('https://user:pass@example.com:8042/over/there#nose', { web: true })).to.not.throw();
  //   });
  //
  //   it('should return a specific object if no errors were thrown', function() {
  //     let check = checkHttpURL('http://中文.com:8042/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'http');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', null);
  //     expect(check).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', 8042);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/over/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'name=ferret');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', 'nose');
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkHttpURL('https://user:pass@example.com/', { https: true });
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'https');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
  //     expect(check).to.be.an('object').and.to.have.property('host', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', null);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/');
  //     expect(check).to.be.an('object').and.to.have.property('query', null);
  //     expect(check).to.be.an('object').and.to.have.property('fragment', null);
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkHttpURL('https://user:pass@example.com/', { web: true });
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'https');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
  //     expect(check).to.be.an('object').and.to.have.property('host', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', null);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/');
  //     expect(check).to.be.an('object').and.to.have.property('query', null);
  //     expect(check).to.be.an('object').and.to.have.property('fragment', null);
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkHttpURL('https://中文.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { https: true, sitemap: true });
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'https');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', null);
  //     expect(check).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', 8042);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/over/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret&amp;pseudo=superhero#nose');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'name=ferret&amp;pseudo=superhero');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', 'nose');
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //   });
  // });
  //
  // context('when using checkHttpsURL that uses checkHttpURL', function() {
  //   it('should throw an uri error if scheme is not https', function() {
  //     expect(() => checkHttpsURL('foo://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpsURL('ftp://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpsURL('f://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpsURL('c://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpsURL('http://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //   });
  //
  //   it('should throw an uri error if authority is null', function() {
  //     expect(() => checkHttpsURL('https:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //   });
  //
  //   it('should not throw an uri error when uri is a valid https url', function() {
  //     expect(() => checkHttpsURL('https://example.com:8042/over/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpsURL('https://example.com/')).to.not.throw();
  //     expect(() => checkHttpsURL('https://user:pass@example.com:8042/over/there?name=ferret')).to.not.throw();
  //     expect(() => checkHttpsURL('https://user:pass@example.com')).to.not.throw();
  //     expect(() => checkHttpsURL('https://user:pass@example.com./')).to.not.throw();
  //     expect(() => checkHttpsURL('https://user:pass@example.com.')).to.not.throw();
  //     expect(() => checkHttpsURL('https://user:pass@example.com:8042/over/there#nose')).to.not.throw();
  //   });
  //
  //   it('should return a specific object if no errors were thrown', function() {
  //     let check = checkHttpsURL('https://user:pass@example.com/');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'https');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
  //     expect(check).to.be.an('object').and.to.have.property('host', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', null);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/');
  //     expect(check).to.be.an('object').and.to.have.property('query', null);
  //     expect(check).to.be.an('object').and.to.have.property('fragment', null);
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkHttpsURL('https://中文.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'https');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', null);
  //     expect(check).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', 8042);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/over/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret&amp;pseudo=superhero#nose');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'name=ferret&amp;pseudo=superhero');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', 'nose');
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //   });
  // });
  //
  // context('when using checkHttpSitemapURL that uses checkHttpURL', function() {
  //   it('should not throw an uri error if a http sitemap uri is valid', function() {
  //     expect(() => checkHttpSitemapURL('http://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose')).to.not.throw();
  //     expect(() => checkHttpSitemapURL('http://example.com:8042/it&apos;sover/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpSitemapURL('http://example.com:8042/it&quot;sover/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpSitemapURL('http://example.com:8042/&lt;over&gt;/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpSitemapURL('http://example.com:8042/&amp;sover/&gt;there&lt;?name=ferret#nose')).to.not.throw();
  //   });
  //
  //   it('should throw an uri error if scheme is not http', function() {
  //     expect(() => checkHttpSitemapURL('foo://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpSitemapURL('ftp://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpSitemapURL('f://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpSitemapURL('c://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpSitemapURL('https://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //   });
  //
  //   it('should throw an uri error if authority is null', function() {
  //     expect(() => checkHttpSitemapURL('http:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //   });
  //
  //   it('should not throw an uri error when uri is a valid http url with no characters to escape', function() {
  //     expect(() => checkHttpSitemapURL('http://example.com:8042/over/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpSitemapURL('http://example.com/')).to.not.throw();
  //     expect(() => checkHttpSitemapURL('http://user:pass@example.com:8042/over/there?name=ferret')).to.not.throw();
  //     expect(() => checkHttpSitemapURL('http://user:pass@example.com')).to.not.throw();
  //     expect(() => checkHttpSitemapURL('http://user:pass@example.com./')).to.not.throw();
  //     expect(() => checkHttpSitemapURL('http://user:pass@example.com.')).to.not.throw();
  //     expect(() => checkHttpSitemapURL('http://user:pass@example.com:8042/over/there#nose')).to.not.throw();
  //   });
  //
  //   it('should return a specific object if no errors were thrown', function() {
  //     let check = checkHttpSitemapURL('http://中文.com:8042/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'http');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', null);
  //     expect(check).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', 8042);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/over/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'name=ferret');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', 'nose');
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkHttpSitemapURL('http://user:pass@example.com/there?a=5&amp;b=9');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'http');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
  //     expect(check).to.be.an('object').and.to.have.property('host', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', null);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/there?a=5&amp;b=9');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'a=5&amp;b=9');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', null);
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //   });
  // });
  //
  // context('when using checkHttpsSitemapURL that uses checkHttpURL', function() {
  //   it('should not throw an uri error if a https sitemap uri is valid', function() {
  //     expect(() => checkHttpsSitemapURL('https://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://example.com:8042/it&apos;sover/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://example.com:8042/it&quot;sover/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://example.com:8042/&lt;over&gt;/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://example.com:8042/&amp;sover/&gt;there&lt;?name=ferret#nose')).to.not.throw();
  //   });
  //
  //   it('should throw an uri error if scheme is not https', function() {
  //     expect(() => checkHttpsSitemapURL('foo://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpsSitemapURL('ftp://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpsSitemapURL('f://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpsSitemapURL('c://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkHttpsSitemapURL('http://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //   });
  //
  //   it('should throw an uri error if authority is null', function() {
  //     expect(() => checkHttpsSitemapURL('https:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //   });
  //
  //   it('should not throw an uri error when uri is a valid https url with no characters to escape', function() {
  //     expect(() => checkHttpsSitemapURL('https://example.com:8042/over/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://example.com/')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://user:pass@example.com:8042/over/there?name=ferret')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://user:pass@example.com')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://user:pass@example.com./')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://user:pass@example.com.')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://user:pass@example.com:8042/over/there#nose')).to.not.throw();
  //   });
  //
  //   it('should return a specific object if no errors were thrown', function() {
  //     let check = checkHttpsSitemapURL('https://中文.com:8042/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'https');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', null);
  //     expect(check).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', 8042);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/over/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'name=ferret');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', 'nose');
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkHttpsSitemapURL('https://user:pass@example.com/there?a=5&amp;b=9');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'https');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
  //     expect(check).to.be.an('object').and.to.have.property('host', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', null);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/there?a=5&amp;b=9');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'a=5&amp;b=9');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', null);
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //   });
  // });
  //
  // context('when using checkWebURL that uses checkHttpURL', function() {
  //   it('should throw an uri error if scheme is not http or https', function() {
  //     expect(() => checkWebURL('foo://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkWebURL('ftp://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkWebURL('f://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkWebURL('c://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //   });
  //
  //   it('should throw an uri error if authority is null or empty', function() {
  //     expect(() => checkWebURL('http:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //     expect(() => checkWebURL('http:///path', { web: true })).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //     expect(() => checkWebURL('https:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //     expect(() => checkWebURL('https:///path', { web: true })).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
  //   });
  //
  //   it('should not throw an uri error when uri is a valid http url', function() {
  //     expect(() => checkWebURL('http://example.com:8042/over/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkWebURL('http://example.com/')).to.not.throw();
  //     expect(() => checkWebURL('http://user:pass@example.com:8042/over/there?name=ferret')).to.not.throw();
  //     expect(() => checkWebURL('http://user:pass@example.com')).to.not.throw();
  //     expect(() => checkWebURL('http://user:pass@example.com./')).to.not.throw();
  //     expect(() => checkWebURL('http://user:pass@example.com.')).to.not.throw();
  //     expect(() => checkWebURL('http://user:pass@example.com:8042/over/there#nose')).to.not.throw();
  //   });
  //
  //   it('should not throw an uri error when uri is a valid https url', function() {
  //     expect(() => checkWebURL('http://example.com:8042/over/there?name=ferret#nose'), { https: true }).to.not.throw();
  //     expect(() => checkWebURL('https://example.com/', { https: true })).to.not.throw();
  //     expect(() => checkWebURL('https://user:pass@example.com:8042/over/there?name=ferret', { https: true })).to.not.throw();
  //     expect(() => checkWebURL('https://user:pass@example.com', { https: true })).to.not.throw();
  //     expect(() => checkWebURL('https://user:pass@example.com./', { https: true })).to.not.throw();
  //     expect(() => checkWebURL('https://user:pass@example.com.', { https: true })).to.not.throw();
  //     expect(() => checkWebURL('https://user:pass@example.com:8042/over/there#nose', { https: true })).to.not.throw();
  //   });
  //
  //   it('should return a specific object if no errors were thrown', function() {
  //     let check = checkWebURL('http://中文.com:8042/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'http');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', null);
  //     expect(check).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', 8042);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/over/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'name=ferret');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', 'nose');
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkWebURL('https://user:pass@example.com/', { https: true });
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'https');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
  //     expect(check).to.be.an('object').and.to.have.property('host', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', null);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/');
  //     expect(check).to.be.an('object').and.to.have.property('query', null);
  //     expect(check).to.be.an('object').and.to.have.property('fragment', null);
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkWebURL('https://user:pass@example.com/', { web: true });
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'https');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
  //     expect(check).to.be.an('object').and.to.have.property('host', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', null);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/');
  //     expect(check).to.be.an('object').and.to.have.property('query', null);
  //     expect(check).to.be.an('object').and.to.have.property('fragment', null);
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkWebURL('https://中文.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose', { https: true, sitemap: true });
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'https');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', null);
  //     expect(check).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', 8042);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/over/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret&amp;pseudo=superhero#nose');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'name=ferret&amp;pseudo=superhero');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', 'nose');
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //   });
  // });
  //
  // context('when using checkSitemapURL that uses checkHttpURL', function() {
  //   it('should not throw an uri error if a http sitemap uri is valid', function() {
  //     expect(() => checkSitemapURL('http://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose')).to.not.throw();
  //     expect(() => checkSitemapURL('http://example.com:8042/it&apos;sover/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkSitemapURL('http://example.com:8042/it&quot;sover/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkSitemapURL('http://example.com:8042/&lt;over&gt;/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkSitemapURL('http://example.com:8042/&amp;sover/&gt;there&lt;?name=ferret#nose')).to.not.throw();
  //   });
  //
  //   it('should not throw an uri error if a https sitemap uri is valid', function() {
  //     expect(() => checkHttpsSitemapURL('https://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://example.com:8042/it&apos;sover/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://example.com:8042/it&quot;sover/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://example.com:8042/&lt;over&gt;/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkHttpsSitemapURL('https://example.com:8042/&amp;sover/&gt;there&lt;?name=ferret#nose')).to.not.throw();
  //   });
  //
  //   it('should throw an uri error if scheme is not http or https', function() {
  //     expect(() => checkSitemapURL('foo://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkSitemapURL('ftp://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkSitemapURL('f://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //     expect(() => checkSitemapURL('c://example.com:8042/over/there?name=ferret#nose')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
  //   });
  //
  //   it('should throw an uri error if authority is null', function() {
  //     expect(() => checkSitemapURL('http:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //     expect(() => checkSitemapURL('https:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
  //   });
  //
  //   it('should not throw an uri error when uri is a valid http or https url with no characters to escape', function() {
  //     expect(() => checkSitemapURL('http://example.com:8042/over/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkSitemapURL('http://example.com/')).to.not.throw();
  //     expect(() => checkSitemapURL('http://user:pass@example.com:8042/over/there?name=ferret')).to.not.throw();
  //     expect(() => checkSitemapURL('http://user:pass@example.com')).to.not.throw();
  //     expect(() => checkSitemapURL('http://user:pass@example.com./')).to.not.throw();
  //     expect(() => checkSitemapURL('http://user:pass@example.com.')).to.not.throw();
  //     expect(() => checkSitemapURL('http://user:pass@example.com:8042/over/there#nose')).to.not.throw();
  //
  //     expect(() => checkSitemapURL('https://example.com:8042/over/there?name=ferret#nose')).to.not.throw();
  //     expect(() => checkSitemapURL('https://example.com/')).to.not.throw();
  //     expect(() => checkSitemapURL('https://user:pass@example.com:8042/over/there?name=ferret')).to.not.throw();
  //     expect(() => checkSitemapURL('https://user:pass@example.com')).to.not.throw();
  //     expect(() => checkSitemapURL('https://user:pass@example.com./')).to.not.throw();
  //     expect(() => checkSitemapURL('https://user:pass@example.com.')).to.not.throw();
  //     expect(() => checkSitemapURL('https://user:pass@example.com:8042/over/there#nose')).to.not.throw();
  //   });
  //
  //   it('should return a specific object if no errors were thrown', function() {
  //     let check = checkSitemapURL('http://中文.com:8042/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'http');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', null);
  //     expect(check).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', 8042);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/over/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'name=ferret');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', 'nose');
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkSitemapURL('http://user:pass@example.com/there?a=5&amp;b=9');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'http');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
  //     expect(check).to.be.an('object').and.to.have.property('host', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', null);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/there?a=5&amp;b=9');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'a=5&amp;b=9');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', null);
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkHttpsSitemapURL('https://中文.com:8042/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'https');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', null);
  //     expect(check).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', 8042);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/over/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'name=ferret');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', 'nose');
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //
  //     check = checkHttpsSitemapURL('https://user:pass@example.com/there?a=5&amp;b=9');
  //     expect(check).to.be.an('object').and.to.have.property('scheme', 'https');
  //     expect(check).to.be.an('object').and.to.have.property('authority', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.com');
  //     expect(check).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
  //     expect(check).to.be.an('object').and.to.have.property('host', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
  //     expect(check).to.be.an('object').and.to.have.property('port', null);
  //     expect(check).to.be.an('object').and.to.have.property('path', '/there');
  //     expect(check).to.be.an('object').and.to.have.property('pathqf', '/there?a=5&amp;b=9');
  //     expect(check).to.be.an('object').and.to.have.property('query', 'a=5&amp;b=9');
  //     expect(check).to.be.an('object').and.to.have.property('fragment', null);
  //     expect(check).to.be.an('object').and.to.have.property('valid', true);
  //   });
  // });
  //
  // context('when using checkURI', function() {
  //   it('should not throw if the uri is valid', function() {
  //     uri.forEach((string) => {
  //       expect(() => checkURI(string)).to.not.throw();
  //     });
  //   });
  //
  //   it('should not throw if the http url is valid', function() {
  //     http.forEach((string) => {
  //       expect(() => checkURI(string)).to.not.throw();
  //     });
  //   });
  //
  //   it('should not throw if the https url is valid', function() {
  //     https.forEach((string) => {
  //       expect(() => checkURI(string)).to.not.throw();
  //     });
  //   });
  //
  //   it('should not throw if the sitemap url is valid', function() {
  //     sitemap.forEach((string) => {
  //       expect(() => checkURI(string)).to.not.throw();
  //     });
  //   });
  //
  //   it('should not throw if the idn url is valid', function() {
  //     idn.forEach((string) => {
  //       expect(() => checkURI(string)).to.not.throw();
  //     });
  //   });
  //
  //   it('should throw an uri error if the uri is not valid', function() {
  //     notUri.forEach((string) => {
  //       expect(() => checkURI(string)).to.throw(URIError);
  //     });
  //   });
  // });
  //
  // context('when using checkWebURL', function() {
  //   it('should not throw if the url is valid', function() {
  //     http.forEach((string) => {
  //       expect(() => checkWebURL(string)).to.not.throw();
  //     });
  //
  //     https.forEach((string) => {
  //       expect(() => checkWebURL(string)).to.not.throw();
  //     });
  //   });
  // });
  //
  // context('when using checkHttpURL', function() {
  //   it('should not throw if the url is valid', function() {
  //     http.forEach((string) => {
  //       expect(() => checkHttpURL(string)).to.not.throw();
  //     });
  //   });
  //
  //   it('should throw an uri error if the url is not valid', function() {
  //     notHttp.forEach((string) => {
  //       expect(() => checkHttpURL(string)).to.throw(URIError);
  //     });
  //   });
  // });
  //
  // context('when using checkHttpsURL', function() {
  //   it('should not throw if the url is valid', function() {
  //     https.forEach((string) => {
  //       expect(() => checkHttpsURL(string)).to.not.throw();
  //     });
  //   });
  //
  //   it('should throw an uri error if the url is not valid', function() {
  //     notHttps.forEach((string) => {
  //       expect(() => checkHttpsURL(string)).to.throw(URIError);
  //     });
  //   });
  // });
  //
  // context('when using checkSitemapURL', function() {
  //   it('should not throw if the url is valid', function() {
  //     sitemap.forEach((string) => {
  //       expect(() => checkSitemapURL(string)).to.not.throw();
  //     });
  //   });
  //
  //   it('should throw an uri error if the url is not valid', function() {
  //     notSitemap.forEach((string) => {
  //       expect(() => checkSitemapURL(string)).to.throw(URIError);
  //     });
  //   });
  // });
});
