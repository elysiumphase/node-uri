const { expect } = require('../Common');
const {
  isIP,
  isIPv4,
  isIPv6,
} = require('../../src/ip');

const v4 = [
	'0.0.0.0',
	'8.8.8.8',
	'127.0.0.1',
	'100.100.100.100',
	'192.168.0.1',
	'18.101.25.153',
	'123.23.34.2',
	'172.26.168.134',
	'212.58.241.131',
	'128.0.0.0',
	'23.71.254.72',
	'223.255.255.255',
	'192.0.2.235',
	'99.198.122.146',
	'46.51.197.88',
	'173.194.34.134',
];

const v4not = [
	'.100.100.100.100',
	'100..100.100.100.',
	'100.100.100.100.',
	'999.999.999.999',
	'256.256.256.256',
	'256.100.100.100.100',
	'123.123.123',
	'http://123.123.123',
	'1000.2.3.4',
	'999.2.3.4',
];

const v6 = [
	'::',
	'1::',
	'::1',
	'1::8',
	'1::7:8',
	'1:2:3:4:5:6:7:8',
	'1:2:3:4:5:6::8',
	'1:2:3:4:5:6:7::',
	'1:2:3:4:5::7:8',
	'1:2:3:4:5::8',
	'1:2:3::8',
	'1::4:5:6:7:8',
	'1::6:7:8',
	'1::3:4:5:6:7:8',
	'1:2:3:4::6:7:8',
	'1:2::4:5:6:7:8',
	'::2:3:4:5:6:7:8',
	'1:2::8',
	'2001:0000:1234:0000:0000:C1C0:ABCD:0876',
	'3ffe:0b00:0000:0000:0001:0000:0000:000a',
	'FF02:0000:0000:0000:0000:0000:0000:0001',
	'0000:0000:0000:0000:0000:0000:0000:0001',
	'0000:0000:0000:0000:0000:0000:0000:0000',
	'::ffff:192.168.1.26',
	'2::10',
	'ff02::1',
	'fe80::',
	'2002::',
	'2001:db8::',
	'2001:0db8:1234::',
	'::ffff:0:0',
	'::ffff:192.168.1.1',
	'1:2:3:4::8',
	'1::2:3:4:5:6:7',
	'1::2:3:4:5:6',
	'1::2:3:4:5',
	'1::2:3:4',
	'1::2:3',
	'::2:3:4:5:6:7',
	'::2:3:4:5:6',
	'::2:3:4:5',
	'::2:3:4',
	'::2:3',
	'::8',
	'1:2:3:4:5:6::',
	'1:2:3:4:5::',
	'1:2:3:4::',
	'1:2:3::',
	'1:2::',
	'1:2:3:4::7:8',
	'1:2:3::7:8',
	'1:2::7:8',
	'1:2:3:4:5:6:1.2.3.4',
	'1:2:3:4:5::1.2.3.4',
	'1:2:3:4::1.2.3.4',
	'1:2:3::1.2.3.4',
	'1:2::1.2.3.4',
	'1::1.2.3.4',
	'1:2:3:4::5:1.2.3.4',
	'1:2:3::5:1.2.3.4',
	'1:2::5:1.2.3.4',
	'1::5:1.2.3.4',
	'1::5:11.22.33.44',
	'fe80::217:f2ff:254.7.237.98',
	'fe80::217:f2ff:fe07:ed62',
	'2001:DB8:0:0:8:800:200C:417A',
	'FF01:0:0:0:0:0:0:101',
	'0:0:0:0:0:0:0:1',
	'0:0:0:0:0:0:0:0',
	'2001:DB8::8:800:200C:417A',
	'FF01::101',
	'0:0:0:0:0:0:13.1.68.3',
	'0:0:0:0:0:FFFF:129.144.52.38',
	'::13.1.68.3',
	'::FFFF:129.144.52.38',
	'fe80:0000:0000:0000:0204:61ff:fe9d:f156',
	'fe80:0:0:0:204:61ff:fe9d:f156',
	'fe80::204:61ff:fe9d:f156',
	'fe80:0:0:0:204:61ff:254.157.241.86',
	'fe80::204:61ff:254.157.241.86',
	'fe80::1',
	'2001:0db8:85a3:0000:0000:8a2e:0370:7334',
	'2001:db8:85a3:0:0:8a2e:370:7334',
	'2001:db8:85a3::8a2e:370:7334',
	'2001:0db8:0000:0000:0000:0000:1428:57ab',
	'2001:0db8:0000:0000:0000::1428:57ab',
	'2001:0db8:0:0:0:0:1428:57ab',
	'2001:0db8:0:0::1428:57ab',
	'2001:0db8::1428:57ab',
	'2001:db8::1428:57ab',
	'::ffff:12.34.56.78',
	'::ffff:0c22:384e',
	'2001:0db8:1234:0000:0000:0000:0000:0000',
	'2001:0db8:1234:ffff:ffff:ffff:ffff:ffff',
	'2001:db8:a::123',
	'::ffff:192.0.2.128',
	'::ffff:c000:280',
	'a:b:c:d:e:f:f1:f2',
	'a:b:c::d:e:f:f1',
	'a:b:c::d:e:f',
	'a:b:c::d:e',
	'a:b:c::d',
	'::a',
	'::a:b:c',
	'::a:b:c:d:e:f:f1',
	'a::',
	'a:b:c::',
	'a:b:c:d:e:f:f1::',
	'a:bb:ccc:dddd:000e:00f:0f::',
	'0:a:0:a:0:0:0:a',
	'0:a:0:0:a:0:0:a',
	'2001:db8:1:1:1:1:0:0',
	'2001:db8:1:1:1:0:0:0',
	'2001:db8:1:1:0:0:0:0',
	'2001:db8:1:0:0:0:0:0',
	'2001:db8:0:0:0:0:0:0',
	'2001:0:0:0:0:0:0:0',
	'A:BB:CCC:DDDD:000E:00F:0F::',
	'0:0:0:0:0:0:0:a',
	'0:0:0:0:a:0:0:0',
	'0:0:0:a:0:0:0:0',
	'a:0:0:a:0:0:a:a',
	'a:0:0:a:0:0:0:a',
	'a:0:0:0:a:0:0:a',
	'a:0:0:0:a:0:0:0',
	'a:0:0:0:0:0:0:0',
	'fe80::7:8%eth0',
	'fe80::7:8%1',
];

