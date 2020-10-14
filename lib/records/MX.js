class MXRecord {

    decode = function(consumer){

        let priority = consumer.short();
        let exchange = consumer.name();
        return { priority: priority, exchange: exchange };
    }

}

module.exports = MXRecord;