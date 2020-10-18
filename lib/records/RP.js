class RPRecord {

    decode = function(consumer){

        let mailbox = consumer.name();
        let txtRR = consumer.name();
        return { mailbox: mailbox, txtRR: txtRR };
    }

}

module.exports = RPRecord;