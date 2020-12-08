const say = require('say');

module.exports = {
    name: "speak",
    run: function(text_to_speak) {
        say.speak(text_to_speak)
    }
}