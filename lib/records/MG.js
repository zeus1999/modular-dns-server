class MGRecord {

    decode = function(consumer){

        let mailGroupMember = consumer.name();
        return mailGroupMember;
    }

}

module.exports = MGRecord;