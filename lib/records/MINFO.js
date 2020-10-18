class MINFORecord {

    decode = function(consumer){

        let responsibleMailbox = consumer.name();
        let errorMailbox = consumer.name();
        return { responsibleMailbox: responsibleMailbox, errorMailbox: errorMailbox };
    }

}

module.exports = MINFORecord;