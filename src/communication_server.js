var mavis_utils = require('mavis-utils')

var server = new mavis_utils.mavis_local_clients.communication_server(6767, (packet) => {
    var packet_type = packet.packet
    if (packet_type.startsWith('test_')) return {packet: `${packet_type} recieved!`}
    else if(packet_type == "generate_new_key") {
        console.log("New key...")
        var user_key = mavis_utils.mavis_local_clients.make_key(packet["data"]["friendly_name"])
        return {
            packet: `${packet_type} recieved!`,
            data: user_key
        }
    }
    else return {packet: `Unknown packet '${packet_type}'!`}
})