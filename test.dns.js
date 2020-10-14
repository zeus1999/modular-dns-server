var assert = require("chai").assert;
var describe = require("mocha").describe;
var expect = require("chai").expect;

var DNSPacket = require("./lib/DNSPacket");

describe("RECORD HINFO", function() {

  let test = new DNSPacket("00178580000100010000000001610477696b690477696b6900000d0001c00c000d000100002a3000190c7465737463707531323334350b746573746f733132333435").printPacket();
  
  it("Check Header", function(){
    expect(test.Header.id).to.equal(23);
    expect(test.Header.flags.qr).to.equal(1);
    expect(test.Header.flags.opcode).to.equal("0000");
    expect(test.Header.flags.aa).to.equal("1");
    expect(test.Header.flags.tc).to.equal("0");
    expect(test.Header.flags.rd).to.equal("1");
    expect(test.Header.flags.ra).to.equal("1");
    expect(test.Header.flags.z).to.equal("000");
    expect(test.Header.flags.rcode).to.equal("0000");
  });

  it("Count of Sections", function(){
    expect(test.Questions.length).to.equal(test.Header.qdcount);
    expect(test.Answers.length).to.equal(test.Header.ancount + test.Header.nscount + test.Header.arcount);
  });

  it("Question", function(){
    expect(test.Questions[0].type).to.equal("HINFO");
    expect(test.Questions[0].name).to.equal("a.wiki.wiki");
    expect(test.Questions[0].class).to.equal("INTERNET");
  });

  it("Answer", function(){
    expect(test.Answers[0].name).to.equal("a.wiki.wiki");
    expect(test.Answers[0].type).to.equal("HINFO");
    expect(test.Answers[0].class).to.equal("INTERNET");
    expect(test.Answers[0].ttl).to.equal(10800);
    expect(test.Answers[0].size).to.equal(25);
    expect(test.Answers[0].data.os).to.equal("testos12345");
    expect(test.Answers[0].data.cpu).to.equal("testcpu12345");
  });

});

describe("RECORD SRV", function() {

  let test = new DNSPacket("001b810000010003000000000a5f6d696e656372616674045f7463700c6772696566657267616d6573036e65740000210001c00c002100010000003c00100001000163dd0762756e67656532c01cc00c002100010000003c00100001000163dd0762756e67656531c01cc00c002100010000003c00100001000163dd0762756e67656533c01c").printPacket();
  
  it("Check Header", function(){
    expect(test.Header.id).to.equal(27);
    expect(test.Header.flags.qr).to.equal(1);
    expect(test.Header.flags.opcode).to.equal("0000");
    expect(test.Header.flags.aa).to.equal("0");
    expect(test.Header.flags.tc).to.equal("0");
    expect(test.Header.flags.rd).to.equal("1");
    expect(test.Header.flags.ra).to.equal("0");
    expect(test.Header.flags.z).to.equal("000");
    expect(test.Header.flags.rcode).to.equal("0000");
  });

  it("Count of Sections", function(){
    expect(test.Questions.length).to.equal(test.Header.qdcount);
    expect(test.Answers.length).to.equal(test.Header.ancount + test.Header.nscount + test.Header.arcount);
  });

  it("Question", function(){
    expect(test.Questions[0].type).to.equal("SRV");
    expect(test.Questions[0].name).to.equal("_minecraft._tcp.griefergames.net");
    expect(test.Questions[0].class).to.equal("INTERNET");
  });

  it("Answer", function(){
    expect(test.Answers[0].name).to.equal("_minecraft._tcp.griefergames.net");
    expect(test.Answers[0].type).to.equal("SRV");
    expect(test.Answers[0].class).to.equal("INTERNET");
    expect(test.Answers[0].ttl).to.equal(60);
    expect(test.Answers[0].size).to.equal(16);
    expect(test.Answers[0].data.priority).to.equal(1);
    expect(test.Answers[0].data.weight).to.equal(1);
    expect(test.Answers[0].data.port).to.equal(25565);
    expect(test.Answers[0].data.target).to.equal("bungee2.griefergames.net");
  });

});

