const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        default: true
    },
    // date: {
    //     type: Date,
    //     default: true
    // },
    duration: {
        type: Number,
        default: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }
})

TaskSchema.plugin(AutoIncrement, { inc_field: 'taskId'})

module.exports = mongoose.model('Task', TaskSchema)