const utils = require('mavis-utils');
const get_command = new utils.network_str("get_command");

utils.speech_rec((data) => {
    var output = get_command.resolve(get_command.network.run(data.replace(/(\r\n|\n|\r)/gm, "")));
    console.log(output)
    if (output[0] == 'about_me') {
        utils.speak.run('I am mavis. Multi Assistant Virtual Interface System')
    }
})