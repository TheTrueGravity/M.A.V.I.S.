const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const util = require('./utils/util');

const test = new util.network_num("test")
const get_command = new util.network_str("get_command");

var input = readline.prompt().toString()
    .replace('?', '')
    .replace('!', '')
    .replace('.', '')