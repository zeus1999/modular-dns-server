var Utilities = require("./Utilities");
var RRClass = require("./RRClass");
var Error = require("./Error");

const RRTypes = require("./RRTypes");

class DNSHeader {

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

    constructor(hexStream){

        //fill id
        this.header.id = Utilities.hex2Dec(hexStream.slice(0, 4));

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
        this.header.qdcount = Utilities.hex2Dec(hexStream.slice(8, 12));

        //answer rrs
        this.header.ancount = Utilities.hex2Dec(hexStream.slice(12, 16));

        //authority rrs
        this.header.nscount = Utilities.hex2Dec(hexStream.slice(16, 20));

        //additional rrs
        this.header.arcount = Utilities.hex2Dec(hexStream.slice(20, 24));

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
            flags.z = _flags.slice(9, 12);
            flags.rcode = _flags.slice(12, 16);

            return flags;

        }

    }

}

module.exports = DNSHeader;