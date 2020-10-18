class X25Record {

    decode = function(consumer){

        let length = consumer.byte();
        let psdnAddress = consumer.string("utf8", length);
        return psdnAddress;
    }

}

module.exports = X25Record;