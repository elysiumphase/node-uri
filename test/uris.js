/**
 * uris samples
 *
 * - uri
 * - notUri
 * - http
 * - notHttp
 * - https
 * - notHttps
 * - unicode
 * - idn
 * - notIdn
 * - sitemap
 * - notSitemap
 */

const uri = [
  'urn:isbn',
  'urn:isbn:0-486-27557-4',
  'ftp://example.com',
  'f:',
  'http:',
  'http::',
  'foo://bar.com?q',
  'foo://bar.com#a',
  'foo:bar:baz?q',
  'foo:bar:baz#a',
  'foo:bar:baz?q#a',
];

const notUri = [
  {},
  [],
  255,
  true,
  new Error('error'),
  '',
  '       ',
  ':',
  'f://',
  'f:///path',
  ' http: example.com',
  `${'a'.repeat(64)}.com`,
  `${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'d'.repeat(63)}.com`,
  '/Users/dir/file.js',
  '://example.com',
  ':',
  'f://user:pass@ab:8080',
  'http://foo',
  'éè://test:80',
  's://s.s.',
  'foo://foo.foo',
  'foo://a.b.a',
  'hép://example.com',
  '°p://example.com',
  'foo://usér:pass@example.com:8042/over/there?name=ferret#nose',
  'foo://us€r:pass@example.com:8042/over/there?name=ferret#nose',
  'foo://user:pa[ss@example.com:8042/over/there?name=ferret#nose',
  'foo://usEr:pass@example.com:8042/over/there?name=ferret#nose',
  'foo://usEr:pasS@example.com:8042/over/there?name=ferret#nose',
  'foo://user%:pass@example.com:8042/over/there?name=ferret#nose',
  'foo://user%20%2z:pass@example.com:8042/over/there?name=ferret#nose',
  'foo://user:%acpass@example.com:8042/over/there?name=ferret#nose',
  'foo://user:pass%@example.com:8042/over/there?name=ferret#nose',
  'foo://user:pass%a@example.com:8042/over/there?name=ferret#nose',
  'foo://999.999.999.999:8042/over/there?name=ferret#nose',
  'foo://3ffe:b00::1::a/over/there?name=ferret#nose',
  'foo://aaaaaa:8042/over/there?name=ferret#nose',
  'foo://com.com/over/there?name=ferret#nose',
  'foo://example..com/over/there?name=ferret#nose',
  'foo://xn--iñvalid.com',
  'foo://example.com:80g42/over/there?name=ferret#nose',
  'foo://example.com:8042/over/thère?name=ferret#nose',
  'foo://example.com:8042/ôver/there?name=ferret#nose',
  'foo://example.com:8042/over\\there?name=ferret#nose',
  'foo://example.com:8042/\\over/there?name=ferret#nose',
  'foo://example.com:8042/over^there?name=ferret#nose',
  'foo://example.com:8042/{over}/the`re?name=ferret#nose',
  'foo://example.com:8042/over|there?name=ferret#nose',
  'foo://example.com:8042/over}/there?name=ferret#nose',
  'foo://example.com:8042/over/{there?name=ferret#nose',
  'foo://example.com:8042/over/there%20%20%?name=ferret#nose',
  'foo://example.com:8042/over/there%2?name=ferret#nose',
  'foo://example.com:8042/over/there%Aa?name=ferret#nose',
  'foo://example.com:8042/%2cover/there%20%20?name=ferret#nose',
  'foo://example.com:8042/%a2over/there%20%20%?name=ferret#nose',
  'foo://example.com:8042/%gover/there%20%20%?name=ferret#nose',
  'foo://example.com:8042/%20over/there%20%20%?name=ferret%#nose',
  'foo://example.com:8042/%20over/there%20%20%?name=ferret%%#nose',
  'foo://example.com:8042/over/there%20%20%?name=f%erret#nose',
  'foo://example.com:8042/over/there?name=ferret#nose%',
  'foo://example.com:8042/over/there?name=ferret#nose%A',
  'foo://example.com:8042/over/there?name=ferret#nose%ef',
  'foo://example.com:8042/over/there?name=ferret#nose%ac',
  'foo://example.com:8042/over/there?name=ferret#nose%9',
  'foo://example.com:8042/over/there?name=ferret#nose%8c',
  'foo://example.com:8042/over/there?name=ferret#nose%a9',
];

const http = [
  'http://example.com.',
  'http://www.example.com.',
  'http://www.example.com',
  'http://a.b',
  'http://a.b.',
  'http://a.b.c.d.',
  'http://ex@mple.com',
  'http://user:pass@example.com.',
  'http://user:pass@example.com./',
  'http://user:pass@example.com./over/there?page=5#coin',
  'http://中文.com',
  'http://example.com:8042/it\'sover/there?name=ferret#nose',
  'http://example.com:8042/it"s%20over/there?name=ferret#nose',
  'http://example.com:8042/over/there?name=ferret&pseudo=superhero#nose',
  'http://username:password@www.example.com:80/path/to/file.php?foo=316&bar=this+has+spaces#anchor',
  'http://das-küchengeflüster.de/feed',
  'http://www.foo.bar./',
  'http://✪df.ws/123',
  'http://➡.ws/',
  'http://⌘.ws',
  'http://⌘.ws/',
  'http://☺.damowmow.com/',
  'http://例子.测试',
  'http://उदाहरण.परीक्षा',
  'http://localhost:4001//app**//**test#//dash//Dashboard1',
];

