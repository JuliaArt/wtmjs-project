const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const PersonSchema = mongoose.Schema({
    name: {
        type: String,
        default: true
    },
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

PersonSchema.plugin(AutoIncrement, { inc_field: 'id'})

module.exports = mongoose.model('Person', PersonSchema)
