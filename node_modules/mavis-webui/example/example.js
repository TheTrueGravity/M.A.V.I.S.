const mavis_webui = require('../index');
const page = require('./example_page')
var os = require('os');
var ifaces = os.networkInterfaces();

var hostname = null
var port = 8080

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

const server = new mavis_webui(port, hostname)
server.addpage(page.index, page)

console.log(`Goto http://${hostname}:${port}/example`);