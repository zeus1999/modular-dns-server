var Utilities = require("./Utilities");
var RRClass = require("./RRClass");
var Error = require("./Error");

const RRTypes = require("./RRTypes");

class DNSPacket {

    header = {
        id: "",
        flags: {
            qr: "",
            opcode: "",
            aa: "",
            tc: "",
            rd: "",
            ra: "",
            z: "",
            rcode: ""
        },
        qdcount: "",
        ancount: "",
        nscount: "",
        arcount: "",
    }

    questions = "";
    responses =  "";

    raw = {
        questions: "",
        answers: ""
    }

    constructor(hexStream){

        //fill id
        this.header.id = hexStream.slice(0, 4);

        //explode flags
        let flags = this.decodeFlags(hexStream.slice(4, 8));

        //set flags
        this.header.flags.qr = flags.qr;
        this.header.flags.opcode = flags.opcode;
        this.header.flags.aa = flags.aa;
        this.header.flags.tc = flags.tc;
        this.header.flags.rd = flags.rd;
        this.header.flags.ra = flags.ra;
        this.header.flags.z = flags.z;
        this.header.flags.rcode = flags.rcode;

        //question count
        this.header.qdcount = hexStream.slice(8, 12);

        //answer rrs
        this.header.ancount = hexStream.slice(12, 16);

        //authority rrs
        this.header.nscount = hexStream.slice(16, 20);

        //additional rrs
        this.header.arcount = hexStream.slice(20, 24);

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
        console.log(hexStreamResponses);
    }

    printPacket(){

        let _tmp = { header: this.header, questions: this.questions, responses: this.responses };
        let output = JSON.parse(JSON.stringify(_tmp));

        //convert qname to name
        for(let i = 0; i < output.questions.length; i++){
            output.questions[i].name = Utilities.qnameToDomain(output.questions[i].name);
            output.questions[i].class = RRClass.number2String(output.questions[i].class, true);
            output.questions[i].type = RRTypes.number2String(output.questions[i].type, true);
        }

        output.header.qdcount = Utilities.hex2Dec(output.header.qdcount);
        output.header.ancount = Utilities.hex2Dec(output.header.ancount);
        output.header.nscount = Utilities.hex2Dec(output.header.nscount);
        output.header.arcount = Utilities.hex2Dec(output.header.arcount);

        return output;

    }
}

module.exports = DNSPacket;