const collections = require('./utils/collections');
const util = require('./utils/util');

const test = new util.network_num("test")
const get_command = new util.network_str("get_command");

console.log(get_command.network.run("Hello, what is the weather like today?"));