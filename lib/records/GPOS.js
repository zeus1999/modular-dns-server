class GPOSRecord {

    decode = function(consumer){

        let longitudeLength = consumer.byte();
        let longitude = consumer.string("utf8", longitudeLength);

        let latitudeLength = consumer.byte();
        let latitude = consumer.string("utf8", latitudeLength);

        let altitudeLength = consumer.byte();
        let altitude = consumer.string("utf8", altitudeLength);

        return { latitude: latitude, longitude: longitude, altitude: altitude };
    }

}

module.exports = GPOSRecord;