const express = require('express')
const router = express.Router()

const PersonService = require('../services/person-service')
const TaskService = require('../services/task-service')

router.get('/', async(req, res, next) => {
    res.send(await PersonService.findAll())
})

router.get('/all', async(req,res,next) =>{
    const people = await PersonService.findAll()
    res.render('person-list', {people})
})

router.get('/:id', async(req,res,next) => {
    const person = await PersonService.find(req.params.id)
    res.render('person-detail', {person})
})

router.post('/', async(req, res, next) => {
    const person = await PersonService.add(req.body)
    res.send(person)
})

router.delete('/:id', async(req,res,next) => {
    await PersonService.del(req.params.id)
   // await PersonService.delete(req.params.id)
    res.send('ok!')
})

router.get('/:id/taskslist', async(req,res,next) => {
    const person = await PersonService.find(req.params.id)
    const tasks = await TasksService.find(req.params.id)
    res.send('task-detail', {task});
})

router.post('/:id/taskslist', async(req, res,next) => {
    const task = await TaskService.find(req.body.taskId)
    const target = await PersonService.find(req.params.Id)


    console.log('TASK :: ', task, ' - - ', req.body)
    task.owner.addToSet(target)
    target.task.addToSet(task)

    await target.save()
    const updatedPerson = await person.save()

    res.send(updatedPerson)
})
module.exports = router