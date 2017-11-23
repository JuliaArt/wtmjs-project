const express = require('express')
const router = express.Router()

const PersonService = require('../services/person-service')
const TaskService = require('../services/task-service')

router.get('/', async(req,res,next) => {
    res.send(await TaskService.findAll())
})

router.get('/all', async(req,res,next) =>{
    const tasks = await TaskService.findAll()
    res.render('task-list', {tasks})
})

router.get('/:taskId', async(req, res, next) =>{
    const task = await TaskService.find(req.params.taskId)
    res.render('task-detail',{task})
})

router.post('/add', async(req, res, next) => {
    const task = await TaskService.add(req.body)
    const owner = await PersonService.findById(req.body.owner)
    owner.task.push(task);
    console.log(owner)
    owner.save();
    res.send(task)
})

/*
router.post('/assign/:id', async(req, res, next) => {
    const owner = await PersonService.find(req.params.id);
    let task = await TaskService.add({...req.body, owner});
    console.log(task)
    
     owner.tasks.addToSet(task)
     // task.owner.addToSet(person)
     // person.task.addToSet(task)
     await person.save()
     const updatedOwner = await owner.save();
     //const updatedTask = await task.save()
     res.send(task)
})
*/

router.delete('/:taskId', async(req, res, next) => {
    await TaskService.del(req.params.taskId)

    res.send('ok!')
})

module.exports = router