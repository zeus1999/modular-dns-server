class SRVRecord {

    decode = function(consumer){

        let primaryNS = consumer.name();
        let hostmaster = consumer.name();
        let serial = consumer.long();
        let refresh = consumer.long();
        let retry = consumer.long();
        let expire = consumer.long();
        let minttl = consumer.long();
        return { primaryNS: primaryNS, hostmaster, hostmaster, serial: serial, refresh: refresh, retry: retry, expire: expire, minttl: minttl };
    }

}

module.exports = SRVRecord;