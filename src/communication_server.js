var mavis_utils = require('mavis-utils')
var _get_command = require('./get_command')

function get_command(command, msg) {
    if (command[0] == 'about_me') return {
        cmd: 'speak',
        data: 'I am mavis, your personal assistant!'
    }; else if (command[0] == 'meaning_of_life') return {
        cmd: 'speak',
        data: '42'        
    }; else if (command[0] == 'google') return {
        cmd: 'google',
        data: msg.toString().split('google ')[1]
    }; else if (command[0] == 'time_now') return {
        cmd: 'time_now'
    }
    else return [ 'Error with command! Command not recognised!']
}

var server = new mavis_utils.mavis_local_clients.communication_server(6767, (packet) => {
    var packet_type = packet.packet
    if (packet_type.startsWith('test_')) return {packet: `${packet_type} recieved!`}
    else if (packet_type == 'get_command') {
        var command = _get_command(packet.data.speech)
        return {
            packet: [`${packet_type} recieved!`],
            data: {
                command: command,
                answer: get_command(command, packet.data.speech)
            }
        };
    }
    else return {packet: `Unknown packet '${packet_type}'!`}
})