const { expect } = require('../Common');
const {
  encodeURIString,
  encodeWebURL,
  encodeSitemapURL,
  decodeURIString,
  decodeWebURL,
  decodeSitemapURL,
} = require('../../lib');
const {
  uri,
  http,
  https,
  unicode,
  idn,
  sitemap,
} = require('../uris');

describe('#functional', function() {
  context('when using decodeURIString with encodeURIString', function() {
    it('should return the exact same string', function() {
      uri.forEach((string) => {
        expect(decodeURIString(encodeURIString(string))).to.be.a('string').and.to.equals(string);
      });

      http.forEach((string) => {
        expect(decodeURIString(encodeURIString(string))).to.be.a('string').and.to.equals(string);
      });

      https.forEach((string) => {
        expect(decodeURIString(encodeURIString(string))).to.be.a('string').and.to.equals(string);
      });

      idn.forEach((string) => {
        expect(decodeURIString(encodeURIString(string))).to.be.a('string').and.to.equals(string);
      });

      unicode.forEach((string) => {
        expect(decodeURIString(encodeURIString(string))).to.be.a('string').and.to.equals(string);
      });
    });
  });

  context('when using decodeWebURL with encodeWebURL', function() {
    it('should return the exact same string', function() {
      http.forEach((string) => {
        expect(decodeWebURL(encodeWebURL(string))).to.be.a('string').and.to.equals(string);
      });

      https.forEach((string) => {
        expect(decodeWebURL(encodeWebURL(string))).to.be.a('string').and.to.equals(string);
      });

      idn.forEach((string) => {
        expect(decodeWebURL(encodeWebURL(string))).to.be.a('string').and.to.equals(string);
      });

      unicode.forEach((string) => {
        expect(decodeWebURL(encodeWebURL(string))).to.be.a('string').and.to.equals(string);
      });
    });
  });

  context('when using decodeSitemapURL with encodeSitemapURL', function() {
    it('should return the exact same string', function() {
      sitemap.forEach((string) => {
        expect(decodeSitemapURL(encodeSitemapURL(string))).to.be.a('string').and.to.equals(string);
      });
    });
  });
});
