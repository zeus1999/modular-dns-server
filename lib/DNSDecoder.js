var Utilities = require("./Utilities");
var RRClass = require("./RRClass");
var RRTypes = require("./RRTypes");
var Error = require("./Error");
var DNSQuestion = require("./DNSQuestion");
var StreamRunner = require("./StreamRunner");

var Record = require("./record");


function splitBody(hexStream, qdcount, ancount, nscount, arcount){


        let ofStream = hexStream;
    
        let output = {
            qd: [],
            an: [],
            ns: [],
            ar: []
        };
    
        let h = Buffer.from(hexStream, "hex");
        let consumer = new StreamRunner(h);


        //repeat for each question
        for(let i = 0; i < qdcount; i++){
            let _tmpQuestion = new DNSQuestion();
            _tmpQuestion.setName(consumer.name());
            _tmpQuestion.setTypeByDec(consumer.short());
            _tmpQuestion.setClassByDec(consumer.short());
            output.qd.push(_tmpQuestion);
        }
        
        //consumer.seek(0);

        //repeat for each an
        for(let i = 0; i < ancount; i++){
            output.an.push(create());
        }

        //repeat for each ns
        for(let i = 0; i < nscount; i++){
            output.ns.push(create());
        }

        //repeat for each ar
        for(let i = 0; i < arcount; i++){
            //output.ar.push(create());
        }

        return output;
    
    

    function create(){
        let _tmpAnswer = {};
        _tmpAnswer.name = consumer.name();
        _tmpAnswer.type = RRTypes.number2String(consumer.short(), false);

        //check if OPT
        if(_tmpAnswer.type !== "OPT"){
            _tmpAnswer.class = RRClass.number2String(consumer.short(), false);
            _tmpAnswer.ttl = consumer.long();
            _tmpAnswer.size = consumer.short();
        }

        
        _tmpAnswer.data = new Record[_tmpAnswer.type]().decode(consumer, _tmpAnswer.size);

        return _tmpAnswer;
    }

    
}

    
module.exports = splitBody;