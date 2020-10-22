var DNSPacket = require("./lib/DNSPacket");
var DNSQuestion = require("./lib/DNSQuestion");
var DNSAnswer = require("./lib/DNSAnswer");
var DNSHeader = require("./lib/DNSHeader");
var RR = require("./lib/record");


//let myPacket = new DNSPacket("00038100000100010000000006676f6f676c6502646500001c0001c00c001c00010000003c00102a0014504001081a0000000000002003");
let myPacket = new DNSPacket();
//let myPacket = new DNSPacket("f38781000002000800000000057269766572046461746102656103636f6d0000010001057269766572046461746102656103636f6d0000010004c00c000100010000003c0004341794b3c00c000100010000003c000403d8d3ccc00c000100010000003c000422c2089dc00c000100010000003c00043437b4acc00c000100010000003c000422e6d3bec00c000100010000003c0004342cc440c00c000100010000003c000422e115d5c00c000100010000003c000403de2d33");
//let myPacket = new DNSPacket("459a858000010001000000010477696b690477696b690000250001c00c0025000100002a30026c000100000130820263308201cca003020102020100300d06092a864886f70d0101050500302e310b3009060355040613025553310c300a060355040a130349424d3111300f060355040b13084c6f63616c204341301e170d3939313232323035303030305a170d3030313232333034353935395a302e310b3009060355040613025553310c300a060355040a130349424d3111300f060355040b13084c6f63616c20434130819f300d06092a864886f70d010101050003818d0030818902818100f66d9128ef119a5f6ff418792b34566f971068bbdbf5266b7f3c389330fbdef2bf45789010d1076f1524ffd093d0603db4ac7d1b8a67432e035d3729e6c91a12d92fc82277e999febd8b27361b44cfc91be61c888e65b74277e6011d08b569d923d7b3437168fa4b5e2d56eac55fbdf3c74b0da0c4bbf6adedb972ab0ecc5ebb0203010001a3819030818d304b0609551d0f0186f842010d043e133c47656e65726174656420627920746865205365637572655761792053656375726974792053657276657220666f72204f532f33393020285241434629300e0603551d0f0101ff040403020006300f0603551d130101ff040530030101ff301d0603551d0e041604149dfea1c472093270d3aedd2d2c2bfe76a5c7a60c300d06092a864886f70d010105050003818100c690cedfb36a3d4653bef2ce5afc8a23015e0750af0b19656268e5ec6702e70900461066639fc8b88c0faa18abe6677ef3349fc1bf63bf6af27870beec6960e9d14805c5a7ac5292b20e799b49318d61d342caa7f257dcd835b2f6766a0135dba247b10d1b8733794cab187dbc1f4f07e3756006cba55fd67622feb3beaf230e0000290500000000000000");

myPacket.fromHexStream("00178580000100010000000001610477696b690477696b6900000d0001c00c000d000100002a3000190c7465737463707531323334350b746573746f733132333435");

//console.log(myPacket.printPacket());
//console.log(JSON.stringify(myPacket.printPacket(), null, 4));

//console.log("---");

let empty = new DNSPacket();

empty.addQuestion(
    new DNSQuestion("google.com", "A", "INTERNET")
);

empty.addAnswerRR(
    new DNSAnswer("google.com", "INTERNET", 300,
    new RR.A("172.217.21.228"))
);

empty.addAnswerRR(
    new DNSAnswer("google.com", "INTERNET", 300,
    new RR.AAAA("2a00:1450:4001:824::200e"))
);

empty.addAnswerRR(
    new DNSAnswer("google.com", "INTERNET", 300,
    new RR.HINFO({ os: "Windows", cpu: "i9-9900k"}))
);

empty.addAnswerRR(
    new DNSAnswer("google.com", "INTERNET", 300,
    new RR.CNAME("wikipedia.org"))
);

empty.addAnswerRR(
    new DNSAnswer("google.com", "INTERNET", 300,
    new RR.DNAME("wikipedia.org1"))
);

empty.addAnswerRR(
    new DNSAnswer("google.com", "INTERNET", 300,
    new RR.TXT("sl=*1"))
);

empty.addAnswerRR(
    new DNSAnswer("wikipedia.org", "INTERNET", 123,
    new RR.MX({ priority: 10, exchange: "google.co.uk" }))
);

empty.addAnswerRR(
    new DNSAnswer("wikipedia.org", "INTERNET", 123,
    new RR.SRV({ priority: 10, weight: 15, port: 65535, target: "adolf.de" }))
);

empty.addAnswerRR(
    new DNSAnswer("tele5.org", "INTERNET", 123,
    new RR.MB("wieistmeineip.de"))
);

empty.addAnswerRR(
    new DNSAnswer("tele5.org", "INTERNET", 123,
    new RR.MR("wieistmeineip.de"))
);

empty.addAnswerRR(
    new DNSAnswer("omega.de", "INTERNET", 123,
    new RR.CNAME("www.omega.de"))
);

empty.addAnswerRR(
    new DNSAnswer("omega.de", "INTERNET", 123,
    new RR.X25("jdnjashdjasd123"))
);

