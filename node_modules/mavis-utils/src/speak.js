const say = require('say');

module.exports = {
    run: function(text_to_speak) {
        say.speak(text_to_speak)
    }
}