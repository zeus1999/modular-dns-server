var DNSPacket = require("./lib/DNSPacket");


//let myPacket = new DNSPacket("00038100000100010000000006676f6f676c6502646500001c0001c00c001c00010000003c00102a0014504001081a0000000000002003");
//let myPacket = new DNSPacket("00178580000100010000000001610477696b690477696b6900000d0001c00c000d000100002a3000190c7465737463707531323334350b746573746f733132333435");
//let myPacket = new DNSPacket("f38781000002000800000000057269766572046461746102656103636f6d0000010001057269766572046461746102656103636f6d0000010004c00c000100010000003c0004341794b3c00c000100010000003c000403d8d3ccc00c000100010000003c000422c2089dc00c000100010000003c00043437b4acc00c000100010000003c000422e6d3bec00c000100010000003c0004342cc440c00c000100010000003c000422e115d5c00c000100010000003c000403de2d33");
let myPacket = new DNSPacket("39b1858000010001000000010477696b690477696b690000090001c00c0009000100002a30000704696e666fc00c0000290500000000000000");

//console.log(myPacket.printPacket());
console.log(JSON.stringify(myPacket.printPacket(), null, 4));




let b = require("./lib/Utilities");