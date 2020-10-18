class MBRecord {

    decode = function(consumer){

        let mailbox = consumer.name();

        return mailbox;
    }

}

module.exports = MBRecord;