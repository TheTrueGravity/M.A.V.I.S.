var mavis_utils = require('mavis-utils')

var command_network = new mavis_utils.network_str('get_command');

var server = new mavis_utils.mavis_local_clients.communication_server(6767, (packet) => {
    var packet_type = packet.packet
    if (packet_type.startsWith('test_')) return {packet: `${packet_type} recieved!`}
    else if (packet_type == 'get_command') { 
        console.log(packet.data.speech); 
        return {
            packet: `${packet_type} recieved!`,
            data: {
                command: command_network.resolve(command_network.network.run(packet.data.speech))
            }
        };
    }
    else return {packet: `Unknown packet '${packet_type}'!`}
})