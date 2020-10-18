class OPTRecord {

    decode = function(consumer){
        var udpPayloadSize = consumer.short();
        var higherBitsInRCODE = consumer.byte();
        var version = consumer.byte();
        var z = consumer.slice(2).toString("hex");
        var dataLength = consumer.short();
        return { udpPayloadSize: udpPayloadSize, higherBitsInRCODE: higherBitsInRCODE, version: version, z: z, dataLength: dataLength };
    }

}

module.exports = OPTRecord;