empty.addAnswerRR(
    new DNSAnswer("omega.de", "INTERNET", 123,
    new RR.SOA({
        primaryNS: "ns1.google.com",
        hostmaster: "dns-admin.google.com",
        serial: "337724518",
        refresh: "900",
        retry: "900",
        expire: "1800",
        minttl: "60",
    }))
);

empty.addAnswerRR(
    new DNSAnswer("omega.de", "INTERNET", 123,
    new RR.RP({
        mailbox: "jung-tobias.outlook.com",
        txtRR: "google.com",
    }))
);

empty.addAnswerRR(
    new DNSAnswer("omega.de", "INTERNET", 123,
    new RR.RT({
        intermediateHostname: "outlook.com",
        preference: 10,
    }))
);

empty.addAnswerRR(
    new DNSAnswer("8.8.8.8.in-addr.arpa", "INTERNET", 123,
    new RR.PTR("dns.google"))
);

empty.addAnswerRR(
    new DNSAnswer("omega.de", "INTERNET", 123,
    new RR.MINFO({
        responsibleMailbox: "a.outlook.com",
        errorMailbox: "b.outlook.com",
    }))
);

empty.addAnswerRR(
    new DNSAnswer("8.8.8.8.in-addr.arpa", "INTERNET", 123,
    new RR.MG("wiki.wiki.google"))
);

empty.addAnswerRR(
    new DNSAnswer("omega.de", "INTERNET", 123,
    new RR.AFSDB({
        subtype: 1,
        hostname: "outlook.com",
    }))
);

empty.addAnswerRR(
    new DNSAnswer("google.com", "INTERNET", 123,
    new RR.ISDN({
        isdnAdress: "abc123def",
        subadress: "123abc456",
    }))
);

empty.addAnswerRR(
    new DNSAnswer("google.com", "INTERNET", 123,
    new RR.GPOS({
        latitude: "+1265 N 12",
        longitude: "-5000 S 99'",
        altitude: "100cm",
    }))
);

empty.addAnswerRR(
    new DNSAnswer("google.com", "INTERNET", 123,
    new RR.NAPTR({
        order: 25565,
        priority: 101,
        flags: "flag123#",
        service: "service123#",
        regex: "/test/gi",
        replacement: "",
    }))
);

empty.addAnswerRR(
    new DNSAnswer("google.com", "INTERNET", 123,
    new RR.NAPTR({
        order: 25565,
        priority: 101,
        flags: "flag123#",
        service: "service123#",
        regex: "",
        replacement: "google.com",
    }))
);

empty.addAnswerRR(
    new DNSAnswer("google.com", "INTERNET", 123,
    new RR.CAA({
        IssuerCritical: true,
        tag: "issuewild",
        value: "test",
    }))
);

empty.addAnswerRR(
    new DNSAnswer("google.com", "INTERNET", 123,
    new RR.CERT({
        type: "ACPKIX",
        keyTag: 140,
        algorithm: "RSA/SHA-1 NSEC3",
        certificate: "MIICYzCCAcygAwIBAgIBADANBgkqhkiG9w0BAQUFADAuMQswCQYDVQQGEwJVUzEMMAoGA1UEChMDSUJNMREwDwYDVQQLEwhMb2NhbCBDQTAeFw05OTEyMjIwNTAwMDBaFw0wMDEyMjMwNDU5NTlaMC4xCzAJBgNVBAYTAlVTMQwwCgYDVQQKEwNJQk0xETAPBgNVBAsTCExvY2FsIENBMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD2bZEo7xGaX2/0GHkrNFZvlxBou9v1Jmt/PDiTMPve8r9FeJAQ0QdvFST/0JPQYD20rH0bimdDLgNdNynmyRoS2S/IInfpmf69iyc2G0TPyRvmHIiOZbdCd+YBHQi1adkj17NDcWj6S14tVurFX73zx0sNoMS79q3tuXKrDsxeuwIDAQABo4GQMIGNMEsGCVUdDwGG+EIBDQQ+EzxHZW5lcmF0ZWQgYnkgdGhlIFNlY3VyZVdheSBTZWN1cml0eSBTZXJ2ZXIgZm9yIE9TLzM5MCAoUkFDRikwDgYDVR0PAQH/BAQDAgAGMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFJ3+ocRyCTJw067dLSwr/nalx6YMMA0GCSqGSIb3DQEBBQUAA4GBAMaQzt+zaj1GU77yzlr8iiMBXgdQrwsZZWJo5exnAucJAEYQZmOfyLiMD6oYq+ZnfvM0n8G/Y79q8nhwvuxpYOnRSAXFp6xSkrIOeZtJMY1h00LKp/JX3Ng1svZ2agE126JHsQ0bhzN5TKsYfbwfTwfjdWAGy6Vf1nYi/rO+ryMO",
    }))
);


console.log(JSON.stringify(empty.printPacket(), null, 4));
console.log(empty.encode().toString("hex"));

let decodedEmpty = new DNSPacket();
decodedEmpty.fromHexStream(empty.encode().toString("hex"));
console.log(JSON.stringify(decodedEmpty.printPacket(), null, 4));