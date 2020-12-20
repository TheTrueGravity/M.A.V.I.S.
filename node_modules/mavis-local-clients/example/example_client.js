const request = require('request')
const encrypt = require('./encryption/encrypt')
const decrypt = require('./encryption/decrypt')

const user_json = {
    server_info: {
      hostname: '192.168.0.128',
      communication_port: 6767,
      verification_port: 10245
    },
    client_info: {
        friendly_name: 'charlie',
        key: 'Q9bLw2uM9jwmCMZ4ZxdiFsICHmyV8T8U'
    }
}

var encrypted_data = encrypt(user_json.client_info.key, {
    packet: "test1_packet"
})

const post_data = {
    client_name: user_json.client_info.friendly_name,
    data: encrypted_data
}

const req = request(`http://${user_json.server_info.hostname}:${user_json.server_info.communication_port}`, {
    method: 'POST',
    body: JSON.stringify(post_data)
}, (err, res, body) => {
    var data = JSON.parse(decrypt(user_json.client_info.key, body))
    console.log(data)
})