var Error = require("./Error");

module.exports = {
    types: {
        "A": 1,
        "AAAA": 28,
    },
    number2String: function(number){

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