const v6not = [
	'',
	'1:',
	':1',
	'11:36:12',
	'02001:0000:1234:0000:0000:C1C0:ABCD:0876',
	'2001:0000:1234:0000:00001:C1C0:ABCD:0876',
	'2001:0000:1234: 0000:0000:C1C0:ABCD:0876',
	'2001:1:1:1:1:1:255Z255X255Y255',
	'3ffe:0b00:0000:0001:0000:0000:000a',
	'FF02:0000:0000:0000:0000:0000:0000:0000:0001',
	'3ffe:b00::1::a',
	'::1111:2222:3333:4444:5555:6666::',
	'1:2:3::4:5::7:8',
	'12345::6:7:8',
	'1::5:400.2.3.4',
	'1::5:260.2.3.4',
	'1::5:256.2.3.4',
	'1::5:1.256.3.4',
	'1::5:1.2.256.4',
	'1::5:1.2.3.256',
	'1::5:300.2.3.4',
	'1::5:1.300.3.4',
	'1::5:1.2.300.4',
	'1::5:1.2.3.300',
	'1::5:900.2.3.4',
	'1::5:1.900.3.4',
	'1::5:1.2.900.4',
	'1::5:1.2.3.900',
	'1::5:300.300.300.300',
	'1::5:3000.30.30.30',
	'1::400.2.3.4',
	'1::260.2.3.4',
	'1::256.2.3.4',
	'1::1.256.3.4',
	'1::1.2.256.4',
	'1::1.2.3.256',
	'1::300.2.3.4',
	'1::1.300.3.4',
	'1::1.2.300.4',
	'1::1.2.3.300',
	'1::900.2.3.4',
	'1::1.900.3.4',
	'1::1.2.900.4',
	'1::1.2.3.900',
	'1::300.300.300.300',
	'1::3000.30.30.30',
	'::400.2.3.4',
	'::260.2.3.4',
	'::256.2.3.4',
	'::1.256.3.4',
	'::1.2.256.4',
	'::1.2.3.256',
	'::300.2.3.4',
	'::1.300.3.4',
	'::1.2.300.4',
	'::1.2.3.300',
	'::900.2.3.4',
	'::1.900.3.4',
	'::1.2.900.4',
	'::1.2.3.900',
	'::300.300.300.300',
	'::3000.30.30.30',
	'2001:DB8:0:0:8:800:200C:417A:221',
	'FF01::101::2',
	'1111:2222:3333:4444::5555:',
	'1111:2222:3333::5555:',
	'1111:2222::5555:',
	'1111::5555:',
	'::5555:',
	':::',
	'1111:',
	':',
	':1111:2222:3333:4444::5555',
	':1111:2222:3333::5555',
	':1111:2222::5555',
	':1111::5555',
	':::5555',
	'1.2.3.4:1111:2222:3333:4444::5555',
	'1.2.3.4:1111:2222:3333::5555',
	'1.2.3.4:1111:2222::5555',
	'1.2.3.4:1111::5555',
	'1.2.3.4::5555',
	'1.2.3.4::',
	'fe80:0000:0000:0000:0204:61ff:254.157.241.086',
	'123',
	'ldkfj',
	'2001::FFD3::57ab',
	'2001:db8:85a3::8a2e:37023:7334',
	'2001:db8:85a3::8a2e:370k:7334',
	'1:2:3:4:5:6:7:8:9',
	'1::2::3',
	'1:::3:4:5',
	'1:2:3::4:5:6:7:8:9',
	'::ffff:2.3.4',
	'::ffff:257.1.2.3',
	'::ffff:12345678901234567890.1.26',
];

