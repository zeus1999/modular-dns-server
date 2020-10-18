class CERTRRecord {

    types = {
        1: "PKIX",
        2: "SPKI",
        3: "PGP",
        4: "IPKIX",
        5: "ISPKI",
        6: "IPGP",
        7: "ACPKIX",
        8: "IACPKIX",
        253: "URI",
        254: "OID",
    }

    algorithms = {
        1: "RSA/MD5",
        2: "Diffie-Hellman",
        3: "DSA/SHA-1",
        4: "Elliptic Curve",
        5: "RSA/SHA-1",
        6: "DSA/SHA-1 NSEC3",
        7: "RSA/SHA-1 NSEC3",
        252: "Indirect",
        253: "Private",
        254: "Private",
    }

    decode = function(consumer, size){

        let type = consumer.short();
        let keyTag = consumer.short();
        let algorithm = consumer.byte();
        let certificate = consumer.string("base64", size - 5);

        if(this.types[type]){
            type = this.types[type];
        } else {
            type = "UNKNOWN";
        }

        if(this.algorithms[algorithm]){
            algorithm = this.algorithms[algorithm];
        } else {
            algorithm = "UNKNOWN";
        }

        return { type: type, keyTag: keyTag, algorithm: algorithm, certificate: certificate };
    }

}

module.exports = CERTRRecord;