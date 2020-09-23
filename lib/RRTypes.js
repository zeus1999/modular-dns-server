var Error = require("./Error");
var Utilities = require("./Utilities");

module.exports = {
    types: {
        "A": 1,
        "AAAA": 28,
    },
    number2String: function(number, isHex){

        if(!isHex){ var isHex = false; }


        if(isHex){
            number = Utilities.hex2Dec(number);
        }

        let changed = false;
        let output = "ERROR";

        for(let key in this.types){
            if(this.types[key] == number){
                output = key;
                changed = true;
            }
        }

        if(changed === false){
            new Error("C-001");
        }

        return output;

    },

    string2Number: function(string){

        let changed = false;
        let output = "ERROR";

        if(this.types[string]){
            output = this.types[string];
            changed = true;
        }

        if(changed === false){
            new Error("C-002");
        }

        return output;

    }
}