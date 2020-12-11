const brain = require('brain.js');
const fs = require('fs');

module.exports = function (name, training_data=null) {
    this.name = name
    this.training_data = training_data
    this.network = new brain.NeuralNetwork();

    this.run = function (input) {
        return this.network.run(input);
    }

    this.train = function (training_data=null) {
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

    if(!is_trained && training_data) {
        this.train(training_data)
    }
}