var Utilities = require("../Utilities");
class AFSDBRecord {

    decode = function(consumer, dataSize){

        let subtype = consumer.short();
        let hostname = consumer.name();

        return { subtype: subtype, hostname: hostname };
    }

}

module.exports = AFSDBRecord;