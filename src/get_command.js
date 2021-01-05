var commands = {
    about_me: {
        base_words: [ 'who', 'are', 'you' ],
        define_words: null,
        type: 'question',
        emotion: null,
        needs_extra_data: false
    },
    meaning_of_life: {
        base_words: [ 'what', 'is', 'the' ],
        define_words: [ 'meaning', 'of', 'life' ],
        type: 'question',
        emotion: 'questional',
        needs_extra_data: false
    },
    google: {
        base_words: [ 'google' ],
        define_words: null,
        type: 'question',
        emotion: null,
        needs_extra_data: true
    },
    calculate_add: {
        base_words: [ 'add' ],
        define_words: null,
        type: 'question',
        emotion: null,
        needs_extra_data: true
    },
    calculate_subtract: {
        base_words: [ 'subtract' ],
        define_words: null,
        type: 'question',
        emotion: null,
        needs_extra_data: true
    },
    calculate_multiply: {
        base_words: [ 'multiply' ],
        define_words: null,
        type: 'question',
        emotion: null,
        needs_extra_data: true
    },
    calculate_devide: {
        base_words: [ 'devide' ],
        define_words: null,
        type: 'question',
        emotion: null,
        needs_extra_data: true
    },
    time_now: {
        base_words: [ 'what', 'is', 'the' ],
        define_words: [ 'time' ],
        type: 'question',
        emotion: null,
        needs_extra_data: false
    }
}

var get_command = (input) => {
    input = input.toString().toLowerCase()
    var _command, type, emotion, needs_extra_data = null;

    var complete_matches = {}
    var define_matches = {}

    var complete_matches_count = {}
    var define_matches_count = {}
    
    for (var command in commands) {
        var base_words = commands[command].base_words
        var define_words = commands[command].define_words

        //check if there are base words in the dictionary
        if (!base_words) return console.error(new Error("Error with getting the command!"));

        //check for matching base words
        var base_words_match = {}
        for (var base_word of base_words) {
            base_words_match[base_word] = input.includes(base_word)
        }
        
        //check for matching define words
        if(define_words) {
            var define_words_match = {}
            for (var define_word of define_words) {
                define_words_match[define_word] = input.includes(define_word)
            }
        } else var define_words_match = null

        //check for a complete match
        var complete_var_counter = 0;
        var complete_match_counter = 0;
        for (var base_word_match in base_words_match) {
            if (!base_words_match[base_word_match]) { complete_matches[command] = false; break; }
            complete_matches[command] = true;
        }

        //check for a defining match
        var define_var_counter = 0;
        var define_match_counter = 0;
        for (var define_word_match in define_words_match) {
            if (!define_words_match[define_word_match]) { define_matches[command] = false; break; }
            define_matches[command] = true;
        }

        //check for a count of complete matches
        var complete_var_counter = 0;
        var complete_match_counter = 0;
        for (var base_word_match in base_words_match) {
            complete_var_counter++;
            if (base_words_match[base_word_match]) complete_match_counter++;
        }

        var define_var_counter = 0;
        var define_match_counter = 0;
        if (define_words) {
            //check for a count of defining matches
            for (var define_word_match in define_words_match) {
                define_var_counter++;
                if (define_words_match[define_word_match]) define_match_counter++;            
            }
        }

        var complete_match_percentage = ((complete_match_counter/complete_var_counter)*100).toFixed()
        var define_match_percentage = ((define_match_counter/define_var_counter)*100).toFixed()

        complete_matches_count[command] = parseInt(complete_match_percentage);
        define_matches_count[command] = parseInt(define_match_percentage);
    }
    
    //check for 1 complete match as the command
    var has_match = undefined
    for (var complete_match in complete_matches){
        if (complete_matches[complete_match]) {
            if (has_match) {
                has_match = undefined
                break;
            } else {
                has_match = complete_match;
            }
        }
    }

    //check if there is a match
    if (has_match) {
        _command = has_match
    }

    if (!has_match) {
        for (var com_match_count in complete_matches_count) {
            if (complete_matches_count[com_match_count] >= 50) {
                if (define_matches_count[com_match_count] == NaN) _command = com_match_count
                else if (define_matches_count[com_match_count] >= 50) _command = com_match_count
            }
        }
    }

    //generate command if there is one
    if (_command) {
        var command_data = commands[_command]
        type = command_data.type
        emotion = command_data.emotion
        needs_extra_data = command_data.needs_extra_data
    } else {
        return(new Error("Error producing the command! No command found!"))
    }

    var output = [_command, type, emotion, needs_extra_data]
    return (output)
}

module.exports = get_command