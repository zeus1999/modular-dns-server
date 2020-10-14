var Utilities = require("./Utilities");
var RRClass = require("./RRClass");
var Error = require("./Error");
var DNSHeader = require("./DNSHeader");
var DNSQuestion = require("./DNSQuestion");
var DNSSplitQueryAnswer = require("./DNSSplitQueryAnswer");

var RRTypes = require("./RRTypes");

class DNSPacket {

    
    packet =  {
        Header: {},
        Questions: [],
        Answers: []
    }

    constructor(hexStream){

        //seperate Header from Body
        let _header = hexStream.slice(0, 24);
        let _body = hexStream.slice(24);

        this.packet.Header = new DNSHeader(_header);
        
        let splitted = DNSSplitQueryAnswer(hexStream, this.packet.Header.qdcount, this.packet.Header.ancount, this.packet.Header.nscount, this.packet.Header.arcount);

        for(let i = 0; i < splitted.qd.length; i++){
            this.packet.Questions.push(splitted.qd[i]);
        }

        for(let i = 0; i < splitted.an.length; i++){
            this.packet.Answers.push(splitted.an[i]);
        }

        for(let i = 0; i < splitted.ns.length; i++){
            this.packet.Answers.push(splitted.ns[i]);
        }

        for(let i = 0; i < splitted.ar.length; i++){
            this.packet.Answers.push(splitted.ar[i]);
        }

       /*

        //decode question
        if(this.header.qr === "0"){
            this.raw.questions = hexStream.slice(24);
            this.questions = this.decodeQuestions(this.raw.questions);
        } else {

            if(Utilities.hex2Dec(this.header.ancount) + Utilities.hex2Dec(this.header.nscount) + Utilities.hex2Dec(this.header.arcount) === 0){
                this.raw.questions = hexStream.slice(24);
                this.questions = this.decodeQuestions(this.raw.questions);
            } else {
                let _firstOccurence = hexStream.indexOf("c00c");

                this.raw.questions = hexStream.slice(24, _firstOccurence);
                this.raw.responses = hexStream.slice(_firstOccurence);
    
                this.questions = this.decodeQuestions(this.raw.questions);

                //decode responses
                if(this.raw.responses.length > 0){
                    this.decodeResponses(this.raw.responses);
                }
            }

            
        }
        */

    }

    decodeFlags(hexStreamFlags){

        let flags = {
            qr: 0,
            opcode: 0,
            aa: 0,
            tc: 0,
            rd: 0,
            ra: 0,
            z: 0,
            rcode: 0
        }

        if(hexStreamFlags.length !== 4){
            new Error("A-001");
        } else {

            let _flags = Utilities.hexStringToBinString(hexStreamFlags);

            flags.qr = _flags.slice(0, 1);
            flags.opcode = _flags.slice(1, 5);
            flags.aa = _flags.slice(5, 6);
            flags.tc = _flags.slice(6, 7);
            flags.rd = _flags.slice(7, 8);
            flags.ra = _flags.slice(8, 9);
            flags.z = _flags.slice(9, 12);
            flags.rcode = _flags.slice(12, 16);

            return flags;

        }

    }

    decodeQuestions(hexStreamQuestions){

        let _qname = hexStreamQuestions.slice(0, -8);
        let _typeClass = hexStreamQuestions.slice(-8);
        let _type = _typeClass.slice(0, 4);
        let _class = _typeClass.slice(4, 8);

        return [{ name: _qname, type: _type, class: _class }];

    }

    decodeResponses(hexStreamResponses){
        //console.log(hexStreamResponses);
    }

    printPacket(){

        return this.packet;

    }
}

module.exports = DNSPacket;