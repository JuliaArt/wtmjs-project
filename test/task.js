import test from 'ava'
import request from 'supertest'
import app from '../app'

test('Get list of tasks', async t => {
    const newTask = {name: 'Task#100', id:'2' }

    const creation = await request(app)
        .post('/task/add')
        .send(newTask)

    const res = await request(app)
        .get('/task')
    
        t.is(res.status, 200)
        t.true(Array.isArray(res.body), 'Body should be an array')
        t.true(res.body.length > 0)
});

test('Create new task', async t => {
    const newTask = {name: 'Task#100', id:'2' }

    const res = await request(app)
        .post('/task/add')
        .send(newTask)

    t.is(res.status, 200)
    t.is(res.body.name, newTask.name)
})

test('Fetch a task', async t => {
    t.plan(2)

    const task = (await request(app)
        .post('/task/add')
        .send({name: 'Task#100', id:'2'}))
        .body

    const fetch = await request(app)
        .get(`/task/${task.taskId}/json`)

    console.log("fetch.body "+ fetch.body)
    console.log("task "+ task)
    t.is(fetch.status, 200)
    t.deepEqual(fetch.body, task)
})

test('Delete a task', async t => {
    t.plan(3)

    const task = (await request(app)
        .post('/task/add')
        .send({name: 'Task#100', id:'2'}))
        .body

    const del = await request(app)
        .delete(`/task/${task.taskId}`)

    t.is(del.status, 200)
    t.is(del.text, 'ok!')

    const fetch = await request(app)
    .get(`/task/${task.taskId}/json`)

    t.is(fetch.status, 404)
})