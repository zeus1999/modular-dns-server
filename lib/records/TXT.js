class TXTRecord {

    decode = function(consumer){
        var txtLength = consumer.byte();
        return consumer.string("utf8", txtLength);
    }

}

module.exports = TXTRecord;