class ISDNRecord {

    decode = function(consumer){

        let isdnAdressLength = consumer.byte();
        let isdnAdress = consumer.string("utf8", isdnAdressLength);
        let subadressLength = consumer.byte();
        let subadress = consumer.string("utf8", subadressLength);

        return { isdnAdress: isdnAdress, subadress: subadress };
    }

}

module.exports = ISDNRecord;