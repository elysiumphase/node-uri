<p align="center">
  <img src="docs/node-uri.png" alt="node-uri"/>
<p>

<p align="center">
  An <a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a> compliant and zero-dependencies Node.js module to parse URIs, punycode, punydecode, test URIs, URLs, Sitemap URLS, domains, IPs but also encode and decode URIs, URLs and Sitemap URLs.
<p>

# Table of Contents
- [Presentation](#presentation)
- [Installation](#installation)
- [Technical information](#technical-information)
  - [Node.js](#nodejs)
  - [Tests](#tests)
    - [Linting](#linting)
    - [Unit](#unit)
- [Usage](#usage)
  - [Import module](#import-module)
  - [punycode(domain)](#punycodedomain)
  - [punydecode(domain)](#punydecodedomain)
  - [parseURI(uri)](#parseuriuri)
  - [recomposeURI(options)](#recomposeurioptions)
  - [isDomainLabel(label)](#isdomainlabellabel)
  - [isDomain(name)](#isdomainname)
  - [isIP(ip)](#isipip)
  - [isIPv4(ip)](#isipv4ip)
  - [isIPv6(ip)](#isipv6ip)
  - [checkURI(uri)](#checkuriuri)
  - [checkHttpURL(uri)](#checkhttpurluri)
  - [checkHttpsURL(uri)](#checkhttpsurluri)
  - [checkHttpSitemapURL(uri)](#checkhttpsitemapurluri)
  - [checkHttpsSitemapURL(uri)](#checkhttpssitemapurluri)
  - [checkWebURL(uri)](#checkweburluri)
  - [checkSitemapURL(uri)](#checksitemapurluri)
  - [encodeURIComponentString(component, options)](#encodeuricomponentstringcomponent-options)
  - [encodeURIString(uri, options)](#encodeuristringuri-options)
  - [encodeWebURL(uri, options)](#encodeweburluri-options)
  - [encodeSitemapURL(uri, options)](#encodesitemapurluri-options)
  - [decodeURIComponentString(component, options)](#decodeuricomponentstringcomponent-options)
  - [decodeURIString(uri, options)](#decodeuristringuri-options)
  - [decodeWebURL(uri, options)](#decodeweburluri-options)
  - [decodeSitemapURL(uri, options)](#decodesitemapurluri-options)
  - [Errors](#errors)
    - [Object structure](#object-structure)
    - [Codes](#codes)
- [Code of Conduct](#code-of-conduct)
- [Contributing](#contributing)
- [Support](#support)
- [Security](#security)
- [Licence](#licence)

# Presentation

Few libraries exist in the Node.js sphere providing helpers to deal with URIs and to be fully **RFC-3986** compliant without any dependency.

Amongst being **RFC-3986** compliant and having no dependency, *node-uri* aims to support Sitemap URLs for SEO purposes, fix `url.parse` that automatically punycodes a host and cannot parse URIs other than URLs, fix `encodeURI` and `encodeURIComponent` native functions that relies on an old standard prior to **RFC-3986** and fix `decodeURI` that does not support IDNs and cannot properly work with `encodeURI` since the function is based on an outdated standard.

The main features of this project are:
- parse any URI (URNs, URLs, URIs with IDNs, etc.);
- get the Punycode ASCII or Unicode serialization of a domain;
- check an URI, HTTP/HTTPS/Sitemap URL, IP, domain is valid with clear checking errors;
- encode/decode an URI, HTTP/HTTPS/Sitemap URL.

**2462 assertions** ensure parsing, encoding, decoding, checking URIs, URLs, IPs, domains are working as expected. This does not make this library a 100% reliable source. So if you find any errors, please feel free to report, [contribute](#contributing) and help fixing any issues.

To make sure we properly understand the difference between an URI and an URL, these two are not exactly the same thing. An URI is an identifier of a specific resource. Like a page, a book, or a document. An URL is a special type of identifier that also tells you how to access it, such as HTTPs, FTP, etc. If the protocol (https, ftp, etc.) is either present or implied for a domain, you should call it an URL even though it’s also an URI.

# Installation

`npm install node-uri`

`npm i -S node-uri`

# Technical information

## Node.js

- Language: JavaScript ES6/ES7
- VM: Node.js >= Carbon (8.17.0)

## Tests

Node.js >= Dubnium (10.22.1) could be required for some testing modules.

Command to run all tests:

`npm test`

### Linting

ESLint with Airbnb base rules. See  __<a href="https://github.com/airbnb/javascript" target="_blank">Airbnb JavaScript Style Guide</a>__.

`npm run test:lint`

### Unit

Mocha and Chai.

`npm run test:unit`

# Usage

## Import module

```javascript
const uri = require('node-uri');

// uri is an object of functions
const {
  punycode,
  punydecode,
  parseURI,
  recomposeURI,
  isDomainLabel,
  isDomain,
  isIP,
  isIPv4,
  isIPv6,
  checkURI,
  checkHttpURL,
  checkHttpsURL,
  checkHttpSitemapURL,
  checkHttpsSitemapURL,
  checkWebURL,
  checkSitemapURL,
  encodeURIComponentString,
  encodeURIString,
  encodeWebURL,
  encodeSitemapURL,
  decodeURIComponentString,
  decodeURIString,
  decodeWebURL,
  decodeSitemapURL,
} = require('node-uri');
```

*node-uri* module exports an object of functions. You'll find the complete list of functions below.

- `uri` **<Object\>** with the following functions.

## punycode(domain)
Returns the Punycode ASCII serialization of the domain. If domain is an invalid domain, the empty string is returned.

Native function throws if no domain is provided or returns `null`, `undefined`, `nan` for `null`, `undefined` or `NaN` values which is totally not what to be expected.

Moreover native function does not support IPv6.

<br/>

  - `domain` **<String\>**
  - Returns: **<String\>**

<br/>

**Examples**:
```javascript
punycode(); // ''
punycode('a.b.c.d.e.fg'); // 'a.b.c.d.e.fg'
punycode('xn--iñvalid.com'); // ''
punycode('中文.com'); // 'xn--fiq228c.com'
punycode('xn--fiq228c.com'); // 'xn--fiq228c.com'
punycode('2001:db8:85a3:8d3:1319:8a2e:370:7348'); // '2001:db8:85a3:8d3:1319:8a2e:370:7348'
punycode('127.0.0.1'); // '127.0.0.1'
punycode(undefined|null|NaN); // ''
```

## punydecode(domain)
Returns the Unicode serialization of the domain. If domain is an invalid domain, the empty string is returned.

Native function throws if no domain is provided or returns `null`, `undefined`, `nan` for `null`, `undefined` or `NaN` values which is totally not what to be expected.

Moreover native function does not support IPv6.

<br/>

  - `domain` **<String\>**
  - Returns: **<String\>**

<br/>

**Examples**:
```javascript
punydecode(); // ''
punydecode('a.b.c.d.e.fg'); // 'a.b.c.d.e.fg'
punydecode('xn--iñvalid.com'); // ''
punydecode('xn--fiq228c.com'); // '中文.com'
punydecode('中文.com'); // '中文.com'
punydecode('2001:db8:85a3:8d3:1319:8a2e:370:7348'); // '2001:db8:85a3:8d3:1319:8a2e:370:7348'
punydecode('127.0.0.1'); // '127.0.0.1'
punydecode(undefined|null|NaN); // ''
```

## parseURI(uri)
Parse a string to get URI components.

**Support**:
- IPv4 and IPv6 hosts;
- Internationalized Domain Name (IDN).

**Note**:
- RegExp from __<a href="https://tools.ietf.org/html/rfc3986#appendix-B" target="_blank">RFC-3986</a>__;
- scheme and host strings will always be put in lowercase once parsed, as specified in **RFC-3986**;
- authority and its components will be put at null values if authority parsed is missing or empty;
- **prefer using [checkURI](#checkuriuri) to parse and fully check an URI**.

<br/>

**Generic syntax**:

![URI Syntax](docs/uri-syntax.png "URI Syntax")

<br/>

**Example URIs**:

![RFC-3986](docs/rfc-3986.png "RFC-3986")

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__.

<br/>

  - `uri` **<String\>**
  - Returns: **<Object\>**
    - `scheme` **<String\>** The URI scheme. *Default*: `null`
    - `authority` **<String\>** The URI authority with the Punycode ASCII serialization of the domain. *Default*: `null`
    - `authorityPunydecoded` **<String\>** The URI authority with the Unicode serialization of the domain. *Default*: `null`
    - `userinfo` **<String\>** The URI userinfo. *Default*: `null`
    - `host` **<String\>** The URI authority's host with the Punycode ASCII serialization of the domain. *Default*: `null`
    - `hostPunydecoded` **<String\>** The URI authority's host with the Unicode serialization of the domain. *Default*: `null`
    - `port` **<Number\>** || **<String\>** The URI authority's port. A string if not able to be parsed in an integer. *Default*: `null`
    - `path` **<String\>** The URI path. *Default*: `null`
    - `pathqf` **<String\>** The URI path, query and fragment. *Default*: `null`
    - `query` **<String\>** The URI query. *Default*: `null`
    - `fragment` **<String\>** The URI fragment. *Default*: `null`
    - `href` **<String\>** The URI recomposed. *Default*: `null`

<br/>

**Examples**:
```javascript
parseURI();
// {
//   scheme: null,
//   authority: null,
//   authorityPunydecoded: null,
//   userinfo: null,
//   host: null,
//   hostPunydecoded: null,
//   port: null,
//   path: null,
//   pathqf: null,
//   query: null,
//   fragment: null,
//   href: null,
// }

parseURI('foo://user:pass@xn--fiq228c.com:8042/over/there?name=ferret#nose');
// {
//   scheme: 'foo',
//   authority: 'user:pass@xn--fiq228c.com:8042',
//   authorityPunydecoded: 'user:pass@中文.com:8042',
//   userinfo: 'user:pass',
//   host: 'xn--fiq228c.com',
//   hostPunydecoded: '中文.com',
//   port: 8042,
//   path: '/over/there',
//   pathqf: '/over/there?name=ferret#nose',
//   query: 'name=ferret',
//   fragment: 'nose',
//   href: 'foo://user:pass@xn--fiq228c.com:8042/over/there?name=ferret#nose',
// }

parseURI('foo://user:pass@中文.com:80g42/over/there?name=ferret#nose');
// {
//   scheme: 'foo',
//   authority: 'user:pass@xn--fiq228c.com:80g42',
//   authorityPunydecoded: 'user:pass@中文.com:80g42',
//   userinfo: 'user:pass',
//   host: 'xn--fiq228c.com',
//   hostPunydecoded: '中文.com',
//   port: '80g42',
//   path: '/over/there',
//   pathqf: '/over/there?name=ferret#nose',
//   query: 'name=ferret',
//   fragment: 'nose',
//   href: 'foo://user:pass@xn--fiq228c.com:80g42/over/there?name=ferret#nose',
// }

parseURI('urn:isbn:0-486-27557-4');
// {
//   scheme: 'urn',
//   authority: null,
//   authorityPunydecoded: null,
//   userinfo: null,
//   host: null,
//   hostPunydecoded: null,
//   port: null,
//   path: 'isbn:0-486-27557-4',
//   pathqf: 'isbn:0-486-27557-4',
//   query: null,
//   fragment: null
//   href: 'urn:isbn:0-486-27557-4',
// }
```

## recomposeURI(options)
Recompose an URI from its components with basic URI checking.

The empty string is returned if unable to recompose the URI.

**Rules**:
1. scheme is required and must be at least 1 character;
2. path is required and can be empty;
3. if host is present path must be empty or start with `/`;
4. if host is not present path must not start with `//`;
5. host, if any, must be at least 3 characters;
6. userinfo, if any, must be at least 1 character;
7. port, if any, must be an integer;
8. query, if any, must be at least 1 character;
9. fragment, if any, must be at least 1 character.

**Support**:
- IPv6.

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__.

<br/>

  - `options` **<Object\>**:
    - `scheme`* **<String\>** The URI scheme.
    - `userinfo` **<String\>** The URI userinfo.
    - `host` **<String\>** The URI authority's host.
    - `port` **<Number\>** The URI authority's port.
    - `path`* **<String\>** The URI path.
    - `query` **<String\>** The URI query.
    - `fragment` **<String\>** The URI fragment.
  - Returns: **<String\>**

<br/>

**Examples**:
```javascript
recomposeURI(); // ''

recomposeURI({
  scheme: null,
  userinfo: 'user:pass',
  host: 'example.com',
  port: 8080,
  path: null,
  query: 'a=b',
  fragment: 'anchor',
}); // ''

recomposeURI({
  scheme: 'foo',
  userinfo: null,
  host: null,
  port: null,
  path: '',
  query: null,
  fragment: null,
}); // 'foo:'

recomposeURI({
  scheme: 'foo',
  userinfo: 'user:pass',
  host: 'bar.com',
  port: 8080,
  path: '/over/there',
  query: 'a=b',
  fragment: 'anchor',
}); // 'foo://user:pass@bar.com:8080/over/there?a=b#anchor'
```

## isDomainLabel(label)
Test a label is a valid domain label according to **RFC-1034**.

> "Note that while upper and lower case letters are allowed in domain names, no significance is attached to the case.  That is, two names with the same spelling but different case are to be treated as if identical."

By convention uppercased domain name will be considered invalid.

**Rules**:
1. "*Labels must be 63 characters or less.*";
2. can be minimum one character;
3. must only use lowercase letters, digits or hyphens;
4. must not start or end with a hyphen;
5. must not have consecutive hyphens;
6. can start or end with a digit.

<br/>

**Based on**:
- __<a href="https://www.ietf.org/rfc/rfc1034.txt" target="_blank">RFC-1034</a>__.

<br/>

  - `label` **<String\>**
  - Returns: **<Boolean\>**

<br/>

**Examples**:
```javascript
isDomainLabel('a'); // true
isDomainLabel('1a3'); // true
isDomainLabel('1-3'); // true
isDomainLabel('1-y'); // true

isDomainLabel(); // false
isDomainLabel('a'.repeat(64)); // false
isDomainLabel('A'); // false
isDomainLabel('-a'); // false
isDomainLabel('a-'); // false
isDomainLabel('-a'); // false
isDomainLabel('la--bel'); // false
isDomainLabel(undefined|null|NaN); // false
```

## isDomain(name)
Test a name is a valid domain according to **RFC-1034**.

Supports Fully-Qualified Domain Name (FQDN) and Internationalized Domain Name (IDN).

**Rules**:
1. "*[...] the total number of octets that represent a domain name (i.e., the sum of all label octets and label lengths) is limited to 255.*";
2. labels are separated by dots (".");
3. must have at least one extension label;
4. must have labels different from each other;
5. last label can be empty (root label ".");
6. labels can start with `xn--` for IDNs if the ASCII serialization is a valid Punycode.

<br/>

**Based on**:
- __<a href="https://www.ietf.org/rfc/rfc1034.txt" target="_blank">RFC-1034</a>__.

<br/>

  - `name` **<String\>**
  - Returns: **<Boolean\>**

<br/>

**Examples**:
```javascript
isDomain('a.b'); // true
isDomain('a.b.'); // true
isDomain('中文.com'); // true
isDomain('xn--fiq228c.com'); // true
isDomain('www.中文.com'); // true
isDomain(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(63)}`); // true

isDomain(); // false
isDomain('a'); // false
isDomain('a.a'); // false
isDomain('a.b.a'); // false
isDomain('a.b.a'); // false
isDomain('中文.xn--fiq228c.com'); // false
isDomain('www.xn--hf.com'); // false
isDomain(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(63)}.`); // false
```

## isIP(ip)
Test a string is a valid IP.

Supports IPv4 and IPv6.

<br/>

  - `ip` **<String\>**
  - Returns: **<Boolean\>**

<br/>

**Examples**:
```javascript
isIP('23.71.254.72'); // true
isIP('1:2:3:4::6:7:8'); // true

isIP(); // false
isIP('100..100.100.100.'); // false
isIP('3ffe:b00::1::a'); // false
```

## isIPv4(ip)
Test a string is a valid IPv4.

<br/>

  - `ip` **<String\>**
  - Returns: **<Boolean\>**

<br/>

**Examples**:
```javascript
isIPv4('8.8.8.8'); // true
isIPv4('1:2::8'); // false
isIPv4(); // false
```

## isIPv6(ip)
Test a string is a valid IPv6.

<br/>

  - `ip` **<String\>**
  - Returns: **<Boolean\>**

<br/>

**Examples**:
```javascript
isIPv6('2001:0000:1234:0000:0000:C1C0:ABCD:0876'); // true
isIPv6('212.58.241.131'); // false
isIPv6(); // false
```

## checkURI(uri)
Check an URI is valid according to **RFC-3986**.

**Rules**:
1. scheme is required and cannot be empty;
2. path is required and can be empty;
3. if authority is present path must be empty or start with `/`;
4. if authority is not present path must not start with `//`;
5. __<a href="https://tools.ietf.org/html/rfc3986#section-3.1" target="_blank">scheme can only have specific characters</a>__;
6. if authority is present:
  1. host must be a valid IP or domain;
  2. __<a href="https://tools.ietf.org/html/rfc3986#section-3.2.1" target="_blank">userinfo, if any, can only have specific characters</a>__;
  3. port, if any, must be an integer.
7. __<a href="https://tools.ietf.org/html/rfc3986#section-3.3" target="_blank">path, query and fragment can only have specific characters</a>__.

<br/>

**Generic syntax**:

![URI Syntax](docs/uri-syntax.png "URI Syntax")

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__.

<br/>

  - `uri` **<String\>**
  - Returns: **<Object\>**
    - `scheme` **<String\>** The URI scheme.
    - `authority` **<String\>** The URI authority with the Punycode ASCII serialization of the domain. *Default*: `null`
    - `authorityPunydecoded` **<String\>** The URI authority with the Unicode serialization of the domain. *Default*: `null`
    - `userinfo` **<String\>** The URI userinfo. *Default*: `null`
    - `host` **<String\>** The URI authority's host with the Punycode ASCII serialization of the domain. *Default*: `null`
    - `hostPunydecoded` **<String\>** The URI authority's host with the Unicode serialization of the domain. *Default*: `null`
    - `port` **<Number\>** || **<String\>** The URI authority's port. A string if not able to be parsed in an integer. *Default*: `null`
    - `path` **<String\>** The URI path.
    - `pathqf` **<String\>** The URI path, query and fragment.
    - `query` **<String\>** The URI query. *Default*: `null`
    - `fragment` **<String\>** The URI fragment. *Default*: `null`
    - `href` **<String\>** The URI recomposed. *Default*: `null`
    - `valid` **<Boolean\>** Whether the URI is valid. *Default*: `false`
  - Throws: **<URIError\>** If no error is thrown then the URI is valid. Error codes:
    - `URI_INVALID_TYPE`
    - `URI_MISSING_SCHEME`
    - `URI_EMPTY_SCHEME`
    - `URI_MISSING_PATH`
    - `URI_INVALID_PATH`
    - `URI_INVALID_HOST`
    - `URI_INVALID_PERCENT_ENCODING`
    - `URI_INVALID_SCHEME_CHAR`
    - `URI_INVALID_USERINFO_CHAR`
    - `URI_INVALID_PORT`
    - `URI_INVALID_CHAR`

<br/>

**Examples**:
```javascript
checkURI(); // throws URIError with code URI_INVALID_TYPE
checkURI('://example.com'); // throws URIError with code URI_MISSING_SCHEME
checkURI('foo:////bar'); // throws URIError with code URI_INVALID_PATH
checkURI('foo://xn--iñvalid.com'); // throws URIError with code URI_INVALID_HOST
checkURI('http://www.bar.baz/foo%2') // throws URIError with code URI_INVALID_PERCENT_ENCODING
checkURI('fôo:bar'); // throws URIError with code URI_INVALID_SCHEME_CHAR
checkURI('foo://üser:pass@bar.com'); // throws URIError with code URI_INVALID_USERINFO_CHAR
checkURI('foo://bar.com:80g80'); // throws URIError with code URI_INVALID_PORT
checkURI('foo://bar.com/°'); // throws URIError with code URI_INVALID_CHAR

checkURI('foo://user:pass@xn--fiq228c.com:8042/over/there?name=ferret#nose');
// {
//   scheme: 'foo',
//   authority: 'user:pass@xn--fiq228c.com:8042',
//   authorityPunydecoded: 'user:pass@中文.com:8042',
//   userinfo: 'user:pass',
//   host: 'xn--fiq228c.com',
//   hostPunydecoded: '中文.com',
//   port: 8042,
//   path: '/over/there',
//   pathqf: '/over/there?name=ferret#nose',
//   query: 'name=ferret',
//   fragment: 'nose',
//   valid: true
// }
```

## checkHttpURL(uri)
Check an URI is a valid HTTP URL.

This function uses *checkURI* to __[check URI provided is valid](#checkuriuri)__.

**Rules**:
1. scheme must be `http` or `HTTP`;
2. authority is not missing.

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__.

<br/>

  - `uri` **<String\>**
  - Returns: **<Object\>**
    - `scheme` **<String\>** The URL scheme.
    - `authority` **<String\>** The URL authority with the Punycode ASCII serialization of the domain. *Default*: `null`
    - `authorityPunydecoded` **<String\>** The URL authority with the Unicode serialization of the domain. *Default*: `null`
    - `userinfo` **<String\>** The URL userinfo. *Default*: `null`
    - `host` **<String\>** The URL authority's host with the Punycode ASCII serialization of the domain. *Default*: `null`
    - `hostPunydecoded` **<String\>** The URL authority's host with the Unicode serialization of the domain. *Default*: `null`
    - `port` **<Number\>** || **<String\>** The URL authority's port. A string if not able to be parsed in an integer. *Default*: `null`
    - `path` **<String\>** The URL path.
    - `pathqf` **<String\>** The URI path, query and fragment.
    - `query` **<String\>** The URL query. *Default*: `null`
    - `fragment` **<String\>** The URL fragment. *Default*: `null`
    - `href` **<String\>** The URL recomposed. *Default*: `null`
    - `valid` **<Boolean\>** Whether the URL is valid. *Default*: `false`
  - Throws: **<URIError\>** If no error is thrown then the URL is valid. Error codes:
    - `URI_INVALID_TYPE`
    - `URI_MISSING_SCHEME`
    - `URI_EMPTY_SCHEME`
    - `URI_MISSING_PATH`
    - `URI_INVALID_PATH`
    - `URI_INVALID_HOST`
    - `URI_INVALID_PERCENT_ENCODING`
    - `URI_INVALID_SCHEME_CHAR`
    - `URI_INVALID_USERINFO_CHAR`
    - `URI_INVALID_PORT`
    - `URI_INVALID_CHAR`
    - `URI_MISSING_AUTHORITY`

<br/>

**Examples**:
```javascript
checkHttpURL(); // throws URIError with code URI_INVALID_TYPE
checkHttpURL('://example.com'); // throws URIError with code URI_MISSING_SCHEME
checkHttpURL('http:////bar'); // throws URIError with code URI_INVALID_PATH
checkHttpURL('http://xn--iñvalid.com'); // throws URIError with code URI_INVALID_HOST
checkHttpURL('http://www.bar.baz/foo%2') // throws URIError with code URI_INVALID_PERCENT_ENCODING
checkHttpURL('hôtp:bar'); // throws URIError with code URI_INVALID_SCHEME_CHAR
checkHttpURL('http://üser:pass@bar.com'); // throws URIError with code URI_INVALID_USERINFO_CHAR
checkHttpURL('http://bar.com:80g80'); // throws URIError with code URI_INVALID_PORT
checkHttpURL('http://bar.com/°'); // throws URIError with code URI_INVALID_CHAR
checkHttpURL('http:isbn:0-486-27557-4'); // throws URIError with code URI_MISSING_AUTHORITY

checkHttpURL('http://user:pass@xn--fiq228c.com:8042/over/there?name=ferret#nose');
// {
//   scheme: 'http',
//   authority: 'user:pass@xn--fiq228c.com:8042',
//   authorityPunydecoded: 'user:pass@中文.com:8042',
//   userinfo: 'user:pass',
//   host: 'xn--fiq228c.com',
//   hostPunydecoded: '中文.com',
//   port: 8042,
//   path: '/over/there',
//   pathqf: '/over/there?name=ferret#nose',
//   query: 'name=ferret',
//   fragment: 'nose',
//   valid: true
// }
```

## checkHttpsURL(uri)
Check an URI is a valid HTTPS URL. Same behavior than __[checkHttpURL](#checkhttpurluri)__ except scheme must be `https` or `HTTPS`.


## checkHttpSitemapURL(uri)
Check an URI is a valid HTTP URL to be used in an XML sitemap file.

For text sitemap please use __[checkHttpURL](#checkhttpurluri)__ as there is no need to escape entities.

This function uses *checkURI* to __[check URI provided is valid](#checkuriuri)__.

**Rules**:
1. scheme must be `http` or `HTTP`;
2. authority is not missing;
3. specific characters are escaped.

**Characters to be escaped in an URL **:

| Character    | Value | Escape Code |
| :----------- |:-----:| :---------: |
| Ampersand    | `&`   | `&amp;`     |
| Single Quote | `'`   | `&apos;`    |

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__;
- __<a href="https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190" target="_blank">Google: Build and submit a sitemap</a>__.

<br/>

  - `uri` **<String\>**
  - Returns: **<Object\>**
    - `scheme` **<String\>** The URL scheme.
    - `authority` **<String\>** The URL authority with the Punycode ASCII serialization of the domain. *Default*: `null`
    - `authorityPunydecoded` **<String\>** The URL authority with the Unicode serialization of the domain. *Default*: `null`
    - `userinfo` **<String\>** The URL userinfo. *Default*: `null`
    - `host` **<String\>** The URL authority's host with the Punycode ASCII serialization of the domain. *Default*: `null`
    - `hostPunydecoded` **<String\>** The URL authority's host with the Unicode serialization of the domain. *Default*: `null`
    - `port` **<Number\>** || **<String\>** The URL authority's port. A string if not able to be parsed in an integer. *Default*: `null`
    - `path` **<String\>** The URL path.
    - `pathqf` **<String\>** The URI path, query and fragment.
    - `query` **<String\>** The URL query. *Default*: `null`
    - `fragment` **<String\>** The URL fragment. *Default*: `null`
    - `href` **<String\>** The URL recomposed. *Default*: `null`
    - `valid` **<Boolean\>** Whether the URL is valid. *Default*: `false`
  - Throws: **<URIError\>** If no error is thrown then the URL is valid. Error codes:
    - `URI_INVALID_TYPE`
    - `URI_MISSING_SCHEME`
    - `URI_EMPTY_SCHEME`
    - `URI_MISSING_PATH`
    - `URI_INVALID_PATH`
    - `URI_INVALID_HOST`
    - `URI_INVALID_PERCENT_ENCODING`
    - `URI_INVALID_SCHEME_CHAR`
    - `URI_INVALID_USERINFO_CHAR`
    - `URI_INVALID_PORT`
    - `URI_INVALID_CHAR`
    - `URI_MISSING_AUTHORITY`
    - `URI_INVALID_SITEMAP_CHAR`

<br/>

**Examples**:
```javascript
checkHttpSitemapURL(); // throws URIError with code URI_INVALID_TYPE
checkHttpSitemapURL('://example.com'); // throws URIError with code URI_MISSING_SCHEME
checkHttpSitemapURL('http:////bar'); // throws URIError with code URI_INVALID_PATH
checkHttpSitemapURL('http://xn--iñvalid.com'); // throws URIError with code URI_INVALID_HOST
checkHttpSitemapURL('http://www.bar.baz/foo%2') // throws URIError with code URI_INVALID_PERCENT_ENCODING
checkHttpSitemapURL('hôtp:bar'); // throws URIError with code URI_INVALID_SCHEME_CHAR
checkHttpSitemapURL('http://üser:pass@bar.com'); // throws URIError with code URI_INVALID_USERINFO_CHAR
checkHttpSitemapURL('http://bar.com:80g80'); // throws URIError with code URI_INVALID_PORT
checkHttpSitemapURL('http://bar.com/°'); // throws URIError with code URI_INVALID_CHAR
checkHttpSitemapURL('http:isbn:0-486-27557-4'); // throws URIError with code URI_MISSING_AUTHORITY
checkHttpSitemapURL('http://user:pass@xn--fiq228c.com:8042/over/there?name=ferret&catch=rabbits#nose'); // throws URIError with code URI_INVALID_SITEMAP_CHAR

checkHttpSitemapURL('http://user:pass@xn--fiq228c.com:8042/over/there?name=ferret&amp;catch=rabbits#nose');
// {
//   scheme: 'http',
//   authority: 'user:pass@xn--fiq228c.com:8042',
//   authorityPunydecoded: 'user:pass@中文.com:8042',
//   userinfo: 'user:pass',
//   host: 'xn--fiq228c.com',
//   hostPunydecoded: '中文.com',
//   port: 8042,
//   path: '/over/there',
//   pathqf: '/over/there?name=ferret&amp;catch=rabbits#nose',
//   query: 'name=ferret&amp;catch=rabbits',
//   fragment: 'nose',
//   valid: true
// }
```

## checkHttpsSitemapURL(uri)
Check an URI is a valid HTTPS URL to be used in an XML sitemap file. Same behavior than __[checkHttpSitemapURL](#checkhttpsitemapurluri)__ except scheme must be `https` or `HTTPS`.

## checkWebURL(uri)
Check an URI is a valid HTTP or HTTPS URL. Same behavior than __[checkHttpURL](#checkhttpurluri)__ except scheme can be be `http`/`HTTP` or `https`/`HTTPS`.

## checkSitemapURL(uri)
Check an URI is a valid HTTP or HTTPS URL to be used in an XML sitemap file. Same behavior than __[checkHttpSitemapURL](#checkhttpsitemapurluri)__ except scheme can be be `http`/`HTTP` or `https`/`HTTPS`.

## encodeURIComponentString(component, options)
Encode an URI component according to **RFC-3986** with Sitemap entities support.

**Note**:
- native function `encodeURIComponent` encodes string according to **RFC-2396** which is outdated;
- characters that should not be percent-encoded in **RFC-3986** are: `[]`;
- the empty string is returned if unable to encode.

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__;
- __<a href="https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190" target="_blank">Google: Build and submit a sitemap</a>__.

<br/>

  - `component` **<String\>**
  - `options` **<Object\>**:
    - `lowercase` **<Boolean\>** Whether the component should be returned in lowercase. *Default*: `false`
    - `sitemap` **<Boolean\>** Whether to escape Sitemap's special characters. See __[checkHttpSitemapURL](#checkhttpsitemapurluri)__.
  - Returns: **<String\>**

<br/>

**Examples**:
```javascript
encodeURIComponentString(); // ''
encodeURIComponentString(''); // ''
encodeURIComponentString('AbC'); // 'AbC'
encodeURIComponentString('AbC', { lowercase: true }); // 'abc'
encodeURIComponentString('<>'); // '%3C%3E'
encodeURIComponentString('<>', { sitemap: true }); // '&lt;&gt;'
encodeURIComponentString('SITE<>maP', { sitemap: true, lowercase: true }); // 'site&lt;&gt;map'
```

## encodeURIString(uri, options)
Encode an URI string according to **RFC-3986** with basic checking.

**Checked**:
- scheme is required;
- path is required, can be empty;
- port, if any, must be a number;
- [parseURI](#parseuriuri) prechecked host, will be null if invalid and so does authority.

**Support**:
- IDNs: returns URI with its Punycode host, if any;
- lower and upper case.

**Note**:
- native function `encodeURI` encodes string according to **RFC-2396** which is outdated;
- characters that should not be percent-encoded in RFC-3986 are: `"[]`;
- to stay fully **RFC-3986** compliant, scheme and host are put in lowercase.

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__.

<br/>

  - `uri` **<String\>**
  - `options` **<Object\>**:
    - `lowercase` **<Boolean\>** Whether the uri should be returned in lowercase. *Default*: `false`
  - Returns: **<String\>**
  - Throws: **<URIError\>** Error codes:
    - `URI_INVALID_TYPE`
    - `URI_MISSING_SCHEME`
    - `URI_EMPTY_SCHEME`
    - `URI_MISSING_PATH`
    - `URI_INVALID_PATH`
    - `URI_INVALID_HOST`
    - `URI_INVALID_SCHEME_CHAR`
    - `URI_INVALID_PORT`

<br/>

**Examples**:
```javascript
encodeURIString(); // throws URIError with code URI_INVALID_TYPE
encodeURIString('://example.com'); // throws URIError with code URI_MISSING_SCHEME
encodeURIString('http:////bar'); // throws URIError with code URI_INVALID_PATH
encodeURIString('http://xn--iñvalid.com'); // throws URIError with code URI_INVALID_HOST
encodeURIString('hôtp:bar'); // throws URIError with code URI_INVALID_SCHEME_CHAR
encodeURIString('http://bar.com:80g80'); // throws URIError with code URI_INVALID_PORT

encodeURIString('HTTPS://WWW.中文.COM./Over/There?a=B&b=c#Anchor'); // 'https://www.xn--fiq228c.com./Over/There?a=B&b=c#Anchor'
encodeURIString('HTTPS://WWW.中文.COM./Over/There?a=B&b=c#Anchor', { lowercase: true }); // 'https://www.xn--fiq228c.com./over/there?a=b&b=c#anchor'
encodeURIString('foo://usër:pâss@bar.baz:8080/Ovër There?ù=B&b=c#Anchôr'); // 'foo://us%C3%ABr:p%C3%A2ss@bar.baz:8080/Ov%C3%ABr%20There?%C3%B9=B&b=c#Anch%C3%B4r'
```

## encodeWebURL(uri, options)
Encode an URI string with basic checking based on **RFC-3986** standard applied to HTTP and HTTPS URLs.
Uses a fixed `encodeURI` function to be **RFC-3986** compliant. See __[encodeURIString](#encodeuristringuri-options)__.

**Checked**:
- scheme must be `http`/`HTTP` or `https`/`HTTPS`;
- path is required, can be empty;
- authority is required;
- port, if any, must be a number;
- [parseURI](#parseuriuri) prechecked host, will be null if invalid and so does authority.

**Support**:
- IDNs: returns URL with its Punycode host, if any;
- lower and upper case.

**Note**:
- native function `encodeURI` encodes string according to **RFC-2396** which is outdated;
- characters that should not be percent-encoded in **RFC-3986** are: `"[]`;
- to stay fully **RFC-3986** compliant, scheme and host are put in lowercase.

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__.

<br/>

  - `uri` **<String\>**
  - `options` **<Object\>**:
    - `lowercase` **<Boolean\>** Whether the uri should be returned in lowercase. *Default*: `false`
  - Returns: **<String\>**
  - Throws: **<URIError\>** Error codes:
    - `URI_INVALID_TYPE`
    - `URI_MISSING_SCHEME`
    - `URI_EMPTY_SCHEME`
    - `URI_MISSING_PATH`
    - `URI_INVALID_PATH`
    - `URI_INVALID_HOST`
    - `URI_INVALID_SCHEME`
    - `URI_INVALID_SCHEME_CHAR`
    - `URI_INVALID_PORT`
    - `URI_MISSING_AUTHORITY`

<br/>

**Examples**:
```javascript
encodeWebURL(); // throws URIError with code URI_INVALID_TYPE
encodeWebURL('://example.com'); // throws URIError with code URI_MISSING_SCHEME
encodeWebURL('http:////bar'); // throws URIError with code URI_INVALID_PATH
encodeWebURL('http://xn--iñvalid.com'); // throws URIError with code URI_INVALID_HOST
encodeWebURL('ftp://bar.baz'); // throws URIError with code URI_INVALID_SCHEME
encodeWebURL('hôtp://bar.baz'); // throws URIError with code URI_INVALID_SCHEME
encodeWebURL('http://bar.com:80g80'); // throws URIError with code URI_INVALID_PORT
encodeWebURL('http:isbn:0-486-27557-4'); // throws URIError with code URI_MISSING_AUTHORITY

encodeWebURL('HTTPS://WWW.中文.COM./Over/There?a=B&b=c#Anchor'); // 'https://www.xn--fiq228c.com./Over/There?a=B&b=c#Anchor'
encodeWebURL('HTTPS://WWW.中文.COM./Over/There?a=B&b=c#Anchor', { lowercase: true }); // 'https://www.xn--fiq228c.com./over/there?a=b&b=c#anchor'
encodeWebURL('http://usër:pâss@bar.baz:8080/Ovër There?ù=B&b=c#Anchôr'); // 'http://us%C3%ABr:p%C3%A2ss@bar.baz:8080/Ov%C3%ABr%20There?%C3%B9=B&b=c#Anch%C3%B4r'
```

## encodeSitemapURL(uri, options)
Encode an URI string with basic checking based on **RFC-3986** standard applied to HTTP and HTTPS URLs and sitemap requirements regarding special entities to escape.

**Checked**:
- scheme must be `http`/`HTTP` or `https`/`HTTPS`;
- path is required, can be empty;
- authority is required;
- port, if any, must be a number;
- [parseURI](#parseuriuri) prechecked host, will be null if invalid and so does authority.

**Support**:
- Sitemap's special characters, see __[checkHttpSitemapURL](#checkhttpsitemapurluri)__;
- IDNs: returns URI with its Punycode host, if any;
- lower and upper case.

**Note**:
- native function `encodeURI` encodes string according to **RFC-2396** which is outdated;
- characters that should not be percent-encoded in **RFC-3986** are: `"[]`;
- sitemap characters that should not be percent-encoded are: `"[]<>`;
- to stay fully **RFC-3986** compliant, scheme and host are put in lowercase.

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__;
- __<a href="https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190" target="_blank">Google: Build and submit a sitemap</a>__.

<br/>

  - `uri` **<String\>**
  - `options` **<Object\>**:
    - `lowercase` **<Boolean\>** Whether the uri should be returned in lowercase. *Default*: `false`
  - Returns: **<String\>**
  - Throws: **<URIError\>** Error codes:
    - `URI_INVALID_TYPE`
    - `URI_MISSING_SCHEME`
    - `URI_EMPTY_SCHEME`
    - `URI_MISSING_PATH`
    - `URI_INVALID_PATH`
    - `URI_INVALID_HOST`
    - `URI_INVALID_SCHEME`
    - `URI_INVALID_SCHEME_CHAR`
    - `URI_INVALID_PORT`
    - `URI_MISSING_AUTHORITY`

<br/>

**Examples**:
```javascript
encodeSitemapURL(); // throws URIError with code URI_INVALID_TYPE
encodeSitemapURL('://example.com'); // throws URIError with code URI_MISSING_SCHEME
encodeSitemapURL('http:////bar'); // throws URIError with code URI_INVALID_PATH
encodeSitemapURL('http://xn--iñvalid.com'); // throws URIError with code URI_INVALID_HOST
encodeSitemapURL('ftp://bar.baz'); // throws URIError with code URI_INVALID_SCHEME
encodeSitemapURL('hôtp://bar.baz'); // throws URIError with code URI_INVALID_SCHEME
encodeSitemapURL('http://bar.com:80g80'); // throws URIError with code URI_INVALID_PORT
encodeSitemapURL('http:isbn:0-486-27557-4'); // throws URIError with code URI_MISSING_AUTHORITY

encodeSitemapURL('http://bar.baz/it\'s over<there>?a="b"&c="d"'); // 'http://bar.baz/it&apos;s%20over&lt;there&gt;?a=&quot;b&quot;&amp;c=&quot;d&quot;'
encodeSitemapURL('http://bar.baz/IT\'S OVER<there>?a="b"&c="d"'); // 'http://bar.baz/IT&apos;S%20OVER&lt;there&gt;?a=&quot;b&quot;&amp;c=&quot;d&quot;'
```

## decodeURIComponentString(component, options)
Decode an URI component string with Sitemap's escape codes support.

Native function `decodeURIComponent` could throw and to be consistent with [encodeURIComponentString](#encodeuricomponentstringcomponent-options) the empty string is returned if unable to decode.

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__;
- __<a href="https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190" target="_blank">Google: Build and submit a sitemap</a>__.

<br/>

  - `component` **<String\>**
  - `options` **<Object\>**:
    - `lowercase` **<Boolean\>** Whether the component should be returned in lowercase. *Default*: `false`
    - `sitemap` **<Boolean\>** Whether to decode Sitemap's escape codes. See __[checkHttpSitemapURL](#checkhttpsitemapurluri)__.
  - Returns: **<String\>**

<br/>

**Examples**:
```javascript
decodeURIComponentString(); // ''
decodeURIComponentString(''); // ''
decodeURIComponentString('AbC'); // 'AbC'
decodeURIComponentString('AbC', { lowercase: true }); // 'abc'
decodeURIComponentString('%3C%3E'); // '<>'
decodeURIComponentString('&apos;&amp;&quot;', { sitemap: true }); // '\'&"'
decodeURIComponentString('SITE<>maP', { sitemap: true, lowercase: true }); // 'site<>map'
decodeURIComponentString('SITE&lt;&gt;maP', { sitemap: true }); // 'SITE<>maP'
```

## decodeURIString(uri, options)
Decode an URI string according to **RFC-3986** with basic checking.

**Checked**:
- scheme is required;
- path is required, can be empty;
- port, if any, must be a number;
- [parseURI](#parseuriuri) prechecked host, will be null if invalid and so does authority.

**Support**:
- IDNs: returns URI with its Punydecoded host (Unicode serialization of the domain), if any;
- lower and upper case.

**Note**:
- native function `decodeURI` does not support IDNs and cannot properly work with `encodeURI` since the function is based on an outdated standard;
- to stay fully **RFC-3986** compliant, scheme and host are put in lowercase.

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__.

<br/>

  - `uri` **<String\>**
  - `options` **<Object\>**:
    - `lowercase` **<Boolean\>** Whether the uri should be returned in lowercase. *Default*: `false`
  - Returns: **<String\>**
  - Throws: **<URIError\>** Error codes:
    - `URI_INVALID_TYPE`
    - `URI_MISSING_SCHEME`
    - `URI_EMPTY_SCHEME`
    - `URI_MISSING_PATH`
    - `URI_INVALID_PATH`
    - `URI_INVALID_HOST`
    - `URI_INVALID_SCHEME_CHAR`
    - `URI_INVALID_PORT`

<br/>

**Examples**:
```javascript
decodeURIString(); // throws URIError with code URI_INVALID_TYPE
decodeURIString('://example.com'); // throws URIError with code URI_MISSING_SCHEME
decodeURIString('http:////bar'); // throws URIError with code URI_INVALID_PATH
decodeURIString('http://xn--iñvalid.com'); // throws URIError with code URI_INVALID_HOST
decodeURIString('hôtp:bar'); // throws URIError with code URI_INVALID_SCHEME_CHAR
decodeURIString('http://bar.com:80g80'); // throws URIError with code URI_INVALID_PORT

decodeURIString('HTTPS://WWW.xn--fiq228c.COM./Over/There?a=B&b=c#Anchor'); // 'https://www.中文.com./Over/There?a=B&b=c#Anchor'
decodeURIString('HTTPS://WWW.xn--fiq228c.COM./Over/There?a=B&b=c#Anchor', { lowercase: true }); // 'https://www.中文.com./over/there?a=b&b=c#anchor'
decodeURIString('foo://us%C3%ABr:p%C3%A2ss@bar.baz:8080/Ov%C3%ABr%20There?%C3%B9=B&b=c#Anch%C3%B4r'); // 'foo://usër:pâss@bar.baz:8080/Ovër There?ù=B&b=c#Anchôr'
```

## decodeWebURL(uri, options)
Decode an URI string with basic checking based on **RFC-3986** standard applied to HTTP and HTTPS URLs.
Uses a fixed `decodeURI` function to be **RFC-3986** compliant. See __[decodeURIString](#decodeuristringuri-options)__.

**Checked**:
- scheme must be `http`/`HTTP` or `https`/`HTTPS`;
- path is required, can be empty;
- authority is required;
- port, if any, must be a number;
- [parseURI](#parseuriuri) prechecked host, will be null if invalid and so does authority.

**Support**:
- IDNs: returns URI with its Punydecoded host (Unicode serialization of the domain), if any;
- lower and upper case.

**Note**:
- native function `decodeURI` does not support IDNs and cannot properly work with `encodeURI` since the function is based on an outdated standard;
- to stay fully **RFC-3986** compliant, scheme and host are put in lowercase.

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__.

<br/>

  - `uri` **<String\>**
  - `options` **<Object\>**:
    - `lowercase` **<Boolean\>** Whether the uri should be returned in lowercase. *Default*: `false`
  - Returns: **<String\>**
  - Throws: **<URIError\>** Error codes:
    - `URI_INVALID_TYPE`
    - `URI_MISSING_SCHEME`
    - `URI_EMPTY_SCHEME`
    - `URI_MISSING_PATH`
    - `URI_INVALID_PATH`
    - `URI_INVALID_HOST`
    - `URI_INVALID_SCHEME`
    - `URI_INVALID_PORT`
    - `URI_MISSING_AUTHORITY`

<br/>

**Examples**:
```javascript
decodeWebURL(); // throws URIError with code URI_INVALID_TYPE
decodeWebURL('://example.com'); // throws URIError with code URI_MISSING_SCHEME
decodeWebURL('http:////bar'); // throws URIError with code URI_INVALID_PATH
decodeWebURL('http://xn--iñvalid.com'); // throws URIError with code URI_INVALID_HOST
decodeWebURL('ftp://bar.com'); // throws URIError with code URI_INVALID_SCHEME
decodeWebURL('hôtp://bar.com'); // throws URIError with code URI_INVALID_SCHEME
decodeWebURL('http://bar.com:80g80'); // throws URIError with code URI_INVALID_PORT
decodeWebURL('http:isbn:0-486-27557-4'); // throws URIError with code URI_MISSING_AUTHORITY

decodeWebURL('HTTPS://WWW.xn--fiq228c.COM./Over/There?a=B&b=c#Anchor'); // 'https://www.中文.com./Over/There?a=B&b=c#Anchor'
decodeWebURL('HTTPS://WWW.xn--fiq228c.COM./Over/There?a=B&b=c#Anchor', { lowercase: true }); // 'https://www.中文.com./over/there?a=b&b=c#anchor'
decodeWebURL('http://us%C3%ABr:p%C3%A2ss@bar.baz:8080/Ov%C3%ABr%20There?%C3%B9=B&b=c#Anch%C3%B4r'); // 'http://usër:pâss@bar.baz:8080/Ovër There?ù=B&b=c#Anchôr'
```

## decodeSitemapURL(uri, options)
Decode an URI string with basic checking based on **RFC-3986** standard applied to HTTP and HTTPS URLs and sitemap requirements regarding escape codes to decode.

**Checked**:
- scheme must be `http`/`HTTP` or `https`/`HTTPS`;
- path is required, can be empty;
- authority is required;
- port, if any, must be a number;
- [parseURI](#parseuriuri) prechecked host, will be null if invalid and so does authority.

**Support**:
- Sitemap's escape codes, see __[checkHttpSitemapURL](#checkhttpsitemapurluri)__;
- IDNs: returns URI with its Punydecoded host (Unicode serialization of the domain), if any;
- lower and upper case.

**Note**:
- native function `decodeURI` does not support IDNs and cannot properly work with `encodeURI` since the function is based on an outdated standard;
- to stay fully **RFC-3986** compliant, scheme and host are put in lowercase.

<br/>

**Based on**:
- __<a href="https://tools.ietf.org/html/rfc3986" target="_blank">RFC-3986</a>__;
- __<a href="https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190" target="_blank">Google: Build and submit a sitemap</a>__.

<br/>

  - `uri` **<String\>**
  - `options` **<Object\>**:
    - `lowercase` **<Boolean\>** Whether the uri should be returned in lowercase. *Default*: `false`
  - Returns: **<String\>**
  - Throws: **<URIError\>** Error codes:
    - `URI_INVALID_TYPE`
    - `URI_MISSING_SCHEME`
    - `URI_EMPTY_SCHEME`
    - `URI_MISSING_PATH`
    - `URI_INVALID_PATH`
    - `URI_INVALID_HOST`
    - `URI_INVALID_SCHEME`
    - `URI_INVALID_PORT`
    - `URI_MISSING_AUTHORITY`

<br/>

**Examples**:
```javascript
decodeSitemapURL(); // throws URIError with code URI_INVALID_TYPE
decodeSitemapURL('://example.com'); // throws URIError with code URI_MISSING_SCHEME
decodeSitemapURL('http:////bar'); // throws URIError with code URI_INVALID_PATH
decodeSitemapURL('http://xn--iñvalid.com'); // throws URIError with code URI_INVALID_HOST
decodeSitemapURL('ftp://bar.com'); // throws URIError with code URI_INVALID_SCHEME
decodeSitemapURL('hôtp://bar.com'); // throws URIError with code URI_INVALID_SCHEME
decodeSitemapURL('http://bar.com:80g80'); // throws URIError with code URI_INVALID_PORT
decodeSitemapURL('http:isbn:0-486-27557-4'); // throws URIError with code URI_MISSING_AUTHORITY

decodeSitemapURL('http://bar.baz/IT&apos;S%20OVER&lt;there&gt;?a=&quot;b&quot;&amp;c=&quot;d&quot;'); // 'http://bar.baz/IT\'S OVER<there>?a="b"&c="d"'
decodeSitemapURL('http://bar.baz/IT&apos;S%20OVER&lt;there&gt;?a=&quot;b&quot;&amp;c=&quot;d&quot;', { lowercase: true }); // 'http://bar.baz/it\'s over<there>?a="b"&c="d"'
```

## Errors

### Object structure

Errors emitted by *node-uri* are native URIError with an additional *code* property:

```javascript
{
  name,
  code,
  message,
  stack,
}
```

### Codes

<table style="text-align: left; vertical-align: center">
  <tr>
    <th style="text-align: center;">name</th>
    <th style="text-align: center;">code</th>
    <th style="text-align: center;">description</th>
    <th style="text-align: center;">module</th>
  </tr>

  <tr>
    <td rowspan="15"><i>URIError</i></td>
  </tr>

  <tr>
    <td>URI_INVALID_PERCENT_ENCODING</td>
    <td>A percent-encoding character is not valid</td>
    <td><code>lib/checkers</code></td>
  </tr>

  <tr>
    <td>URI_INVALID_TYPE</td>
    <td>URI variable type is not valid</td>
    <td><code>lib/checkers</code></td>
  </tr>

  <tr>
    <td>URI_MISSING_SCHEME</td>
    <td>URI scheme is missing</td>
    <td><code>lib/checkers</code></td>
  </tr>

  <tr>
    <td>URI_EMPTY_SCHEME</td>
    <td>URI scheme is empty</td>
    <td><code>ib/checkers</code></td>
  </tr>

  <tr>
    <td>URI_INVALID_SCHEME</td>
    <td>URI scheme is not valid</td>
    <td><code>lib/checkers</code><br/><code>lib/decoders</code><br/><code>lib/encoders</code></td>
  </tr>

  <tr>
    <td>URI_INVALID_SCHEME_CHAR</td>
    <td>URI scheme contains an invalid character</td>
    <td><code>lib/checkers</code><br/><code>lib/decoders</code><br/><code>lib/encoders</code></td>
  </tr>

  <tr>
    <td>URI_MISSING_PATH</td>
    <td>URI path is missing</td>
    <td><code>lib/checkers</code></td>
  </tr>

  <tr>
    <td>URI_INVALID_PATH</td>
    <td>URI path is not valid based on RFC-3986</td>
    <td><code>lib/checkers</code></td>
  </tr>

  <tr>
    <td>URI_MISSING_AUTHORITY</td>
    <td>URI authority is missing</td>
    <td><code>lib/checkers</code><br/><code>lib/decoders</code><br/><code>lib/encoders</code></td>
  </tr>

  <tr>
    <td>URI_INVALID_HOST</td>
    <td>URI host is not valid IP or domain</td>
    <td><code>lib/checkers</code></td>
  </tr>

  <tr>
    <td>URI_INVALID_USERINFO_CHAR</td>
    <td>URI userinfo contains an invalid character</td>
    <td><code>lib/checkers</code></td>
  </tr>

  <tr>
    <td>URI_INVALID_PORT</td>
    <td>URI port is not a number</td>
    <td><code>lib/checkers</code><br/><code>lib/decoders</code><br/><code>lib/encoders</code></td>
  </tr>

  <tr>
    <td>URI_INVALID_CHAR</td>
    <td>URI contains an invalid character</td>
    <td><code>lib/checkers</code></td>
  </tr>

  <tr>
    <td>URI_INVALID_SITEMAP_CHAR</td>
    <td>URI contains an invalid sitemap character</td>
    <td><code>lib/checkers</code></td>
  </tr>

</table>

# Code of Conduct
This project has a [Code of Conduct](.github/CODE_OF_CONDUCT.md). By interacting with this repository, organization, or community you agree to abide by its terms.

# Contributing
Please have a look to our [TODO](TODO.md) for any work in progress.

Please take also a moment to read our [Contributing Guidelines](.github/CONTRIBUTING.md) if you haven't yet done so.

# Support
Please see our [Support](.github/SUPPORT.md) page if you have any questions or for any help needed.

# Security
For any security concerns or issues, please visit our [Security Policy](.github/SECURITY.md) page.

# Licence
[MIT](LICENSE.md).
