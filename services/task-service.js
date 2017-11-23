const fs = require('fs')

const TaskModel = require('../models/task-model')

async function findAll() {
    return TaskModel.find()
}

async function add(task){
    return TaskModel.create(task)
}

async function del(taskId){
    return TaskModel.remove({taskId})
}

async function find(taskId){
    return TaskModel.findOne({taskId}).populate('owner')
}

module.exports = {
    findAll,
    find,
    add,
    del
}