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