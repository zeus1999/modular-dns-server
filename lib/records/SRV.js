class SRVRecord {

    decode = function(consumer){

        let priority = consumer.short();
        let weight = consumer.short();
        let port = consumer.short();
        let target = consumer.name();
        return { priority: priority, weight: weight, port: port, target: target };
    }

}

module.exports = SRVRecord;