describe('#ip', function() {
  context('when using isIP', function() {
    it('should return false if ip is not defined or empty', function() {
      expect(isIP()).to.be.a('boolean').and.to.be.false;
      expect(isIP(null)).to.be.a('boolean').and.to.be.false;
      expect(isIP(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isIP(NaN)).to.be.a('boolean').and.to.be.false;
      expect(isIP('')).to.be.a('boolean').and.to.be.false;
      expect(isIP('     ')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if ip is not a string', function() {
      expect(isIP({})).to.be.a('boolean').and.to.be.false;
      expect(isIP([])).to.be.a('boolean').and.to.be.false;
      expect(isIP(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isIP(255)).to.be.a('boolean').and.to.be.false;
      expect(isIP(true)).to.be.a('boolean').and.to.be.false;
    });

    it('should return true if ip is a valid v4 ip', function() {
      v4.forEach((ip) => {
        expect(isIP(ip)).to.be.a('boolean').and.to.be.true;
      });
    });

    it('should return false if ip is not a valid v4 ip', function() {
      v4not.forEach((ip) => {
        expect(isIP(ip)).to.be.a('boolean').and.to.be.false;
      });
    });

    it('should return true if ip is a valid v6 ip', function() {
      v6.forEach((ip) => {
        expect(isIP(ip)).to.be.a('boolean').and.to.be.true;
      });
    });

    it('should return false if ip is not a valid v6 ip', function() {
      v6not.forEach((ip) => {
        expect(isIP(ip)).to.be.a('boolean').and.to.be.false;
      });
    });
  });

  context('when using isIPv4', function() {
    it('should return false if ip is not defined or empty', function() {
      expect(isIPv4()).to.be.a('boolean').and.to.be.false;
      expect(isIPv4(null)).to.be.a('boolean').and.to.be.false;
      expect(isIPv4(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isIPv4(NaN)).to.be.a('boolean').and.to.be.false;
      expect(isIPv4('')).to.be.a('boolean').and.to.be.false;
      expect(isIPv4('     ')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if ip is not a string', function() {
      expect(isIPv4({})).to.be.a('boolean').and.to.be.false;
      expect(isIPv4([])).to.be.a('boolean').and.to.be.false;
      expect(isIPv4(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isIPv4(255)).to.be.a('boolean').and.to.be.false;
      expect(isIPv4(true)).to.be.a('boolean').and.to.be.false;
    });

    it('should return true if ip is a valid v4 ip', function() {
      v4.forEach((ip) => {
        expect(isIPv4(ip)).to.be.a('boolean').and.to.be.true;
      });
    });

    it('should return false if ip is not a valid v4 ip', function() {
      v4not.forEach((ip) => {
        expect(isIPv4(ip)).to.be.a('boolean').and.to.be.false;
      });
    });

    it('should return false if ip is a valid v6 ip', function() {
      v6.forEach((ip) => {
        expect(isIPv4(ip)).to.be.a('boolean').and.to.be.false;
      });
    });
  });

  context('when using isIPv6', function() {
    it('should return false if ip is not defined or empty', function() {
      expect(isIPv6()).to.be.a('boolean').and.to.be.false;
      expect(isIPv6(null)).to.be.a('boolean').and.to.be.false;
      expect(isIPv6(undefined)).to.be.a('boolean').and.to.be.false;
      expect(isIPv6(NaN)).to.be.a('boolean').and.to.be.false;
      expect(isIPv6('')).to.be.a('boolean').and.to.be.false;
      expect(isIPv6('     ')).to.be.a('boolean').and.to.be.false;
    });

    it('should return false if ip is not a string', function() {
      expect(isIPv6({})).to.be.a('boolean').and.to.be.false;
      expect(isIPv6([])).to.be.a('boolean').and.to.be.false;
      expect(isIPv6(new Error('error'))).to.be.a('boolean').and.to.be.false;
      expect(isIPv6(255)).to.be.a('boolean').and.to.be.false;
      expect(isIPv6(true)).to.be.a('boolean').and.to.be.false;
    });

    it('should return true if ip is a valid v6 ip', function() {
      v6.forEach((ip) => {
        expect(isIPv6(ip)).to.be.a('boolean').and.to.be.true;
      });
    });

    it('should return false if ip is not a valid v6 ip', function() {
      v6not.forEach((ip) => {
        expect(isIPv6(ip)).to.be.a('boolean').and.to.be.false;
      });
    });

    it('should return false if ip is a valid v4 ip', function() {
      v4.forEach((ip) => {
        expect(isIPv6(ip)).to.be.a('boolean').and.to.be.false;
      });
    });
  });
});
