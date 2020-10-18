class RTRecord {

    decode = function(consumer){

        let preference = consumer.short();
        let intermediateHostname = consumer.name();

        return { preference: preference, intermediateHostname: intermediateHostname };
    }

}

module.exports = RTRecord;