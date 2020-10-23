var dgram = require("dgram");
var server = dgram.createSocket("udp4");

var DNSPacket = require("./DNSPacket");

class DNSServer {


    listen = function(options, cb){

        if(!options) options = {};
        
        server.on("message", function(msg, remote){

            let msgPacket = new DNSPacket();

            msgPacket.logIncoming = function(){
                console.log(`[INCOMING] ${this.packet.Header.id} ${this.packet.Questions[0].name} ${this.packet.Questions[0].class} ${this.packet.Questions[0].type} | Questions: ${this.packet.Questions.length}`);
            }

            msgPacket.logOutgoing = function(){
                console.log(`[OUTGOING] ${this.packet.Header.id} ${this.packet.Questions[0].name} | RRs: ${this.packet.AnswerRR.length} | Authority RRs: ${this.packet.AuthRR.length} | Additional RRs:${this.packet.AddRR.length}`);
            }

            msgPacket.fromHexStream(msg.toString("hex"));
            cb(msgPacket, remote, server);
            
        });

        server.bind(options.port || 53, options.host || "0.0.0.0");

    }

    answer = function(msg, remote){
        server.send(msg.encode(), remote.port, remote.address);
    }
    

}

module.exports = DNSServer;