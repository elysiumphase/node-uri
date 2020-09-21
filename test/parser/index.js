const { expect } = require('../Common');
const {
  parseURI,
  recomposeURI,
} = require('../../lib/parser');

describe('#parser', function() {
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

      parsedURI = parseURI('http://user:pass@example.co.jp\\');
      expect(parsedURI).to.be.an('object').and.to.have.property('scheme', 'http');
      expect(parsedURI).to.be.an('object').and.to.have.property('authority', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('authorityPunydecoded', 'user:pass@example.co.jp\\');
      expect(parsedURI).to.be.an('object').and.to.have.property('userinfo', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('host', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('hostPunydecoded', 'example.co.jp\\');
      expect(parsedURI).to.be.an('object').and.to.have.property('port', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('path', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('pathqf', '');
      expect(parsedURI).to.be.an('object').and.to.have.property('query', null);
      expect(parsedURI).to.be.an('object').and.to.have.property('fragment', null);

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

    it('should return an empty string if uri host is present and path is not empty or start with /', function() {
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

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://bar.com');

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

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://b.r');
    });

    it('should return an empty string if uri userinfo is not at least 1 character', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: '',
        host: 'example.com',
        port: null,
        path: '',
        query: 'a=b',
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('');
    });

    it('should return the recomposed uri if uri userinfo is at least 1 character', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: 'u',
        host: 'bar.com',
        port: null,
        path: '',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://u@bar.com');
    });

    it('should return an empty string if uri port is not an integer', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'example.com',
        port: '80g80',
        path: '',
        query: 'a=b',
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('');
    });

    it('should return the recomposed uri if uri port is an integer', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'bar.com',
        port: 8080,
        path: '',
        query: null,
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://bar.com:8080');
    });

    it('should return an empty string if uri query is not at least 1 character', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'example.com',
        port: null,
        path: '',
        query: '',
        fragment: 'anchor',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('');
    });

    it('should return the recomposed uri if uri query is at least 1 character', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'bar.com',
        port: null,
        path: '',
        query: 'q',
        fragment: null,
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://bar.com?q');
    });

    it('should return an empty string if uri fragment is not at least 1 character', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'example.com',
        port: null,
        path: '',
        query: 'a=b',
        fragment: '',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('');
    });

    it('should return the recomposed uri if uri fragment is at least 1 character', function() {
      const toRecompose = {
        scheme: 'foo',
        userinfo: null,
        host: 'bar.com',
        port: null,
        path: '',
        query: null,
        fragment: 'a',
      };

      expect(recomposeURI(toRecompose)).to.be.an('string').and.to.equals('foo://bar.com#a');
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