describe("RECORD SOA", function() {

  let test = new DNSPacket("003e810000010001000000000a67756162612d6a756e670264650000060001c00c000600010000003c00510b6e732d636c6f75642d61310d676f6f676c65646f6d61696e7303636f6d0014636c6f75642d646e732d686f73746d617374657206676f6f676c65c045000000010000546000000e100003f4800000012c").printPacket();
  
  it("Check Header", function(){
    expect(test.Header.id).to.equal(62);
    expect(test.Header.flags.qr).to.equal(1);
    expect(test.Header.flags.opcode).to.equal("0000");
    expect(test.Header.flags.aa).to.equal("0");
    expect(test.Header.flags.tc).to.equal("0");
    expect(test.Header.flags.rd).to.equal("1");
    expect(test.Header.flags.ra).to.equal("0");
    expect(test.Header.flags.z).to.equal("000");
    expect(test.Header.flags.rcode).to.equal("0000");
  });

  it("Count of Sections", function(){
    expect(test.Questions.length).to.equal(test.Header.qdcount);
    expect(test.Answers.length).to.equal(test.Header.ancount + test.Header.nscount + test.Header.arcount);
  });

  it("Question", function(){
    expect(test.Questions[0].type).to.equal("SOA");
    expect(test.Questions[0].name).to.equal("guaba-jung.de");
    expect(test.Questions[0].class).to.equal("INTERNET");
  });

  it("Answer", function(){
    expect(test.Answers[0].name).to.equal("guaba-jung.de");
    expect(test.Answers[0].type).to.equal("SOA");
    expect(test.Answers[0].class).to.equal("INTERNET");
    expect(test.Answers[0].ttl).to.equal(60);
    expect(test.Answers[0].size).to.equal(81);
    expect(test.Answers[0].data.primaryNS).to.equal("ns-cloud-a1.googledomains.com");
    expect(test.Answers[0].data.hostmaster).to.equal("cloud-dns-hostmaster.google.com");
    expect(test.Answers[0].data.serial).to.equal(1);
    expect(test.Answers[0].data.refresh).to.equal(21600);
    expect(test.Answers[0].data.retry).to.equal(3600);
    expect(test.Answers[0].data.expire).to.equal(259200);
    expect(test.Answers[0].data.minttl).to.equal(300);
  });

});

describe("RECORD A", function() {

  let test = new DNSPacket("f38781000002000800000000057269766572046461746102656103636f6d0000010001057269766572046461746102656103636f6d0000010004c00c000100010000003c0004341794b3c00c000100010000003c000403d8d3ccc00c000100010000003c000422c2089dc00c000100010000003c00043437b4acc00c000100010000003c000422e6d3bec00c000100010000003c0004342cc440c00c000100010000003c000422e115d5c00c000100010000003c000403de2d33").printPacket();
  

  it("Check Header", function(){
    expect(test.Header.id).to.equal(62343);
    expect(test.Header.flags.qr).to.equal(1);
    expect(test.Header.flags.opcode).to.equal("0000");
    expect(test.Header.flags.aa).to.equal("0");
    expect(test.Header.flags.tc).to.equal("0");
    expect(test.Header.flags.rd).to.equal("1");
    expect(test.Header.flags.ra).to.equal("0");
    expect(test.Header.flags.z).to.equal("000");
    expect(test.Header.flags.rcode).to.equal("0000");
  });

  it("Count of Sections", function(){
    expect(test.Questions.length).to.equal(test.Header.qdcount);
    expect(test.Answers.length).to.equal(test.Header.ancount + test.Header.nscount + test.Header.arcount);
  });

  it("Question", function(){
    expect(test.Questions[0].type).to.equal("A");
    expect(test.Questions[0].name).to.equal("river.data.ea.com");
    expect(test.Questions[0].class).to.equal("INTERNET");

    expect(test.Questions[1].type).to.equal("A");
    expect(test.Questions[1].name).to.equal("river.data.ea.com");
    expect(test.Questions[1].class).to.equal("HESIOD");
  });

  it("Answer", function(){
    expect(test.Answers[0].name).to.equal("river.data.ea.com");
    expect(test.Answers[0].type).to.equal("A");
    expect(test.Answers[0].class).to.equal("INTERNET");
    expect(test.Answers[0].ttl).to.equal(60);
    expect(test.Answers[0].size).to.equal(4);
    expect(test.Answers[0].data).to.equal("52.23.148.179");
  });

});

describe("RECORD AAAA", function() {

  let test = new DNSPacket("00038100000100010000000006676f6f676c6502646500001c0001c00c001c00010000003c00102a0014504001081a0000000000002003").printPacket();
  
  it("Check Header", function(){
    expect(test.Header.id).to.equal(3);
    expect(test.Header.flags.qr).to.equal(1);
    expect(test.Header.flags.opcode).to.equal("0000");
    expect(test.Header.flags.aa).to.equal("0");
    expect(test.Header.flags.tc).to.equal("0");
    expect(test.Header.flags.rd).to.equal("1");
    expect(test.Header.flags.ra).to.equal("0");
    expect(test.Header.flags.z).to.equal("000");
    expect(test.Header.flags.rcode).to.equal("0000");
  });

  it("Count of Sections", function(){
    expect(test.Questions.length).to.equal(test.Header.qdcount);
    expect(test.Answers.length).to.equal(test.Header.ancount + test.Header.nscount + test.Header.arcount);
  });

  it("Question", function(){
    expect(test.Questions[0].type).to.equal("AAAA");
    expect(test.Questions[0].name).to.equal("google.de");
    expect(test.Questions[0].class).to.equal("INTERNET");
  });

  it("Answer", function(){
    expect(test.Answers[0].name).to.equal("google.de");
    expect(test.Answers[0].type).to.equal("AAAA");
    expect(test.Answers[0].class).to.equal("INTERNET");
    expect(test.Answers[0].ttl).to.equal(60);
    expect(test.Answers[0].size).to.equal(16);
    expect(test.Answers[0].data).to.equal("2a00:1450:4001:81a:0:0");
  });

});


