const utils = require('mavis-utils');
const http = require('http');

module.exports = function(port, hostname) {
    this.port = port
    this.hostname = hostname

    this.web_pages = new utils.collections();

    this.addpage = function(page_name, page_file) {
        if (page_name && page_file) {
            this.web_pages.set(page_name, page_file)
        }
    };

    this.server = http.createServer((req, res) => {
        var path = req.url.split('/')
        if (path[0] == '') path.shift();
        if (path[path.length - 1] == '') path.pop();
        var page = this.web_pages.get(path[0])
        if(page) {
            page.direct(req, res)
        } else {
            res.writeHead(404)
            res.end('Error grabbing page!')
        }
    });

    this.server.listen(port, hostname, null, () => {
        console.log(`Server started at http://192.168.0.128:8080/`)
    });
}