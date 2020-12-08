module.exports = function() {
    this.collection = []
    this.array_value_names = {}

    this.set = function(object, variable_to_set) {
        var obj = this.array_value_names[object] + 2
        if (obj) {
            obj = obj - 2
            this.array[obj] = variable_to_set
            return
        }
        const array_len = this.collection.length
        this.array_value_names[object] = array_len
        this.collection[array_len] = variable_to_set
    }

    this.get = function(object) {
        var obj_position = this.array_value_names[object] + 1
        if(!obj_position) return console.error('The object was not present in the array!');
        obj_position = obj_position-1
        var obj = this.collection[obj_position]
        if(!obj) return console.error('There was an error finding the object!');
        return obj
    }

    this.remove = function(object) {
        var obj_position = this.array_value_names[object] + 1
        if(!obj_position) return console.error('The object was not present in the array!');
        obj_position = obj_position-1
        var obj = this.collection[obj_position]
        if(!obj) return console.error('There was an error finding the object!');
        delete this.collection[obj_position]
        console.log(this.collection)
    }
}