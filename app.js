const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('./database-connection')

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())
app.set('view engine', 'pug')

const person = require('./routes/person')
const task = require('./routes/task')

app.use('/person', person)
app.use('/task', task)

app.get('/', (req,res,next) => {
    res.render('index')
})

module.exports = app