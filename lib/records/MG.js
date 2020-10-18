class MGRecord {

    decode = function(consumer){

        let mailGroupMember = consumer.name();
        return { mailGroupMember: mailGroupMember };
    }

}

module.exports = MGRecord;