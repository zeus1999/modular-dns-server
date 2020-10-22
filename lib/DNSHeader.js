var Utilities = require("./Utilities");
var RRClass = require("./RRClass");
var Error = require("./Error");

const RRTypes = require("./RRTypes");

class DNSHeader {

        id= "";
        flags= {
            qr: "",
            opcode: "",
            aa: "",
            tc: "",
            rd: "",
            ra: "",
            z: "",
            rcode: ""
        };
        qdcount= "";
        ancount= "";
        nscount= "";
        arcount= "";


    constructor(){

        this.id = Utilities.randomNumber(1, 65535);
        this.flags.qr = 0;
        this.flags.opcode = 0;
        this.flags.aa = 0;
        this.flags.tc = 0;
        this.flags.rd = 0;
        this.flags.ra = 0;
        this.flags.z = "000";
        this.flags.rcode = 0;
        this.qdcount = 0;
        this.ancount = 0;
        this.nscount = 0;
        this.arcount = 0;

    }

    encode(){

        console.log("outgoing: " + this.id, Utilities.dec2Hex(this.id));
        let output = "";

        let oId = Utilities.hex2Buffer(Utilities.dec2Hex(this.id).padStart(4, 0));
        let oFlags = Utilities.dec2Bin(this.flags.qr) + "" +
                     this.flags.opcode.padStart(4, 0) + "" +
                     this.flags.aa.padStart(1, 0) + "" +
                     this.flags.tc.padStart(1, 0) + "" +
                     this.flags.rd.padStart(1, 0) + "" +
                     this.flags.ra.padStart(1, 0) + "" +
                     this.flags.z.padStart(1, 0) + "" +
                     this.flags.ad.padStart(1, 0) + "" +
                     this.flags.cd.padStart(1, 0) + "" +
                     this.flags.rcode.padStart(4, 0);
        
        oFlags = Utilities.hex2Buffer(Utilities.binStringToHexString(oFlags));

        let oQD = Utilities.hex2Buffer(Utilities.dec2Hex(this.qdcount).padStart(4, 0));
        let oAN = Utilities.hex2Buffer(Utilities.dec2Hex(this.ancount).padStart(4, 0));
        let oNS = Utilities.hex2Buffer(Utilities.dec2Hex(this.nscount).padStart(4, 0));
        let oAR = Utilities.hex2Buffer(Utilities.dec2Hex(0).padStart(4, 0));


        console.log(Buffer.concat([oId, oFlags, oQD, oAN, oNS, oAR]));
        return Buffer.concat([oId, oFlags, oQD, oAN, oNS, oAR]);
    }

    fromHexStream(hexStream){

        //fill id
        this.id = Utilities.hex2Dec(hexStream.slice(0, 4));
        console.log("incoming: " + this.id, hexStream.slice(0, 4));

        //explode flags
        let flags = this.decodeFlags(hexStream.slice(4, 8));

        //set flags
        this.flags.qr = flags.qr;
        this.flags.opcode = flags.opcode;
        this.flags.aa = flags.aa;
        this.flags.tc = flags.tc;
        this.flags.rd = flags.rd;
        this.flags.ra = flags.ra;
        this.flags.z = flags.z;
        this.flags.ad = flags.ad;
        this.flags.cd = flags.cd;
        this.flags.rcode = flags.rcode;

        //question count
        this.qdcount = Utilities.hex2Dec(hexStream.slice(8, 12));

        //answer rrs
        this.ancount = Utilities.hex2Dec(hexStream.slice(12, 16));

        //authority rrs
        this.nscount = Utilities.hex2Dec(hexStream.slice(16, 20));

        //additional rrs
        this.arcount = Utilities.hex2Dec(hexStream.slice(20, 24));

        return this.header;

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
            ad: 0,
            cd: 0,
            rcode: 0
        }

        if(hexStreamFlags.length !== 4){
            new Error("A-001");
        } else {

            let _flags = Utilities.hexStringToBinString(hexStreamFlags);

            flags.qr = Utilities.bin2Dec(_flags.slice(0, 1));
            flags.opcode = _flags.slice(1, 5);
            flags.aa = _flags.slice(5, 6);
            flags.tc = _flags.slice(6, 7);
            flags.rd = _flags.slice(7, 8);
            flags.ra = _flags.slice(8, 9);
            flags.z = _flags.slice(9, 10);
            flags.ad = _flags.slice(10, 11);
            flags.cd = _flags.slice(11, 10);
            flags.rcode = _flags.slice(12, 16);

            return flags;

        }

    }

}

module.exports = DNSHeader;