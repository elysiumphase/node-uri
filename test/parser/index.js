const { expect } = require('../Common');
const {
  hostToURI,
  parseURI,
  recomposeURI,
} = require('../../src/parser');
const { minPortInteger, maxPortInteger } = require('../../src/config');

describe('#parser', function() {
  context('when using hostToURI', function() {
    it('should return the empty string if not a string', function() {
      expect(hostToURI()).to.be.a('string').and.to.equals('');
      expect(hostToURI(5)).to.be.a('string').and.to.equals('');
      expect(hostToURI(true)).to.be.a('string').and.to.equals('');
      expect(hostToURI(new Error('error'))).to.be.a('string').and.to.equals('');
      expect(hostToURI({})).to.be.a('string').and.to.equals('');
      expect(hostToURI([])).to.be.a('string').and.to.equals('');
      expect(hostToURI(null)).to.be.a('string').and.to.equals('');
      expect(hostToURI(undefined)).to.be.a('string').and.to.equals('');
      expect(hostToURI(NaN)).to.be.a('string').and.to.equals('');
    });

    it('should return the exact same string if not a IPv6', function() {
      expect(hostToURI('')).to.be.a('string').and.to.equals('');
      expect(hostToURI('192.0.2.235')).to.be.a('string').and.to.equals('192.0.2.235');
      expect(hostToURI('test')).to.be.a('string').and.to.equals('test');
      expect(hostToURI('1000.2.3.4')).to.be.a('string').and.to.equals('1000.2.3.4');
      expect(hostToURI('02001:0000:1234:0000:0000:C1C0:ABCD:0876')).to.be.a('string').and.to.equals('02001:0000:1234:0000:0000:C1C0:ABCD:0876');
    });

    it('should return a string surrounder by brackets if IPv6', function() {
      expect(hostToURI('FF01:0:0:0:0:0:0:101')).to.be.a('string').and.to.equals('[FF01:0:0:0:0:0:0:101]');
      expect(hostToURI('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).to.be.a('string').and.to.equals('[2001:0db8:85a3:0000:0000:8a2e:0370:7334]');
      expect(hostToURI('2::10')).to.be.a('string').and.to.equals('[2::10]');
    });
  });

  context('when using parseURI', function() {
    const parsed = {
      scheme: null,
      authority: null,
      authorityPunydecoded: null,
      userinfo: null,
      host: null,
      hostPunydecoded: null,
      port: null,
      path: null,
      pathqf: null,
      query: null,
      fragment: null,
      href: null,
    };

    it('should return an object with null attributes if no uri is provided', function() {
      expect(parseURI()).to.be.an('object').and.to.eql(parsed);
      expect(parseURI(null)).to.be.an('object').and.to.eql(parsed);
      expect(parseURI(undefined)).to.be.an('object').and.to.eql(parsed);
      expect(parseURI(NaN)).to.be.an('object').and.to.eql(parsed);
      expect(parseURI('')).to.be.an('object').and.to.eql(parsed);
    });

    it('should return an object with null attributes if uri is not a string', function() {
      expect(parseURI({})).to.be.an('object').and.to.eql(parsed);
      expect(parseURI([])).to.be.an('object').and.to.eql(parsed);
      expect(parseURI(new Error('error'))).to.be.an('object').and.to.eql(parsed);
      expect(parseURI(255)).to.be.an('object').and.to.eql(parsed);
      expect(parseURI(true)).to.be.an('object').and.to.eql(parsed);
    });

    it('should return an object with all attributes at null if uri has no scheme', function() {
      let parsedURI = parseURI('http');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', null);

      parsedURI = parseURI('httpwwwexample5com');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', null);

      parsedURI = parseURI('example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', null);

      parsedURI = parseURI('example.com/index.html');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', null);

      parsedURI = parseURI('/example.com/index.html');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', null);
    });

    it('should return an object with missing attributes at null if uri is not valid', function() {
      let parsedURI = parseURI('http:///path');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '/path');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '/path');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http:/path');

      parsedURI = parseURI('http::path');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', ':path');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', ':path');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http::path');

      parsedURI = parseURI('http:\\path');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '\\path');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '\\path');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http:\\path');

      parsedURI = parseURI('http://');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http:');
    });

    it('should return an object with appropriate attributes if uri is valid', function() {
      let parsedURI = parseURI('foo://example.com:8042/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'foo');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'example.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'example.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', 8042);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '/over/there');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', 'name=ferret');
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', 'nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'foo://example.com:8042/over/there?name=ferret#nose');

      parsedURI = parseURI('foo://user:pass@example.com:8042/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'foo');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'user:pass@example.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', 8042);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '/over/there');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', 'name=ferret');
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', 'nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'foo://user:pass@example.com:8042/over/there?name=ferret#nose');

      parsedURI = parseURI('foo://example.com/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'foo');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '/over/there');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', 'name=ferret');
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', 'nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'foo://example.com/over/there?name=ferret#nose');
    });

    it('should return an object with the original port value if port is not an integer', function() {
      let parsedURI = parseURI('foo://example.com:80g42/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'foo');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'example.com:80g42');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'example.com:80g42');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', '80g42');
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '/over/there');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', 'name=ferret');
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', 'nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'foo://example.com/over/there?name=ferret#nose');
    });

    it('should return an object with the scheme an hosts in lowercase', function() {
      let parsedURI = parseURI('FOO://example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'foo');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'foo://example.com/');

      parsedURI = parseURI('foo://中文.COM:8042/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'foo');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', 8042);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '/over/there');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', 'name=ferret');
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', 'nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'foo://xn--fiq228c.com:8042/over/there?name=ferret#nose');

      parsedURI = parseURI('fOo://WwW.中文.COM:8042/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'foo');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'www.xn--fiq228c.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'www.中文.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'www.xn--fiq228c.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'www.中文.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', 8042);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '/over/there');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', 'name=ferret');
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', 'nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'foo://www.xn--fiq228c.com:8042/over/there?name=ferret#nose');
    });

    it('should return an object with the authority and host attributes with the Punycode ASCII serialization value + authorityPunydecoded and hostPunydecoded with the original Unicode serialization value in lowercase', function() {
      let parsedURI = parseURI('foo://中文.com:8042/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'foo');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', 8042);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '/over/there');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', 'name=ferret');
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', 'nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'foo://xn--fiq228c.com:8042/over/there?name=ferret#nose');

      parsedURI = parseURI('foo://xn--fiq228c.com:8042/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'foo');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', 8042);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '/over/there');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', 'name=ferret');
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', 'nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'foo://xn--fiq228c.com:8042/over/there?name=ferret#nose');

      parseURI('foo://中文.COM:8042/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'foo');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'xn--fiq228c.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', '中文.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'xn--fiq228c.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', '中文.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', 8042);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '/over/there');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', 'name=ferret');
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', 'nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'foo://xn--fiq228c.com:8042/over/there?name=ferret#nose');

      parsedURI = parseURI('foo://WWW.xn--fiq228c.COM:8042/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'foo');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'www.xn--fiq228c.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'www.中文.com:8042');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'www.xn--fiq228c.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'www.中文.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', 8042);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '/over/there');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '/over/there?name=ferret#nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', 'name=ferret');
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', 'nose');
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'foo://www.xn--fiq228c.com:8042/over/there?name=ferret#nose');
    });

    it('should return an object with authority and its components at null except original authority components if uri has an invalid host', function() {
      let parsedURI = parseURI('http://user:pass@xn--iñvalid.com:8080');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@xn--iñvalid.com:8080');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'xn--iñvalid.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http:');

      parsedURI = parseURI('http://user:pass@xn--iñvalid.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@xn--iñvalid.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'xn--iñvalid.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http:');

      parsedURI = parseURI('http://xn--iñvalid.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'xn--iñvalid.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'xn--iñvalid.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http:');

      parsedURI = parseURI('http://user:pass@example.co.jp\\');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'user:pass@example.co.jp');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.co.jp\\');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'example.co.jp');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.co.jp\\');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http://user:pass@example.co.jp/');

      parsedURI = parseURI('http://user:pass@xn--iñvalid.com:8080/path?query=test#fragment');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@xn--iñvalid.com:8080');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'xn--iñvalid.com');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '/path');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '/path?query=test#fragment');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', 'query=test');
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', 'fragment');
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http:/path?query=test#fragment');
    });

    it('should parse IPv4 hosts', function() {
      let parsedURI = parseURI('http://223.255.255.255');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', '223.255.255.255');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', '223.255.255.255');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', '223.255.255.255');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', '223.255.255.255');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http://223.255.255.255/');

      parsedURI = parseURI('http://user:pass@223.255.255.255');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'user:pass@223.255.255.255');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@223.255.255.255');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
      expect(parsedURI).to.be.an('object').and.to.have.property('host', '223.255.255.255');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', '223.255.255.255');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http://user:pass@223.255.255.255/');

      parsedURI = parseURI('http://user:pass@223.255.255.255:8080');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'user:pass@223.255.255.255:8080');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@223.255.255.255:8080');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
      expect(parsedURI).to.be.an('object').and.to.have.property('host', '223.255.255.255');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', '223.255.255.255');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', 8080);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http://user:pass@223.255.255.255:8080/');
    });

    it('should parse IPv6 hosts', function() {
      let parsedURI = parseURI('http://[fe80::7:8%eth0]');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', '[fe80::7:8%eth0]');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', '[fe80::7:8%eth0]');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'fe80::7:8%eth0');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'fe80::7:8%eth0');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http://[fe80::7:8%eth0]/');

      parsedURI = parseURI('http://user:pass@[fe80::7:8%eth0]');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'user:pass@[fe80::7:8%eth0]');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@[fe80::7:8%eth0]');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'fe80::7:8%eth0');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'fe80::7:8%eth0');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http://user:pass@[fe80::7:8%eth0]/');

      parsedURI = parseURI('http://user:pass@[fe80::7:8%eth0]:8080');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', 'user:pass@[fe80::7:8%eth0]:8080');
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@[fe80::7:8%eth0]:8080');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', 'user:pass');
      expect(parsedURI).to.be.an('object').and.to.have.property('host', 'fe80::7:8%eth0');
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'fe80::7:8%eth0');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', 8080);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('href', 'http://user:pass@[fe80::7:8%eth0]:8080/');
    });
  });

  context('when using recomposeURI', function() {
    it('should return an empty string if no uri is provided', function() {
      expect(recomposeURI()).to.be.an('string').and.to.equals('');
      expect(recomposeURI(null)).to.be.an('string').and.to.equals('');
      expect(recomposeURI(undefined)).to.be.an('string').and.to.equals('');
      expect(recomposeURI(NaN)).to.be.an('string').and.to.equals('');
      expect(recomposeURI('')).to.be.an('string').and.to.equals('');
    });

    it('should return an empty string if uri has no components', function() {
      expect(recomposeURI({})).to.be.an('string').and.to.equals('');
      expect(recomposeURI([])).to.be.an('string').and.to.equals('');
      expect(recomposeURI(new Error('error'))).to.be.an('string').and.to.equals('');
      expect(recomposeURI(255)).to.be.an('string').and.to.equals('');
      expect(recomposeURI(true)).to.be.an('string').and.to.equals('');
    });

    it('should return an empty string if uri has no scheme or path', function() {
      const toRecompose = {
        scheme: null,
        userinfo: 'user:pass',
        host: 'example.com',
        port: 8080,
        path: null,
        query: 'a=b',
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('');

      toRecompose.scheme = 'foo';
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('');

      toRecompose.scheme = null;
      toRecompose.path = '';
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('');
    });

    it('should return the recomposed uri if uri has a scheme and a path', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: null,
        port: null,
        path: '',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo:');
    });

    it('should return an empty string if uri scheme is not at least one character', function() {
      const toRecompose = {
        scheme: '',
        userinfo: 'user:pass',
        host: 'example.com',
        port: 8080,
        path: '',
        query: 'a=b',
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('');
    });

    it('should return the recomposed uri if uri scheme is at least one character', function() {
      const toRecompose = {
        scheme: 'f',
        userinfo: null,
        host: null,
        port: null,
        path: '',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('f:');
    });

    it('should return an empty string if uri host is present and path is not empty or does not start with /', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: 'user:pass',
        host: 'example.com',
        port: 8080,
        path: 'path',
        query: 'a=b',
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('');
    });

    it('should return the recomposed uri if uri host is present and path is empty or start with /', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'bar.com',
        port: null,
        path: '',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://bar.com/');

      toRecompose.path = '/';
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://bar.com/');

      toRecompose.path = '/baz';
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://bar.com/baz');
    });

    it('should return an empty string if uri host is not present and path starts with //', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: null,
        port: null,
        path: '//bar',
        query: 'a=b',
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('');
    });

    it('should return the recomposed uri if uri host is not present and path does not start with //', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: null,
        port: null,
        path: 'bar',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo:bar');
    });

    it('should return an empty string if uri host is not at least 3 characters', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'ba',
        port: null,
        path: '',
        query: 'a=b',
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('');
    });

    it('should return the recomposed uri if uri host is at least 3 characters', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'b.r',
        port: null,
        path: '',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://b.r/');
    });

    it('should add / if path is null or empty but host is not empty', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'example.com',
        port: null,
        path: '',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/');
    });

    it('should not add / if path is not null or empty but host is empty', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: null,
        port: null,
        path: 'bar',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo:bar');
    });

    it('should ignore port if not a number', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'example.com',
        port: '80g80',
        path: '',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/');

      toRecompose.port = NaN;
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/');
    });

    it('should ignore port if out of range', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'example.com',
        port: minPortInteger - 1,
        path: '',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/');

      toRecompose.port = maxPortInteger + 1;
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/');
    });

    it('should parse port', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'example.com',
        port: '8080',
        path: '',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com:8080/');
    });

    it('should not ignore port if in range', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'example.com',
        port: minPortInteger,
        path: '',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals(`foo://example.com:${minPortInteger}/`);

      toRecompose.port = maxPortInteger;
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals(`foo://example.com:${maxPortInteger}/`);
    });

    it('should ignore userinfo if not at least 1 character', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: '',
        host: 'example.com',
        port: null,
        path: '',
        query: 'a=b',
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/?a=b#anchor');

      toRecompose.userinfo = null;
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/?a=b#anchor');
    });

    it('should not ignore userinfo if at least 1 character', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: 'u',
        host: 'example.com',
        port: null,
        path: '',
        query: 'a=b',
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://u@example.com/?a=b#anchor');
    });

    it('should ignore query if not at least 1 character', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'example.com',
        port: null,
        path: '',
        query: '',
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/#anchor');

      toRecompose.query = null;
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/#anchor');
    });

    it('should not ignore query if at least 1 character', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'example.com',
        port: null,
        path: '',
        query: 'a=b',
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/?a=b#anchor');
    });

    it('should ignore fragment if not at least 1 character', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'example.com',
        port: null,
        path: '',
        query: null,
        fragment: '',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/');

      toRecompose.fragment = null;
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/');
    });

    it('should not ignore fragment if at least 1 character', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'example.com',
        port: null,
        path: '',
        query: null,
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://example.com/#anchor');
    });

    it('should support IPv4 host', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: '23.71.254.72',
        port: null,
        path: '',
        query: null,
        fragment: '',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://23.71.254.72/');
    });

    it('should support IPv6 host', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: '::ffff:192.168.1.26',
        port: null,
        path: '',
        query: null,
        fragment: '',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://[::ffff:192.168.1.26]/');
    });

    it('should return the recomposed uri', function() {
      let toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: null,
        port: null,
        path: '',
        query: null,
        fragment: null,
      };
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo:');

      toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: null,
        port: null,
        path: 'bar:baz',
        query: 'a=b',
        fragment: 'anchor',
      };
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo:bar:baz?a=b#anchor');

      toRecompose = {
        scheme: 'foo',
        userinfo: 'user:pass',
        host: 'bar.com',
        port: 8080,
        path: '/over/there',
        query: 'a=b',
        fragment: 'anchor',
      };
      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://user:pass@bar.com:8080/over/there?a=b#anchor');
    });
  });
});