const notHttp = [
  'foo://example.com:8042/over/there?name=ferret#nose',
  'ftp://example.com:8042/over/there?name=ferret#nose',
  'f://example.com:8042/over/there?name=ferret#nose',
  'c://example.com:8042/over/there?name=ferret#nose',
  'https://example.com:8042/over/there?name=ferret#nose',
  'http:isbn:0-486-27557-4',
  'http:///path',
  'http://https://www.facebook.com/sunnybens',
  'http://-',
  'http://a.b--c.de/',
  'http:',
  'http::',
  'http://wrong%20link.tech/JFKblue.gif',
  'http://http://blah',
  'http://www,example,com',
  'http://www,example.com',
  'http://www.example,com',
  'http://foo',
];

const https = [
  'https://example.com.',
  'https://www.example.com.',
  'https://www.example.com',
  'https://a.b',
  'https://a.b.',
  'https://a.b.c.d.',
  'https://user:pass@example.com.',
  'https://user:pass@example.com./',
  'https://user:pass@example.com./over/there?page=5#coin',
  'https://中文.com',
  'https://example.com:8042/it\'sover/there?name=ferret#nose',
  'https://example.com:8042/it"s%20over/there?name=ferret#nose',
  'https://example.com:8042/over/there?name=ferret&pseudo=superhero#nose',
  'https://中文.com:8042/over/there?name=ferret&pseudo=superhero#nose',
];

const notHttps = [
  'foo://example.com:8042/over/there?name=ferret#nose',
  'ftp://example.com:8042/over/there?name=ferret#nose',
  'f://example.com:8042/over/there?name=ferret#nose',
  'c://example.com:8042/over/there?name=ferret#nose',
  'http://example.com:8042/over/there?name=ferret#nose',
  'https:isbn:0-486-27557-4',
  'https:///path',
  'https://https://www.facebook.com/sunnybens',
  'https://shop.delacier.com;hu.shop.delacier.com/products.json',
  'https:',
  'https::',
  'https:::///wwww.google.com',
];

const unicode = [
  'http://✪df.ws/123',
  'http://➡.ws/䨹',
  'http://foo.com/unicode_(✪)_in_parens',
  'http://☺.damowmow.com/☺☺☺',
];

const idn = [
  'http://español.com',
  'http://中文.com',
  'https://中文.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose',
  'http://✪df.ws/123',
  'http://➡.ws/',
  'http://⌘.ws',
  'http://⌘.ws/',
  'http://☺.damowmow.com/',
  'http://例子.测试',
  'http://उदाहरण.परीक्षा',
];

const notIdn = [
  'http://user:pass@xn--iñvalid.com:8080',
];

const sitemap = [
  'http://user:pass@example.com./over/there?page=5&amp;x=1#coin',
  'https://中文.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose',
  'http://example.com:8042/over/there?name=ferret&amp;pseudo=superhero#nose',
  'http://example.com:8042/it&apos;sover/there?name=ferret#nose',
  'http://example.com:8042/it&quot;sover/there?name=ferret#nose',
  'http://example.com:8042/&lt;over&gt;/there?name=ferret#nose',
  'http://example.com:8042/&amp;sover/&gt;there&lt;?name=ferret#nose',
];

const notSitemap = [
  'http://user:pass@example.com./over/there?page=5&x=1#coin',
  'https://中文.com:8042/over/there?name=ferret&pseudo=superhero#nose',
  'http://example.com:8042/over/there%20%20%?name=ferret#nose',
  'http://example.com:8042/over/there%2?name=ferret#nose',
  'http://example.com:8042/over/there%Aa?name=ferret#nose',
  'http://example.com:8042/%2cover/there%20%20?name=ferret#nose',
  'http://example.com:8042/%a2over/there%20%20%?name=ferret#nose',
  'http://example.com:8042/%gover/there%20%20%?name=ferret#nose',
  'http://example.com:8042/%20over/there%20%20%?name=ferret%#nose',
  'http://example.com:8042/%20over/there%20%20%?name=ferret%%#nose',
  'http://example.com:8042/over/there%20%20%?name=f%erret#nose',
  'http://example.com:8042/over/there?name=ferret#nose%',
  'http://example.com:8042/over/there?name=ferret#nose%A',
  'http://example.com:8042/over/there?name=ferret#nose%ef',
  'http://example.com:8042/over/there?name=ferret#nose%ac',
  'http://example.com:8042/over/there?name=ferret#nose%9',
  'http://example.com:8042/over/there?name=ferret#nose%8c',
  'http://example.com:8042/over/there?name=ferret#nose%a9',
  'http://example.com:8042/it\'sover/there?name=ferret#nose',
  'http://example.com:8042/it"s%20over/there?name=ferret#nose',
  'http://example.com:8042/over/there?name=ferret&pseudo=superhero#nose',
  'http://example.com:8042/over/there?name=ferret&pseudo=superhero#nose',
  'http://example.com:8042/over/&quotthere?name=ferret#nose',
  'http://example.com:8042/over&am/there?name=ferret#nose',
  'http://example.com:8042/over/there?name=ferret&apo#nose',
  'http://example.com:8042/over/there?name=ferret&g#nose',
  'http://example.com:8042/over/there?name=ferret&l;#nose',
];

module.exports = Object.freeze({
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
});
