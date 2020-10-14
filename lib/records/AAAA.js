class AAAARecord {

    decode = function(consumer){
        return consumer.short().toString(16) + ":" + consumer.short().toString(16) + ":" + consumer.short().toString(16) + ":" + consumer.short().toString(16) + ":" + consumer.short().toString(16) + ":" + consumer.short().toString(16);
    }

}

module.exports = AAAARecord;