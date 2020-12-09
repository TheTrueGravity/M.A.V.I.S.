const collections = require('./utils/collections');
const util = require('./utils/util');

const test = new util.network_num("test")
const get_command = new util.network_str("get_command");

var input = "Hello, who are you?"
    .replace('?', '')
    .replace('!', '')
    .replace('.', '')

var output = get_command.network.run(input)

console.log(get_command.resolve(output))