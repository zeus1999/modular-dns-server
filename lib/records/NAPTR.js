class NAPTRRecord {

    decode = function(consumer){

        let order = consumer.short();
        let priority = consumer.short();
        let flagsLength = consumer.byte();
        let flags = consumer.string("utf8", flagsLength);
        let serviceLength = consumer.byte();
        let service = consumer.string("utf8", serviceLength);
        let regexLength = consumer.byte();
        let regex = consumer.string("utf8", regexLength);
        let replacement = consumer.name();


        return { order: order, priority: priority, flags: flags, service: service, regex: regex, replacement: replacement };
    }

}

module.exports = NAPTRRecord;