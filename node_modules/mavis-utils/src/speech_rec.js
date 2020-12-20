const { spawn } = require('child_process');

module.exports = function(callback) {
    this.callback = callback
    this.python = spawn('python', ['python\\speech_rec.py']);
    setTimeout(() => {
        console.log("speak");
        this.python.stdout.on('data', (data) => {
            d = data.toString()
            this.callback(d)
        });
    }, 1000)
}