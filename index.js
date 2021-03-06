var DNSAnswer = require("./lib/DNSAnswer");
var DNSServer = require("./lib/DNSServer");
var RR = require("./lib/record");


let server = new DNSServer();
server.listen({ port: 53, host: "0.0.0.0" }, function(message, remote){

    console.log(JSON.stringify(message, null, 4));
    message.logIncoming();

    message.addAnswerRR(
        new DNSAnswer("google.com", "INTERNET", 123,
        new RR.A("1.2.3.4"))
    );
    
    message.addAnswerRR(
        new DNSAnswer("google.com", "INTERNET", 123,
        new RR.DNAME("www.google.com"))
    );


    message.logOutgoing();
    
    server.answer(message, remote);

});