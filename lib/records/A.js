class ARecord {

    decode = function(consumer){
        return consumer.byte() + "." + consumer.byte() + "." + consumer.byte() + "." + consumer.byte();
    }

}

module.exports = ARecord;