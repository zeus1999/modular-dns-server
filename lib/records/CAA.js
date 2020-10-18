var Utilities = require("../Utilities");
class CAARecord {

    decode = function(consumer, dataSize){

        let flags = Utilities.hexStringToBinString(consumer.slice(1).toString("hex"));

        let IssuerCritical = false;
        if(flags[0] === "1"){
            IssuerCritical = true;
        }

        let tagLength = consumer.byte();
        let tag = consumer.string("utf8", tagLength);
        let value = consumer.string("utf8", dataSize - tagLength - 2);

        return { IssuerCritical: IssuerCritical, tag: tag, value: value };
    }

}

module.exports = CAARecord;