const { expect } = require('../Common');
const {
  decodeURIComponentString,
  decodeURIString,
  decodeWebURL,
  decodeSitemapURL,
} = require('../../src/decoders');
const { maxLengthURL, minPortInteger, maxPortInteger } = require('../../src/config');
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

describe('#decoders', function() {
  context('when using decodeURIComponentString', function() {
    it('should return an empty string when uri is not a string', function() {
      expect(decodeURIComponentString()).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString(undefined)).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString(null)).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString(NaN)).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString([])).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString(new Error('error'))).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString(5)).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString(true)).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString(false)).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString({})).to.be.a('string').and.to.equals('');
    });

    it('should return a lowercased string only if lowercase is true', function() {
      expect(decodeURIComponentString('ABCDEF')).to.be.a('string').and.to.equals('ABCDEF');
      expect(decodeURIComponentString('ABcDEF')).to.be.a('string').and.to.equals('ABcDEF');
      expect(decodeURIComponentString('aBcDEF')).to.be.a('string').and.to.equals('aBcDEF');
      expect(decodeURIComponentString('aBcDEf')).to.be.a('string').and.to.equals('aBcDEf');
      expect(decodeURIComponentString('abcdef')).to.be.a('string').and.to.equals('abcdef');
      expect(decodeURIComponentString(AZ)).to.be.a('string').and.to.equals(AZ);

      expect(decodeURIComponentString('ABCDEF', { lowercase: true })).to.be.a('string').and.to.equals('abcdef');
      expect(decodeURIComponentString('ABcDEF', { lowercase: true })).to.be.a('string').and.to.equals('abcdef');
      expect(decodeURIComponentString('aBcDEF', { lowercase: true })).to.be.a('string').and.to.equals('abcdef');
      expect(decodeURIComponentString('aBcDEf', { lowercase: true })).to.be.a('string').and.to.equals('abcdef');
      expect(decodeURIComponentString('abcdef', { lowercase: true })).to.be.a('string').and.to.equals('abcdef');
      expect(decodeURIComponentString(AZ, { lowercase: true })).to.be.a('string').and.to.equals(az);
    });

    it('should return letters in uppercase if lowercase is false', function() {
      expect(decodeURIComponentString('ABCDEF', { lowercase: false })).to.be.a('string').and.to.equals('ABCDEF');
      expect(decodeURIComponentString('ABcDEF', { lowercase: false })).to.be.a('string').and.to.equals('ABcDEF');
      expect(decodeURIComponentString('aBcDEF', { lowercase: false })).to.be.a('string').and.to.equals('aBcDEF');
      expect(decodeURIComponentString('aBcDEf', { lowercase: false })).to.be.a('string').and.to.equals('aBcDEf');
      expect(decodeURIComponentString('abcdef', { lowercase: false })).to.be.a('string').and.to.equals('abcdef');
      expect(decodeURIComponentString(AZ, { lowercase: false })).to.be.a('string').and.to.equals(AZ);
    });

    it('should return a string with the exact same characters if allowed, by default', function() {
      expect(decodeURIComponentString(az)).to.be.a('string').and.to.equals(az);
      expect(decodeURIComponentString(AZ)).to.be.a('string').and.to.equals(AZ);
      expect(decodeURIComponentString(digits)).to.be.a('string').and.to.equals(digits);
      expect(decodeURIComponentString(allowed.replace('%', ''))).to.be.a('string').and.to.equals(allowed.replace('%', ''));

      expect(decodeURIComponentString(az, { sitemap: false })).to.be.a('string').and.to.equals(az);
      expect(decodeURIComponentString(AZ, { sitemap: false })).to.be.a('string').and.to.equals(AZ);
      expect(decodeURIComponentString(digits, { sitemap: false })).to.be.a('string').and.to.equals(digits);
      expect(decodeURIComponentString(allowed.replace('%', ''), { sitemap: false })).to.be.a('string').and.to.equals(allowed.replace('%', ''));
    });

    it('should return a string with the exact same characters if allowed when sitemap is true', function() {
      expect(decodeURIComponentString(az, { sitemap: true })).to.be.a('string').and.to.equals(az);
      expect(decodeURIComponentString(AZ, { sitemap: true })).to.be.a('string').and.to.equals(AZ);
      expect(decodeURIComponentString(digits, { sitemap: true })).to.be.a('string').and.to.equals(digits);
      expect(decodeURIComponentString(allowed.replace('%', ''), { sitemap: true })).to.be.a('string').and.to.equals(allowed.replace('%', ''));
      expect(decodeURIComponentString('*\'&', { sitemap: true })).to.be.a('string').and.to.equals('*\'&');
    });

    it('should return an empty string if percent encoded characters are wrong whether sitemap option is true or false', function() {
      expect(decodeURIComponentString('%')).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString('%A')).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString('%20%%A')).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString('%20%9')).to.be.a('string').and.to.equals('');

      expect(decodeURIComponentString('%', { sitemap: false })).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString('%A', { sitemap: false })).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString('%20%%At', { sitemap: false })).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString('%20%9', { sitemap: false })).to.be.a('string').and.to.equals('');

      expect(decodeURIComponentString('%', { sitemap: true })).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString('%A', { sitemap: true })).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString('%20%%Yx', { sitemap: true })).to.be.a('string').and.to.equals('');
      expect(decodeURIComponentString('a%20%9', { sitemap: true })).to.be.a('string').and.to.equals('');
    });

    it('should return a string with percent encoded characters decoded whether sitemap option is true or false', function() {
      expect(decodeURIComponentString('%5C%5E%60%7B%7C%7D%3C%3E')).to.be.a('string').and.to.equals(disallowed);
      expect(decodeURIComponentString('%3C%3E')).to.be.a('string').and.to.equals('<>');
      expect(decodeURIComponentString('%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3')).to.be.a('string').and.to.equals(disallowedOtherChars);

      expect(decodeURIComponentString('%5C%5E%60%7B%7C%7D%3C%3E', { sitemap: false })).to.be.a('string').and.to.equals(disallowed);
      expect(decodeURIComponentString('%3C%3E', { sitemap: false })).to.be.a('string').and.to.equals('<>');
      expect(decodeURIComponentString('%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3', { sitemap: false })).to.be.a('string').and.to.equals(disallowedOtherChars);

      expect(decodeURIComponentString('%5C%5E%60%7B%7C%7D%3C%3E', { sitemap: true })).to.be.a('string').and.to.equals(disallowed);
      expect(decodeURIComponentString('%3C%3E', { sitemap: true })).to.be.a('string').and.to.equals('<>');
      expect(decodeURIComponentString('%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3', { sitemap: true })).to.be.a('string').and.to.equals(disallowedOtherChars);
    });

    it('should return a string with unescaped characters when sitemap is true', function() {
      expect(decodeURIComponentString('&amp;&apos;%2A', { sitemap: true })).to.be.a('string').and.to.equals('&\'*');
      expect(decodeURIComponentString('http://www.example.co.jp/it&apos;s%20there?name=thx%2A&amp;pseudo=superhero#anchor', { sitemap: true })).to.be.a('string').and.to.equals('http://www.example.co.jp/it\'s there?name=thx*&pseudo=superhero#anchor');
      expect(decodeURIComponentString('&amp;&apos;%2A', { sitemap: false })).to.be.a('string').and.to.equals('&amp;&apos;*');
      expect(decodeURIComponentString('&\'%2A', { sitemap: false })).to.be.a('string').and.to.equals('&\'*');
    });
  });

  context('when using decodeURIString that uses checkURISyntax and decodeURIComponentString', function() {
    it('should throw an uri error when uri is not a string', function() {
      expect(() => decodeURIString()).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeURIString(undefined)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeURIString(null)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeURIString(NaN)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeURIString([])).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeURIString(new Error('error'))).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeURIString(5)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeURIString(true)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeURIString(false)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeURIString({})).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
    });

    it('should throw an uri error when uri has no scheme', function() {
      // scheme cannot be an empty string following parseURI behavior
      expect(() => decodeURIString('/Users/dir/file.js')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
      expect(() => decodeURIString('://example.com')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
      expect(() => decodeURIString(':')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
    });

    it('should throw an uri error when scheme has invalid chars', function() {
      expect(() => decodeURIString('htép://example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME_CHAR');
      expect(() => decodeURIString('ht°p://example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME_CHAR');
    });

    it('should throw an uri error if scheme is not http or https when option is web or sitemap', function() {
      expect(() => decodeURIString('httpp://www.example.com', { web: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => decodeURIString('httpp://www.example.com', { web: true, sitemap: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => decodeURIString('httpp://www.example.com', { web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => decodeURIString('httpp://www.example.com', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');

      expect(() => decodeURIString('htp://www.example.com', { web: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => decodeURIString('htp://www.example.com', { web: true, sitemap: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => decodeURIString('htp://www.example.com', { web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => decodeURIString('htp://www.example.com', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
    });

    it('should not throw an uri error if scheme is not http or https when option is not web or sitemap', function() {
      expect(() => decodeURIString('httpp://www.example.com')).to.not.throw();
      expect(() => decodeURIString('httpp://www.example.com', { web: false })).to.not.throw();
      expect(() => decodeURIString('httpp://www.example.com', { web: false, sitemap: false })).to.not.throw();
      expect(() => decodeURIString('httpp://www.example.com', { web: false, sitemap: false })).to.not.throw();
      expect(() => decodeURIString('httpp://www.example.com', { sitemap: false })).to.not.throw();

      expect(() => decodeURIString('htp://www.example.com')).to.not.throw();
      expect(() => decodeURIString('htp://www.example.com', { web: false })).to.not.throw();
      expect(() => decodeURIString('htp://www.example.com', { web: false, sitemap: false })).to.not.throw();
      expect(() => decodeURIString('htp://www.example.com', { web: false, sitemap: false })).to.not.throw();
      expect(() => decodeURIString('htp://www.example.com', { sitemap: false })).to.not.throw();
    });

    it('should throw an uri error if host to decode is not valid', function() {
      expect(() => decodeURIString('http://xn--iñvalid.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
    });

    it('should throw an uri error if host to decode is not a valid IP or domain name', function() {
      expect(() => decodeURIString('http://[123:4:5%%%].com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
      expect(() => decodeURIString('http://100..100.100.100..com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
      expect(() => decodeURIString('http://a.b.a.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
    });

    it('should throw an uri error if port to decode is not an integer', function() {
      expect(() => decodeURIString('http://example.com:80g80')).to.throw(URIError).with.property('code', 'URI_INVALID_PORT');
    });

    it('should throw an uri error if port to decode is out of range', function() {
      expect(() => decodeURIString(`http://example.com:${minPortInteger - 1}`)).to.throw(URIError).with.property('code', 'URI_INVALID_PORT');
      expect(() => decodeURIString(`http://example.com:${maxPortInteger + 1}`)).to.throw(URIError).with.property('code', 'URI_INVALID_PORT');
    });

    it('should not throw an uri error if port to decode is in range', function() {
      expect(() => decodeURIString(`http://example.com:${minPortInteger}`)).to.not.throw();
      expect(() => decodeURIString(`http://example.com:${maxPortInteger}`)).to.not.throw();
    });

    it('should ignore userinfo provided if unable to decode', function() {
      expect(decodeURIString('http://user%pass@example.com:8080')).to.be.a('string').and.to.equals('http://example.com:8080/');
    });

    it('should ignore path provided if unable to decode', function() {
      expect(decodeURIString('http://example.com:8080/over%there')).to.be.a('string').and.to.equals('http://example.com:8080/');
    });

    it('should ignore query provided if unable to decode', function() {
      expect(decodeURIString('http://example.com:8080/over/there?query=val%ue')).to.be.a('string').and.to.equals('http://example.com:8080/over/there');
    });

    it('should ignore fragment provided if unable to decode', function() {
      expect(decodeURIString('http://example.com:8080/over/there?query=value#anch%or')).to.be.a('string').and.to.equals('http://example.com:8080/over/there?query=value');
    });

    it('should ignore userinfo, path, query and fragment provided if unable to decode', function() {
      expect(decodeURIString('http://user%pass@example.com:8080/over%there?query=val%ue#anch%or')).to.be.a('string').and.to.equals('http://example.com:8080/');
    });

    it('should throw an uri error if authority is null and option is web or sitemap', function() {
      expect(() => decodeURIString('http:isbn:0-486-27557-4', { web: true, sitemap: false })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => decodeURIString('https:isbn:0-486-27557-4', { web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => decodeURIString('http:isbn:0-486-27557-4', { web: true, sitemap: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => decodeURIString('https:isbn:0-486-27557-4', { web: true, sitemap: false })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => decodeURIString('http:isbn:0-486-27557-4', { web: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => decodeURIString('https:isbn:0-486-27557-4', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
    });

    it('should not throw an uri error if authority is null and option is not web or sitemap', function() {
      expect(() => decodeURIString('https:isbn:0-486-27557-4')).to.not.throw();
      expect(() => decodeURIString('http:isbn:0-486-27557-4', { web: false, sitemap: false })).to.not.throw();
      expect(() => decodeURIString('https:isbn:0-486-27557-4', { web: false, sitemap: false })).to.not.throw();
      expect(() => decodeURIString('http:isbn:0-486-27557-4', { web: false, sitemap: false })).to.not.throw();
      expect(() => decodeURIString('https:isbn:0-486-27557-4', { web: false, sitemap: false })).to.not.throw();
      expect(() => decodeURIString('http:isbn:0-486-27557-4', { web: false })).to.not.throw();
      expect(() => decodeURIString('https:isbn:0-486-27557-4', { sitemap: false })).to.not.throw();
    });

    it('should not throw an uri error if uri to decode has letters in uppercase by default', function() {
      expect(() => decodeURIString('http://example.com/OVER/there')).to.not.throw();
      expect(() => decodeURIString('HTTP://example.com/OVER/there')).to.not.throw();
      expect(() => decodeURIString('http://EXAMPLE.com/OVER/there')).to.not.throw();
      expect(() => decodeURIString('http://USER:PASS@example.com/OVER/there')).to.not.throw();
      expect(() => decodeURIString('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE')).to.not.throw();

      expect(() => decodeURIString('http://example.com/OVER/there', { web: true })).to.not.throw();
      expect(() => decodeURIString('HTTP://example.com/OVER/there', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://EXAMPLE.com/OVER/there', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://USER:PASS@example.com/OVER/there', { web: true })).to.not.throw();
      expect(() => decodeURIString('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { web: true })).to.not.throw();

      expect(() => decodeURIString('http://example.com/OVER/there', { web: true })).to.not.throw();
      expect(() => decodeURIString('HTTP://example.com/OVER/there', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://EXAMPLE.com/OVER/there', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://USER:PASS@example.com/OVER/there', { web: true })).to.not.throw();
      expect(() => decodeURIString('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { web: true })).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has letters in uppercase for scheme when lowercase is false', function() {
      expect(() => decodeURIString('FTP://example.com/OVER/there', { lowercase: false })).to.not.throw();
      expect(() => decodeURIString('FTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { lowercase: false })).to.not.throw();
      expect(() => decodeURIString('FTP://user:pass@example.com', { lowercase: false })).to.not.throw();

      expect(() => decodeURIString('HTTP://example.com/OVER/there', { web: true, lowercase: false })).to.not.throw();
      expect(() => decodeURIString('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { web: true, lowercase: false })).to.not.throw();
      expect(() => decodeURIString('HTTP://user:pass@example.com', { web: true, lowercase: false })).to.not.throw();

      expect(() => decodeURIString('HTTP://example.com/OVER/there', { sitemap: true, lowercase: false })).to.not.throw();
      expect(() => decodeURIString('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { sitemap: true, lowercase: false })).to.not.throw();
      expect(() => decodeURIString('HTTP://user:pass@example.com', { sitemap: true, lowercase: false })).to.not.throw();
    });

    it('should not throw an uri error if uri to decode has no special sitemap characters', function() {
      expect(() => decodeURIString('ftp://EXAMPLE.com/OVER*there')).to.not.throw();
      expect(() => decodeURIString('ftp://EXAMPLE.com/OVER/\'there')).to.not.throw();
      expect(() => decodeURIString('ftp://EXAMPLE.com/OVER/there&')).to.not.throw();

      expect(() => decodeURIString('http://EXAMPLE.com/OVER*there', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://EXAMPLE.com/OVER/\'there', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://EXAMPLE.com/OVER/there&', { web: true })).to.not.throw();

      expect(() => decodeURIString('http://EXAMPLE.com/OVER*there', { sitemap: true })).to.not.throw();
      expect(() => decodeURIString('http://EXAMPLE.com/OVER/\'there', { sitemap: true })).to.not.throw();
      expect(() => decodeURIString('http://EXAMPLE.com/OVER/there&', { sitemap: true })).to.not.throw();
    });

    it('should not throw an uri error if uri to decode has invalid characters that should be percent encoded whether web or sitemap is true or not', function() {
      expect(() => decodeURIString('ftp://user:pass@example.com/path{')).to.not.throw();
      expect(() => decodeURIString('ftp://user:pass@example.com/path{')).to.not.throw();
      expect(() => decodeURIString('ftp://example.com/over/t}ere')).to.not.throw();
      expect(() => decodeURIString('ftp://example.com/over|there')).to.not.throw();
      expect(() => decodeURIString('ftp://example.com/over/there')).to.not.throw();
      expect(() => decodeURIString('ftp://example.com/over/thère')).to.not.throw();
      expect(() => decodeURIString('ftp://example.com/over/there€')).to.not.throw();
      expect(() => decodeURIString('ftp://example.com/oveùr/there')).to.not.throw();

      expect(() => decodeURIString('http://user:pass@example.com/path{', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://user:pass@example.com/path{', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://example.com/over/t}ere', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://example.com/over|there', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://example.com/over/there', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://example.com/over/thère', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://example.com/over/there€', { web: true })).to.not.throw();
      expect(() => decodeURIString('http://example.com/oveùr/there', { web: true })).to.not.throw();

      expect(() => decodeURIString('http://user:pass@example.com/path{', { sitemap: true })).to.not.throw();
      expect(() => decodeURIString('http://user:pass@example.com/path{', { sitemap: true })).to.not.throw();
      expect(() => decodeURIString('http://example.com/over/t}ere', { sitemap: true })).to.not.throw();
      expect(() => decodeURIString('http://example.com/over|there', { sitemap: true })).to.not.throw();
      expect(() => decodeURIString('http://example.com/over/there', { sitemap: true })).to.not.throw();
      expect(() => decodeURIString('http://example.com/over/thère', { sitemap: true })).to.not.throw();
      expect(() => decodeURIString('http://example.com/over/there€', { sitemap: true })).to.not.throw();
      expect(() => decodeURIString('http://example.com/oveùr/there', { sitemap: true })).to.not.throw();
    });

    it('should return scheme and host in lowercase by default', function() {
      expect(decodeURIString('FTP://WWW.EXAMPLE.COM.')).to.be.a('string').and.to.equals('ftp://www.example.com./');
      expect(decodeURIString('HTTP://WWW.EXAMPLE.COM.', { web: true })).to.be.a('string').and.to.equals('http://www.example.com./');
      expect(decodeURIString('HTTP://WWW.EXAMPLE.COM.', { sitemap: true })).to.be.a('string').and.to.equals('http://www.example.com./');
    });

    it('should return an uri with uppercase letters if lowercase is false except host and scheme automatically put in lowercase to be RFC-3986 compliant', function() {
      expect(decodeURIString('ftp://WWW.EXAMPLE.COM.', { lowercase: false })).to.be.a('string').and.to.equals('ftp://www.example.com./');
      expect(decodeURIString('HTTP://WWW.EXAmPLE.COM.', { web: true, lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com./');
      expect(decodeURIString('https://WWW.EXaMPLE.COM.', { sitemap: true, lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com./');

      expect(decodeURIString('ftp://WWW.EXAMPLE.COM./Over/There', { lowercase: false })).to.be.a('string').and.to.equals('ftp://www.example.com./Over/There');
      expect(decodeURIString('http://WWW.EXAmPLE.COM./Over/There?a=B#Anchor', { web: true, lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com./Over/There?a=B#Anchor');
      expect(decodeURIString('https://WWW.EXaMPLE.COM./Over/There?a=B&amp;b=c#Anchor', { sitemap: true, lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com./Over/There?a=B&b=c#Anchor');

      expect(decodeURIString('https://WWW.中文.COM./Over/There?a=B&b=c#Anchor', { web: true, lowercase: false })).to.be.a('string').and.to.equals('https://www.中文.com./Over/There?a=B&b=c#Anchor');
      expect(decodeURIString('https://WWW.xn--fiq228c.COM./Over/There?a=B&b=c#Anchor', { web: true, lowercase: false })).to.be.a('string').and.to.equals('https://www.中文.com./Over/There?a=B&b=c#Anchor');
    });

    it('should return a string with the exact same characters if allowed, by default', function() {
      expect(decodeURIString(`urn:isbn:0-486-27557-4/${az}`)).to.be.a('string').and.to.equals(`urn:isbn:0-486-27557-4/${az}`);
    expect(decodeURIString(`urn:isbn:0-486-27557-4/${AZ}`)).to.be.a('string').and.to.equals(`urn:isbn:0-486-27557-4/${AZ}`);
      expect(decodeURIString(`urn:isbn:0-486-27557-4/${digits}`)).to.be.a('string').and.to.equals(`urn:isbn:0-486-27557-4/${digits}`);
      expect(decodeURIString(`urn:isbn:0-486-27557-4/${allowed.replace('%', '')}`)).to.be.a('string').and.to.equals(`urn:isbn:0-486-27557-4/${allowed.replace('%', '')}`);

      expect(decodeURIString(`http://example.com/${az}`, { web: false })).to.be.a('string').and.to.equals(`http://example.com/${az}`);
      expect(decodeURIString(`http://example.com/${AZ}`, { web: false })).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(decodeURIString(`http://example.com/${digits}`, { web: false })).to.be.a('string').and.to.equals(`http://example.com/${digits}`);
      expect(decodeURIString(`http://example.com/${allowed.replace('%', '')}`, { web: false })).to.be.a('string').and.to.equals(`http://example.com/${allowed.replace('%', '')}`);

      expect(decodeURIString(`http://example.com/${az}`, { sitemap: false })).to.be.a('string').and.to.equals(`http://example.com/${az}`);
      expect(decodeURIString(`http://example.com/${AZ}`, { sitemap: false })).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(decodeURIString(`http://example.com/${digits}`, { sitemap: false })).to.be.a('string').and.to.equals(`http://example.com/${digits}`);
      expect(decodeURIString(`http://example.com/${allowed.replace('%', '')}`, { sitemap: false })).to.be.a('string').and.to.equals(`http://example.com/${allowed.replace('%', '')}`);
    });

    it('should return a string with the exact same characters if allowed and to not be escaped when sitemap is true', function() {
      expect(decodeURIString(`http://example.com/${az}`, { sitemap: true })).to.be.a('string').and.to.equals(`http://example.com/${az}`);
      expect(decodeURIString(`http://example.com/${AZ}`, { sitemap: true })).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(decodeURIString(`http://example.com/${digits}`, { sitemap: true })).to.be.a('string').and.to.equals(`http://example.com/${digits}`);
      expect(decodeURIString(`http://example.com/*\'&`, { sitemap: true })).to.be.a('string').and.to.equals(`http://example.com/*\'&`);
    });

    it('should return a string with percent decoded characters, by default', function() {
      expect(decodeURIString(`http://example.com/${AZ}`)).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(decodeURIString('http://example.com/%5C%5E%60%7B%7C%7D%3C%3E')).to.be.a('string').and.to.equals(`http://example.com/${disallowed}`);
      expect(decodeURIString('http://example.com/%3C%3E')).to.be.a('string').and.to.equals('http://example.com/<>');
      expect(decodeURIString('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3')).to.be.a('string').and.to.equals(`http://example.com/${disallowedOtherChars}`);

      expect(decodeURIString(`http://example.com/${AZ}`, { web: false })).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(decodeURIString('http://example.com/%5C%5E%60%7B%7C%7D%3C%3E', { web: false })).to.be.a('string').and.to.equals(`http://example.com/${disallowed}`);
      expect(decodeURIString('http://example.com/%3C%3E', { web: false })).to.be.a('string').and.to.equals('http://example.com/<>');
      expect(decodeURIString('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3', { web: false })).to.be.a('string').and.to.equals(`http://example.com/${disallowedOtherChars}`);

      expect(decodeURIString(`http://example.com/${AZ}`, { sitemap: false })).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(decodeURIString('http://example.com/%5C%5E%60%7B%7C%7D%3C%3E', { sitemap: false })).to.be.a('string').and.to.equals(`http://example.com/${disallowed}`);
      expect(decodeURIString('http://example.com/%3C%3E', { sitemap: false })).to.be.a('string').and.to.equals('http://example.com/<>');
      expect(decodeURIString('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3', { sitemap: false })).to.be.a('string').and.to.equals(`http://example.com/${disallowedOtherChars}`);
    });

    it('should return a string with percent decoded characters if not allowed when sitemap is true', function() {
      expect(decodeURIString(`http://example.com/${AZ}`, { sitemap: true })).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(decodeURIString('http://example.com/%5C%5E%60%7B%7C%7D%3C%3E', { sitemap: true })).to.be.a('string').and.to.equals(`http://example.com/${disallowed}`);
      expect(decodeURIString('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3', { sitemap: true })).to.be.a('string').and.to.equals(`http://example.com/${disallowedOtherChars}`);
    });

    it('should return a string with unescaped characters when sitemap is true', function() {
      expect(decodeURIString('http://example.com/&amp;&apos;%2A', { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/&\'*');
    });

    it('should return the expected uri decoded string with the punydecoded host', function() {
      expect(decodeURIString('ftp://xn--exmple-4ua.com:8080')).to.be.a('string').and.to.equals('ftp://exèmple.com:8080/');
      expect(decodeURIString('ftp://exèmple.com:8080')).to.be.a('string').and.to.equals('ftp://exèmple.com:8080/');
      expect(decodeURIString('ftp://xn--exmple-4ua.com/p%C3%A2th')).to.be.a('string').and.to.equals('ftp://exèmple.com/pâth');
      expect(decodeURIString('ftp://xn--fiq228c.com.')).to.be.a('string').and.to.equals('ftp://中文.com./');

      expect(decodeURIString('http://xn--exmple-4ua.com:8080', { web: true })).to.be.a('string').and.to.equals('http://exèmple.com:8080/');
      expect(decodeURIString('http://xn--exmple-4ua.com/p%C3%A2th', { web: true })).to.be.a('string').and.to.equals('http://exèmple.com/pâth');
      expect(decodeURIString('http://xn--fiq228c.com.', { web: true })).to.be.a('string').and.to.equals('http://中文.com./');

      expect(decodeURIString('http://xn--exmple-4ua.com:8080', { sitemap: true })).to.be.a('string').and.to.equals('http://exèmple.com:8080/');
      expect(decodeURIString('http://xn--exmple-4ua.com/p%C3%A2th', { sitemap: true })).to.be.a('string').and.to.equals('http://exèmple.com/pâth');
      expect(decodeURIString('http://xn--fiq228c.com.', { sitemap: true })).to.be.a('string').and.to.equals('http://中文.com./');
    });

    it('should return the expected uri decoded string with the userinfo decoded', function() {
      expect(decodeURIString('ftp://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th')).to.be.a('string').and.to.equals('ftp://user:pâss@exèmple.com:8080/pâth');
      expect(decodeURIString('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th')).to.be.a('string').and.to.equals('http://user:pâss@exèmple.com:8080/pâth');
      expect(decodeURIString('http://us%C3%A8r:pass@example.com/')).to.be.a('string').and.to.equals('http://usèr:pass@example.com/');
    });

    it('should return the expected uri decoded string with userinfo decoded and unescaped chars when sitemap is true', function() {
      expect(decodeURIString('http://us&amp;er:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th&apos;', { sitemap: true })).to.be.a('string').and.to.equals('http://us&er:pâss@exèmple.com:8080/pâth\'');
      expect(decodeURIString('http://us&apos;r:pa%2Ass@example.com/', { sitemap: true })).to.be.a('string').and.to.equals('http://us\'r:pa*ss@example.com/');
    });

    it('should return the expected uri decoded string with the path decoded and unescaped chars when sitemap is true', function() {
      expect(decodeURIString('http://example.com/p%2A.html')).to.be.a('string').and.to.equals('http://example.com/p*.html');
      expect(decodeURIString('http://example.com/p%2A&amp;.html', { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/p*&.html');
    });

    it('should return the expected uri decoded string with the query decoded and unescaped chars when sitemap is true', function() {
      expect(decodeURIString('http://example.com/p.html?qu%2Ary=value')).to.be.a('string').and.to.equals('http://example.com/p.html?qu*ry=value');
      expect(decodeURIString('http://example.com/p.html?qu%2Ary=value&amp;b=9', { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/p.html?qu*ry=value&b=9');
    });

    it('should return the expected uri decoded string with the fragment decoded and unescaped chars when sitemap is true', function() {
      expect(decodeURIString('http://example.com/p.html?query=value#an%2Achor')).to.be.a('string').and.to.equals('http://example.com/p.html?query=value#an*chor');
      expect(decodeURIString('http://example.com/p.html?query=value#an%2Achor&amp;', { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/p.html?query=value#an*chor&');
    });

    it('should return the expected uri decoded string', function() {
      expect(decodeURIString('foo://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th')).to.be.a('string').and.to.equals('foo://user:pâss@exèmple.com:8080/pâth');
      expect(decodeURIString('foo://user:pa$$@example.com/')).to.be.a('string').and.to.equals('foo://user:pa$$@example.com/');
      expect(decodeURIString('foo://us%C3%A8r:pass@example.com/')).to.be.a('string').and.to.equals('foo://usèr:pass@example.com/');
      expect(decodeURIString('foo://example.com/p%C3%A2th')).to.be.a('string').and.to.equals('foo://example.com/pâth');
      expect(decodeURIString('foo://example.com/p%C3%A2th?a=1&b=2#11')).to.be.a('string').and.to.equals('foo://example.com/pâth?a=1&b=2#11');
      expect(decodeURIString('foo://example.com/%C3%A2th?a=1&b=2')).to.be.a('string').and.to.equals('foo://example.com/âth?a=1&b=2');

      expect(decodeURIString('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th', { web: true })).to.be.a('string').and.to.equals('http://user:pâss@exèmple.com:8080/pâth');
      expect(decodeURIString('http://user:pa$$@example.com/', { web: true })).to.be.a('string').and.to.equals('http://user:pa$$@example.com/');
      expect(decodeURIString('http://us%C3%A8r:pass@example.com/', { web: true })).to.be.a('string').and.to.equals('http://usèr:pass@example.com/');
      expect(decodeURIString('http://example.com/p%C3%A2th', { web: true })).to.be.a('string').and.to.equals('http://example.com/pâth');
      expect(decodeURIString('https://example.com/p%C3%A2th?%C3%A2=5', { web: true })).to.be.a('string').and.to.equals('https://example.com/pâth?â=5');
      expect(decodeURIString('https://example.com/p%C3%A2th?%C3%A2=5#11', { web: true })).to.be.a('string').and.to.equals('https://example.com/pâth?â=5#11');

      expect(decodeURIString('http://example.com/there?a=5&amp;b=11', { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/there?a=5&b=11');
      expect(decodeURIString('http://example.com/there?a=5&amp;b=11#anc%20hor', { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/there?a=5&b=11#anc hor');
    });

    it('should throw an uri error if url is more than the maximal allowed length when web or sitemap is true only', function() {
      expect(() => decodeURIString(`http://example.com:8042/${'path'.repeat(maxLengthURL + 1)}?name=ferret#nose`, { sitemap: true })).to.throw(URIError).with.property('code', 'URI_MAX_LENGTH_URL');
      expect(() => decodeURIString(`http://example.com:8042/${'path'.repeat(maxLengthURL + 1)}?name=ferret#nose`, { web: true })).to.throw(URIError).with.property('code', 'URI_MAX_LENGTH_URL');
      expect(() => decodeURIString(`http://example.com:8042/${'path'.repeat(maxLengthURL + 1)}?name=ferret#nose`, { sitemap: true, web: true })).to.throw(URIError).with.property('code', 'URI_MAX_LENGTH_URL');
      expect(() => decodeURIString(`http://example.com:8042/${'path'.repeat(maxLengthURL + 1)}?name=ferret#nose`)).to.not.throw();
    });
  });

  context('when using decodeWebURL that is an alias for decodeURIString with web option to true', function() {
    it('should throw an uri error when uri is not a string', function() {
      expect(() => decodeWebURL()).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeWebURL(undefined)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeWebURL(null)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeWebURL(NaN)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeWebURL([])).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeWebURL(new Error('error'))).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeWebURL(5)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeWebURL(true)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeWebURL(false)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeWebURL({})).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
    });

    it('should throw an uri error when url has no scheme', function() {
      // scheme cannot be an empty string following parseURI behavior
      expect(() => decodeWebURL('/Users/dir/file.js')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
      expect(() => decodeWebURL('://example.com')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
      expect(() => decodeWebURL(':')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
    });

    it('should throw an uri error when scheme has invalid chars', function() {
      expect(() => decodeWebURL('htép://example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => decodeWebURL('ht°p://example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
    });

    it('should throw an uri error if scheme is not http or https', function() {
      expect(() => decodeWebURL('httpp://www.example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => decodeWebURL('httpp://www.example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => decodeWebURL('httpp://www.example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => decodeWebURL('httpp://www.example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
    });

    it('should throw an uri error if host to decode is not valid', function() {
      expect(() => decodeWebURL('http://xn--iñvalid.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
    });

    it('should throw an uri error if port to decode is not valid', function() {
      expect(() => decodeWebURL('http://example.com:80g80')).to.throw(URIError).with.property('code', 'URI_INVALID_PORT');
    });

    it('should throw an uri error if authority is null', function() {
      expect(() => decodeWebURL('http:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => decodeWebURL('https:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
    });

    it('should throw an uri error if host to decode is not a valid IP or domain name', function() {
      expect(() => decodeWebURL('http://[123:4:5%%%].com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
      expect(() => decodeWebURL('http://100..100.100.100..com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
      expect(() => decodeWebURL('http://a.b.a.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
    });

    it('should throw an uri error if port to decode is not valid', function() {
      expect(() => decodeWebURL('http://example.com:80g80')).to.throw(URIError).with.property('code', 'URI_INVALID_PORT');
    });

    it('should ignore userinfo provided if unable to decode', function() {
      expect(decodeWebURL('http://user%pass@example.com:8080')).to.be.a('string').and.to.equals('http://example.com:8080/');
    });

    it('should ignore path provided if unable to decode', function() {
      expect(decodeWebURL('http://example.com:8080/over%there')).to.be.a('string').and.to.equals('http://example.com:8080/');
    });

    it('should ignore query provided if unable to decode', function() {
      expect(decodeWebURL('http://example.com:8080/over/there?query=val%ue')).to.be.a('string').and.to.equals('http://example.com:8080/over/there');
    });

    it('should ignore fragment provided if unable to decode', function() {
      expect(decodeWebURL('http://example.com:8080/over/there?query=value#anch%or')).to.be.a('string').and.to.equals('http://example.com:8080/over/there?query=value');
    });

    it('should ignore userinfo, path, query and fragment provided if unable to decode', function() {
      expect(decodeWebURL('http://user%pass@example.com:8080/over%there?query=val%ue#anch%or')).to.be.a('string').and.to.equals('http://example.com:8080/');
    });

    it('should not throw an uri error if uri to decode has letters in uppercase by default', function() {
      expect(() => decodeWebURL('http://example.com/OVER/there')).to.not.throw();
      expect(() => decodeWebURL('HTTP://example.com/OVER/there')).to.not.throw();
      expect(() => decodeWebURL('http://EXAMPLE.com/OVER/there')).to.not.throw();
      expect(() => decodeWebURL('http://USER:PASS@example.com/OVER/there')).to.not.throw();
      expect(() => decodeWebURL('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE')).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has letters in uppercase for scheme when lowercase is false', function() {
      expect(() => decodeWebURL('HTTP://example.com/OVER/there', { lowercase: false })).to.not.throw();
      expect(() => decodeWebURL('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { lowercase: false })).to.not.throw();
      expect(() => decodeWebURL('HTTP://user:pass@example.com', { lowercase: false })).to.not.throw();
    });

    it('should not throw an uri error if uri to decode has invalid characters that should be percent encoded', function() {
      expect(() => decodeWebURL('http://user:pass@example.com/path{')).to.not.throw();
      expect(() => decodeWebURL('http://user:pass@example.com/path{')).to.not.throw();
      expect(() => decodeWebURL('http://example.com/over/t}ere')).to.not.throw();
      expect(() => decodeWebURL('http://example.com/over|there')).to.not.throw();
      expect(() => decodeWebURL('http://example.com/over/there')).to.not.throw();
      expect(() => decodeWebURL('http://example.com/over/thère')).to.not.throw();
      expect(() => decodeWebURL('http://example.com/over/there€')).to.not.throw();
      expect(() => decodeWebURL('http://example.com/oveùr/there')).to.not.throw();
    });

    it('should return scheme and host in lowercase by default', function() {
      expect(decodeWebURL('HTTP://WWW.EXAMPLE.COM.')).to.be.a('string').and.to.equals('http://www.example.com./');
    });

    it('should return an url with uppercase letters if lowercase is false except host and scheme automatically put in lowercase to be RFC-3986 compliant', function() {
      expect(decodeWebURL('http://WWW.EXAmPLE.COM.', { lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com./');
      expect(decodeWebURL('https://WWW.EXaMPLE.COM.', { lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com./');
      expect(decodeWebURL('http://WWW.EXAMPLE.COM./Over/There', { lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com./Over/There');
      expect(decodeWebURL('HTTP://WWW.EXAmPLE.COM./Over/There?a=B#Anchor', { lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com./Over/There?a=B#Anchor');
    });

    it('should return a string with the exact same characters if allowed', function() {
      expect(decodeWebURL(`http://example.com/${az}`)).to.be.a('string').and.to.equals(`http://example.com/${az}`);
      expect(decodeWebURL(`http://example.com/${AZ}`)).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(decodeWebURL(`http://example.com/${digits}`)).to.be.a('string').and.to.equals(`http://example.com/${digits}`);
      expect(decodeWebURL(`http://example.com/${allowed.replace('%', '')}`)).to.be.a('string').and.to.equals(`http://example.com/${allowed.replace('%', '')}`);
    });

    it('should return a string with percent decoded characters', function() {
      expect(decodeWebURL(`http://example.com/${AZ}`)).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(decodeWebURL('http://example.com/%5C%5E%60%7B%7C%7D%3C%3E')).to.be.a('string').and.to.equals(`http://example.com/${disallowed}`);
      expect(decodeWebURL('http://example.com/%3C%3E')).to.be.a('string').and.to.equals('http://example.com/<>');
      expect(decodeWebURL('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3')).to.be.a('string').and.to.equals(`http://example.com/${disallowedOtherChars}`);
    });

    it('should return the expected url decoded string with the punydecoded host', function() {
      expect(decodeWebURL('http://exèmple.com:8080')).to.be.a('string').and.to.equals('http://exèmple.com:8080/');
      expect(decodeWebURL('http://xn--exmple-4ua.com:8080', { web: true })).to.be.a('string').and.to.equals('http://exèmple.com:8080/');
      expect(decodeWebURL('http://xn--exmple-4ua.com/p%C3%A2th', { web: true })).to.be.a('string').and.to.equals('http://exèmple.com/pâth');
      expect(decodeWebURL('http://xn--fiq228c.com.', { web: true })).to.be.a('string').and.to.equals('http://中文.com./');
    });

    it('should return the expected url decoded string with the userinfo decoded', function() {
      expect(decodeWebURL('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th')).to.be.a('string').and.to.equals('http://user:pâss@exèmple.com:8080/pâth');
      expect(decodeWebURL('http://us%C3%A8r:pass@example.com/')).to.be.a('string').and.to.equals('http://usèr:pass@example.com/');
    });

    it('should return the expected url decoded string with the path decoded', function() {
      expect(decodeWebURL('http://example.com/p%2A.html')).to.be.a('string').and.to.equals('http://example.com/p*.html');
    });

    it('should return the expected url decoded string with the query decoded', function() {
      expect(decodeWebURL('http://example.com/p.html?qu%2Ary=value')).to.be.a('string').and.to.equals('http://example.com/p.html?qu*ry=value');
    });

    it('should return the expected url decoded string with the fragment decoded', function() {
      expect(decodeWebURL('http://example.com/p.html?query=value#an%2Achor')).to.be.a('string').and.to.equals('http://example.com/p.html?query=value#an*chor');
    });

    it('should return the expected uri decoded string', function() {
      expect(decodeWebURL('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th')).to.be.a('string').and.to.equals('http://user:pâss@exèmple.com:8080/pâth');
      expect(decodeWebURL('http://user:pa$$@example.com/')).to.be.a('string').and.to.equals('http://user:pa$$@example.com/');
      expect(decodeWebURL('http://us%C3%A8r:pass@example.com/')).to.be.a('string').and.to.equals('http://usèr:pass@example.com/');
      expect(decodeWebURL('http://example.com/p%C3%A2th')).to.be.a('string').and.to.equals('http://example.com/pâth');
      expect(decodeWebURL('https://example.com/p%C3%A2th?%C3%A2=5')).to.be.a('string').and.to.equals('https://example.com/pâth?â=5');
      expect(decodeWebURL('https://example.com/p%C3%A2th?%C3%A2=5#11')).to.be.a('string').and.to.equals('https://example.com/pâth?â=5#11');
    });

    it('should throw an uri error if url is more than the maximal allowed length', function() {
      expect(() => decodeWebURL(`http://example.com:8042/${'path'.repeat(maxLengthURL + 1)}?name=ferret#nose`)).to.throw(URIError).with.property('code', 'URI_MAX_LENGTH_URL');
    });
  });

  context('when using decodeSitemapURL that is an alias for decodeURIString with sitemap option to true', function() {
    it('should throw an uri error when uri is not a string', function() {
      expect(() => decodeSitemapURL()).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeSitemapURL(undefined)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeSitemapURL(null)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeSitemapURL(NaN)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeSitemapURL([])).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeSitemapURL(new Error('error'))).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeSitemapURL(5)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeSitemapURL(true)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeSitemapURL(false)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => decodeSitemapURL({})).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
    });

    it('should throw an uri error when url has no scheme', function() {
      // scheme cannot be an empty string following parseURI behavior
      expect(() => decodeSitemapURL('/Users/dir/file.js')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
      expect(() => decodeSitemapURL('://example.com')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
      expect(() => decodeSitemapURL(':')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
    });

    it('should throw an uri error when scheme has invalid chars', function() {
      expect(() => decodeSitemapURL('htép://example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => decodeSitemapURL('ht°p://example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
    });

    it('should throw an uri error if scheme is not http or https', function() {
      expect(() => decodeSitemapURL('httpp://www.example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
    });

    it('should throw an uri error if host to decode is not valid', function() {
      expect(() => decodeSitemapURL('http://xn--iñvalid.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
    });

    it('should throw an uri error if port to decode is not valid', function() {
      expect(() => decodeSitemapURL('http://example.com:80g80')).to.throw(URIError).with.property('code', 'URI_INVALID_PORT');
    });

    it('should throw an uri error if authority is null', function() {
      expect(() => decodeSitemapURL('http:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
    });

    it('should throw an uri error if host to decode is not a valid IP or domain name', function() {
      expect(() => decodeSitemapURL('http://[123:4:5%%%].com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
      expect(() => decodeSitemapURL('http://100..100.100.100..com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
      expect(() => decodeSitemapURL('http://a.b.a.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
    });

    it('should throw an uri error if port to decode is not valid', function() {
      expect(() => decodeSitemapURL('http://example.com:80g80')).to.throw(URIError).with.property('code', 'URI_INVALID_PORT');
    });

    it('should ignore userinfo provided if unable to decode', function() {
      expect(decodeSitemapURL('http://user%pass@example.com:8080')).to.be.a('string').and.to.equals('http://example.com:8080/');
    });

    it('should ignore path provided if unable to decode', function() {
      expect(decodeSitemapURL('http://example.com:8080/over%there')).to.be.a('string').and.to.equals('http://example.com:8080/');
    });

    it('should ignore query provided if unable to decode', function() {
      expect(decodeSitemapURL('http://example.com:8080/over/there?query=val%ue')).to.be.a('string').and.to.equals('http://example.com:8080/over/there');
    });

    it('should ignore fragment provided if unable to decode', function() {
      expect(decodeSitemapURL('http://example.com:8080/over/there?query=value#anch%or')).to.be.a('string').and.to.equals('http://example.com:8080/over/there?query=value');
    });

    it('should ignore userinfo, path, query and fragment provided if unable to decode', function() {
      expect(decodeSitemapURL('http://user%pass@example.com:8080/over%there?query=val%ue#anch%or')).to.be.a('string').and.to.equals('http://example.com:8080/');
    });

    it('should not throw an uri error if url to decode has letters in uppercase by default', function() {
      expect(() => decodeSitemapURL('http://example.com/OVER/there')).to.not.throw();
      expect(() => decodeSitemapURL('HTTP://example.com/OVER/there')).to.not.throw();
      expect(() => decodeSitemapURL('http://EXAMPLE.com/OVER/there')).to.not.throw();
      expect(() => decodeSitemapURL('http://USER:PASS@example.com/OVER/there')).to.not.throw();
      expect(() => decodeSitemapURL('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE')).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has letters in uppercase for scheme when lowercase is false', function() {
      expect(() => decodeSitemapURL('HTTP://example.com/OVER/there', { lowercase: false })).to.not.throw();
      expect(() => decodeSitemapURL('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { lowercase: false })).to.not.throw();
      expect(() => decodeSitemapURL('HTTP://user:pass@example.com', { lowercase: false })).to.not.throw();
    });

    it('should not throw an uri error if url to decode has invalid characters that should be percent encoded', function() {
      expect(() => decodeSitemapURL('http://user:pass@example.com/path{')).to.not.throw();
      expect(() => decodeSitemapURL('http://user:pass@example.com/path{')).to.not.throw();
      expect(() => decodeSitemapURL('http://example.com/over/t}ere')).to.not.throw();
      expect(() => decodeSitemapURL('http://example.com/over|there')).to.not.throw();
      expect(() => decodeSitemapURL('http://example.com/over/there')).to.not.throw();
      expect(() => decodeSitemapURL('http://example.com/over/thère')).to.not.throw();
      expect(() => decodeSitemapURL('http://example.com/over/there€')).to.not.throw();
      expect(() => decodeSitemapURL('http://example.com/oveùr/there')).to.not.throw();
    });

    it('should return scheme and host in lowercase by default', function() {
      expect(decodeSitemapURL('HTTP://WWW.EXAMPLE.COM.')).to.be.a('string').and.to.equals('http://www.example.com./');
    });

    it('should return an url with uppercase letters if lowercase is false except host and scheme automatically put in lowercase to be RFC-3986 compliant', function() {
      expect(decodeSitemapURL('http://WWW.EXAmPLE.COM.', { lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com./');
      expect(decodeSitemapURL('HTTPS://WWW.EXaMPLE.COM.', { lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com./');
      expect(decodeSitemapURL('http://WWW.EXAmPLE.COM./Over/There?a=B#Anchor', { lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com./Over/There?a=B#Anchor');
      expect(decodeSitemapURL('https://WWW.EXaMPLE.COM./Over/There?a=B&amp;b=c#Anchor', { lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com./Over/There?a=B&b=c#Anchor');
    });

    it('should return a string with the exact same characters if allowed', function() {
      expect(decodeSitemapURL(`http://example.com/${az}`)).to.be.a('string').and.to.equals(`http://example.com/${az}`);
      expect(decodeSitemapURL(`http://example.com/${AZ}`)).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(decodeSitemapURL(`http://example.com/${digits}`)).to.be.a('string').and.to.equals(`http://example.com/${digits}`);
      expect(decodeSitemapURL(`http://example.com/${allowed.replace('%', '')}`)).to.be.a('string').and.to.equals(`http://example.com/${allowed.replace('%', '')}`);
    });

    it('should return a string with the exact same characters if allowed and to not be escaped', function() {
      expect(decodeSitemapURL(`http://example.com/${az}`)).to.be.a('string').and.to.equals(`http://example.com/${az}`);
      expect(decodeSitemapURL(`http://example.com/${digits}`)).to.be.a('string').and.to.equals(`http://example.com/${digits}`);
      expect(decodeSitemapURL(`http://example.com/*\'&`)).to.be.a('string').and.to.equals(`http://example.com/*\'&`);
    });

    it('should return a string with percent decoded characters', function() {
      expect(decodeSitemapURL('http://example.com/%5C%5E%60%7B%7C%7D%3C%3E')).to.be.a('string').and.to.equals(`http://example.com/${disallowed}`);
      expect(decodeSitemapURL('http://example.com/%3C%3E')).to.be.a('string').and.to.equals('http://example.com/<>');
      expect(decodeSitemapURL('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3')).to.be.a('string').and.to.equals(`http://example.com/${disallowedOtherChars}`);
    });

    it('should return a string with percent decoded characters if not allowed', function() {
      expect(decodeSitemapURL('http://example.com/%5C%5E%60%7B%7C%7D%3C%3E')).to.be.a('string').and.to.equals(`http://example.com/${disallowed}`);
      expect(decodeSitemapURL('http://example.com/&amp;&apos;%2A')).to.be.a('string').and.to.equals('http://example.com/&\'*');
      expect(decodeSitemapURL('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3')).to.be.a('string').and.to.equals(`http://example.com/${disallowedOtherChars}`);
    });

    it('should return a string with unescaped characters', function() {
      expect(decodeSitemapURL('http://example.com/&amp;&apos;%2A')).to.be.a('string').and.to.equals('http://example.com/&\'*');
    });

    it('should return the expected url decoded string with the punydecoded host', function() {
      expect(decodeSitemapURL('http://exèmple.com:8080')).to.be.a('string').and.to.equals('http://exèmple.com:8080/');
      expect(decodeSitemapURL('http://xn--exmple-4ua.com:8080')).to.be.a('string').and.to.equals('http://exèmple.com:8080/');
      expect(decodeSitemapURL('http://xn--exmple-4ua.com/p%C3%A2th')).to.be.a('string').and.to.equals('http://exèmple.com/pâth');
      expect(decodeSitemapURL('http://xn--fiq228c.com.')).to.be.a('string').and.to.equals('http://中文.com./');
    });

    it('should return the expected url decoded string with the userinfo decoded', function() {
      expect(decodeSitemapURL('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th')).to.be.a('string').and.to.equals('http://user:pâss@exèmple.com:8080/pâth');
      expect(decodeSitemapURL('http://us%C3%A8r:&amp;&apos;%2Apass@example.com/')).to.be.a('string').and.to.equals('http://usèr:&\'*pass@example.com/');
    });

    it('should return the expected url decoded string with the path decoded', function() {
      expect(decodeSitemapURL('http://example.com/p&amp;&apos;%2A.html')).to.be.a('string').and.to.equals('http://example.com/p&\'*.html');
    });

    it('should return the expected url decoded string with the query decoded', function() {
      expect(decodeSitemapURL('http://example.com/p.html?qu&amp;&apos;%2Ary=value')).to.be.a('string').and.to.equals('http://example.com/p.html?qu&\'*ry=value');
    });

    it('should return the expected url decoded string with the fragment decoded', function() {
      expect(decodeSitemapURL('http://example.com/p.html?query=value#an&amp;&apos;%2Achor')).to.be.a('string').and.to.equals('http://example.com/p.html?query=value#an&\'*chor');
    });

    it('should return the expected uri decoded string', function() {
      expect(decodeSitemapURL('http://example.com/there?a=5&amp;b=11')).to.be.a('string').and.to.equals('http://example.com/there?a=5&b=11');
      expect(decodeSitemapURL('http://example.com/there?a=5&amp;b=11#anc%20hor')).to.be.a('string').and.to.equals('http://example.com/there?a=5&b=11#anc hor');
    });

    it('should throw an uri error if url is more than the maximal allowed length', function() {
      expect(() => decodeSitemapURL(`http://example.com:8042/${'path'.repeat(maxLengthURL + 1)}?name=ferret#nose`)).to.throw(URIError).with.property('code', 'URI_MAX_LENGTH_URL');
    });
  });
});
