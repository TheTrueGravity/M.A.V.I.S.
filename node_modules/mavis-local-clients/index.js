const collections = require('./src/collections');
const keys = require('./src/keys.json');
var users = []
for (var user in keys) {
    users[users.length] = user
}

module.exports = {
    communication_server: function (port=6767) {
        this.packets = new collections();
        this.packets.set('test_packet', {packet: 'Test packet recieved!'});
        this.packets.set('get_users', {packet: 'Get users packet recieved!', data: users});

        this.com_ser = require('./src/communication-server')((data) => {
            console.log(`Packet recieved! ${data.packet}`)
            for (var packet in this.packets.array_value_names) {
                if (data.packet == packet) {
                    return (this.packets.get(packet))
                }
            }
            return ({
                error: "Unknown packet!"
            })
        }, port)
    }
}