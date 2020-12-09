const brain = require('brain.js');
const fs = require('fs');

module.exports = function (name, training_data=null) {
    this.name = name
    this.training_data = training_data
    this.network = new brain.recurrent.LSTM();

    this.train = function (training_data=null) {
        var data = []
        if (training_data) {
            data = training_data
        } else {
            const d = require('./net-data/training-data.json')
            if(d[this.name]) {
                data = d[this.name]
            } else {
                return console.error(new Error("No training data was provided!"))
            }
        }
        console.log("Achieved training data!")
        console.log('Training...');

        const start_time = new Date();

        this.network.train(data)

        const finished_time = new Date();

        const dif_in_time = (finished_time - start_time) / 1000

        console.log(`Finished training in ${dif_in_time} seconds!`)

        var trained_network = require('./net-data/trained_network.json');
        trained_network[this.name] = {}
        trained_network[this.name] = this.network.toJSON();
        fs.writeFileSync('./src/utils/net-data/trained_network.json', JSON.stringify(trained_network));
    }
    
    this.resolve = function (net_output) {
        var network_output = net_output.split(/ +/)
        var return_out = []
        for (var output of network_output) {
            if (output == "null") {
                return_out[return_out.length] = null
            } else if (output == "true") {
                return_out[return_out.length] = true
            } else if (output == "false") {
                return_out[return_out.length] = false
            } else {
                return_out[return_out.length] = output
            }
        }
        return return_out
    }

    var trained_network = require('./net-data/trained_network.json');
    var is_trained = false

    if(trained_network[this.name]) {
        this.network.fromJSON(trained_network[this.name])
        console.log("Loaded network from cached data!")
    } else {
        if(training_data) {
            this.train(training_data)
            is_trained = true
        } else {
            this.train()
        }
    }

    if(!is_trained && this.training_data) {
        this.train(training_data)
    }
}