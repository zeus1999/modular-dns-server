var DNSPacket = require("./lib/DNSPacket");
var DNSQuestion = require("./lib/DNSQuestion");
var DNSAnswer = require("./lib/DNSAnswer");
var DNSHeader = require("./lib/DNSHeader");
var DNSServer = require("./lib/DNSServer");
var RR = require("./lib/record");


let server = new DNSServer();
server.listen({ port: 53, host: "192.168.178.30" }, function(message, remote, srv){

    message.addAnswerRR(
        new DNSAnswer("google.com", "INTERNET", 123,
        new RR.A("1.2.3.4"))
    );

    server.answer(message, remote);

});