describe("RECORD CNAME", function() {

  let test = new DNSPacket("004481000001000100000000037777770b6a756e672d746f626961730264650000050001c00c000500010000003c0002c010").printPacket();
  
  it("Check Header", function(){
    expect(test.Header.id).to.equal(68);
    expect(test.Header.flags.qr).to.equal(1);
    expect(test.Header.flags.opcode).to.equal("0000");
    expect(test.Header.flags.aa).to.equal("0");
    expect(test.Header.flags.tc).to.equal("0");
    expect(test.Header.flags.rd).to.equal("1");
    expect(test.Header.flags.ra).to.equal("0");
    expect(test.Header.flags.z).to.equal("000");
    expect(test.Header.flags.rcode).to.equal("0000");
  });

  it("Count of Sections", function(){
    expect(test.Questions.length).to.equal(test.Header.qdcount);
    expect(test.Answers.length).to.equal(test.Header.ancount + test.Header.nscount + test.Header.arcount);
  });

  it("Question", function(){
    expect(test.Questions[0].type).to.equal("CNAME");
    expect(test.Questions[0].name).to.equal("www.jung-tobias.de");
    expect(test.Questions[0].class).to.equal("INTERNET");
  });

  it("Answer", function(){
    expect(test.Answers[0].name).to.equal("www.jung-tobias.de");
    expect(test.Answers[0].type).to.equal("CNAME");
    expect(test.Answers[0].class).to.equal("INTERNET");
    expect(test.Answers[0].ttl).to.equal(60);
    expect(test.Answers[0].size).to.equal(2);
    expect(test.Answers[0].data).to.equal("jung-tobias.de");
  });

});



describe("RECORD NS", function() {

  let test = new DNSPacket("004681000001000400000000037777770b6a756e672d746f626961730264650000020001c00c000200010000003c001f0b6e732d636c6f75642d64330d676f6f676c65646f6d61696e7303636f6d00c00c000200010000003c000e0b6e732d636c6f75642d6431c03cc00c000200010000003c000e0b6e732d636c6f75642d6434c03cc00c000200010000003c000e0b6e732d636c6f75642d6432c03c").printPacket();
  
  it("Check Header", function(){
    expect(test.Header.id).to.equal(70);
    expect(test.Header.flags.qr).to.equal(1);
    expect(test.Header.flags.opcode).to.equal("0000");
    expect(test.Header.flags.aa).to.equal("0");
    expect(test.Header.flags.tc).to.equal("0");
    expect(test.Header.flags.rd).to.equal("1");
    expect(test.Header.flags.ra).to.equal("0");
    expect(test.Header.flags.z).to.equal("000");
    expect(test.Header.flags.rcode).to.equal("0000");
  });

  it("Count of Sections", function(){
    expect(test.Questions.length).to.equal(test.Header.qdcount);
    expect(test.Answers.length).to.equal(test.Header.ancount + test.Header.nscount + test.Header.arcount);
  });

  it("Question", function(){
    expect(test.Questions[0].type).to.equal("NS");
    expect(test.Questions[0].name).to.equal("www.jung-tobias.de");
    expect(test.Questions[0].class).to.equal("INTERNET");
  });

  it("Answer", function(){
    expect(test.Answers[0].name).to.equal("www.jung-tobias.de");
    expect(test.Answers[0].type).to.equal("NS");
    expect(test.Answers[0].class).to.equal("INTERNET");
    expect(test.Answers[0].ttl).to.equal(60);
    expect(test.Answers[0].size).to.equal(31);
    expect(test.Answers[0].data).to.equal("ns-cloud-d3.googledomains.com");
    expect(test.Answers[1].data).to.equal("ns-cloud-d1.googledomains.com");
    expect(test.Answers[2].data).to.equal("ns-cloud-d4.googledomains.com");
    expect(test.Answers[3].data).to.equal("ns-cloud-d2.googledomains.com");
  });

});
