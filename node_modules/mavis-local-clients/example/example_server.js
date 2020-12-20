var mavis_local_clients = require('../index')

var communication_server = new mavis_local_clients.communication_server(6767)

communication_server.packets.set('test1_packet', {packet: 'Test1 packet recieved!'});