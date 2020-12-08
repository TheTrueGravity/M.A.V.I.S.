const brain = require('brain.js')

module.exports = function (name) {
    this.name = name
    this.test = function() {
        console.log(this.name)
    }
}