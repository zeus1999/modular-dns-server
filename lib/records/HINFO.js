class HINFORecord {

    decode = function(consumer){

        let cpuLength = consumer.byte();
        let cpu = consumer.string("utf8", cpuLength);
        let osLength = consumer.byte();
        let os = consumer.string("utf8", osLength);
        return { os: os, cpu: cpu };
    }

}

module.exports = HINFORecord;