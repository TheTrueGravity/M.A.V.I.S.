module.exports = {
    name: "example",
    index: "example",
    direct: function(req, res) {
        res.writeHead(200)
        res.end('Hello, world!')
    }
}