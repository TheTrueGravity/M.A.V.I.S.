const brain = require('brain.js');
const fs = require('fs')

module.exports = function (name, training_data=null) {
    this.name = name
    if(training_data) {
        train(training_data)
    }
    function train(training_data=null) {
        var data = []
        if (training_data) {
            data = training_data
        } else {
            const d = require('./net-data/training-data.json')
            if(d[this.name]) {
                data = d[this.name]
            } else {
                console.error(new Error("No training data was provided!"))
            }
        }
    }
}