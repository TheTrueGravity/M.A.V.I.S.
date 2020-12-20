var keygen = require('keygenerator');
var keys = require('./keys.json');
var fs = require('fs');
var os = require('os');
var ifaces = os.networkInterfaces();

var hostname = null
var communication_port = 6767
var verification_port = 10245

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      hostname = iface.address
    } else {
      // this interface has only one ipv4 adress
      hostname = iface.address
    }
    ++alias;
  });
});

const pre_json = {
    "server_info": {
        "hostname": hostname,
        "communication_port": communication_port,
        "verification_port": verification_port
    }
}

const default_permisions = {
  admin: false,
  create_user: false,
  read_data: true,
  write_data:false
}

var create_json = function(friendlyname, permisions=default_permisions) {
    var json = {}
    var key = keygen._()
    json.server_info = pre_json.server_info
    json.client_info = {
        "friendly_name": friendlyname,
        "key": key
    }
    keys[friendlyname] = {
        key: key,
        permisions: permisions
    }
    fs.writeFileSync('./src/keys.json', JSON.stringify(keys))
    return json
}

module.exports = create_json