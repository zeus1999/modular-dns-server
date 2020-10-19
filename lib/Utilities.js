module.exports = {
    binStringToHexString: function(a){

        let res = [];

        let _a = {
            "0000": "0",
            "0001": "1",
            "0010": "2",
            "0011": "3",
            "0100": "4",
            "0101": "5",
            "0110": "6",
            "0111": "7",
            "1000": "8",
            "1001": "9",
            "1010": "a",
            "1011": "b",
            "1100": "c",
            "1101": "d",
            "1110": "e",
            "1111": "f",
        }

        while(a.length % 4){
            a = "0" + a;
        }

        let splitted = a.match(/.{1,4}(?=(.{4})+(?!.))|.{1,4}$/g);

        for(let i = 0; i < splitted.length; i++){
            res.push(_a[splitted[i]]);
        }
        return res.join("");
    },

    hexStringToBinString: function(a){

        let res = [];

        let _a = {
            "0": "0000",
            "1": "0001",
            "2": "0010",
            "3": "0011",
            "4": "0100",
            "5": "0101",
            "6": "0110",
            "7": "0111",
            "8": "1000",
            "9": "1001",
            "a": "1010",
            "b": "1011",
            "c": "1100",
            "d": "1101",
            "e": "1110",
            "f": "1111",
        }

        let splitted = a.split("");

        for(let i = 0; i < splitted.length; i++){
            res.push(_a[splitted[i].toLowerCase()]);
        }
        return res.join("");
    },

    randomNumber: function(min, max){
        return Math.floor(Math.random() * (max - min) ) + min;
    },      

    qnameToDomain: function(qname){

        qname = Buffer.from(qname, "hex");
    
        var domain= "";
        for(var i = 0; i < qname.length; i++){
            if(qname[i] == 0){
                domain = domain.substring(0, domain.length - 1);
                break;
            }
            
            var tmpBuf = qname.slice(i+1, i+qname[i]+1);
            domain += tmpBuf.toString("binary", 0, tmpBuf.length);
            domain += ".";
            
            i = i + qname[i];
        }
        
        return domain;
    },

    domainToQname: function(domain){
        var tokens = domain.split(".");
        len = domain.length + 2;
        var qname = Buffer.allocUnsafe(len);
        var offset = 0;
        for(var i = 0; i < tokens.length; i++){
            qname[offset] = tokens[i].length;
            offset++;
            for(var j = 0; j < tokens[i].length; j++){
                qname[offset] = tokens[i].charCodeAt(j);
                offset++;
            }
        }
        qname[offset] = 0;
        
        return qname;
    },

    hex2Buffer: function(hexStream){
        return Buffer.from(hexStream, "hex");
    },

    bin2Dec: function(binStream){
        return parseInt(binStream, 2);
    },

    buffer2Hex: function(buf){
        return buf.toString("hex");
    },

    hex2Dec: function(hex){
        return parseInt(hex, 16);
    },

    dec2Hex: function(dec){
        return dec.toString(16);
    }
}