const collections = require('./utils/collections');
const util = require('./utils/util');

var AIs = new util.collections()

AIs.set("test", new util.network_num("test"))

console.log(AIs.get("test").network.run([0, 1, 1])[0].toFixed(0))