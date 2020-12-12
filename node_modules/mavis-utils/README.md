# Mavis Utils 

The Utilities Package For M.A.V.I.S.

This package uses 'Brain.js' and say, along with their requirements!

# Packages Included

# Collections

Description:

An Array Object Where You Get/Set Objects By A string.

#

3 functions:

set: Sets an object in the array, 

get: Gets an object in the array, 

remove: Removes an object in the array.

# network_num

Description:

A neural network that uses number arrays

( Takes in a network name, takes in training data [ optional ] )

#

2 functions:

run: Runs the neural network ( takes in an int array )

train: Trains the neural network ( takes in an int set of Brain.js training data )

# network_str

Description:

A neural network that uses string arrays

( Takes in a network name, takes in training data [ optional ] )

#

2 functions:

run: Runs the neural network ( takes in a string array )

train: Trains the neural network ( takes in a string set of Brain.js training data )

# speak

Description:

A script to speak what you input

#

1 function:

run: Speaks the input ( takes in a string )

# speech_rec

Description:

Takes in audio input from the microphone and translates it to text

#

To run, call the function:

```
var data = null;

utils.speech_rec((output) => {
    //run code you want here
    data = output
});
```