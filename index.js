const util = require('./utils/util');

var net = new util.network("test", [
    {"input": [0, 0, 1], "output": [0]},
    {"input": [0, 1, 0], "output": [0]},
    {"input": [1, 0, 1], "output": [1]},
    {"input": [1, 1, 0], "output": [1]},
])

console.log(net.network.run([1, 1, 1])[0].toFixed(0))