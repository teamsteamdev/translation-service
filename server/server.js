require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

let {mongoose} = require('./db/mongoose')
let {Todo} = require('./models/todo')
let {User} = require('./models/user')
let {authenticate} = require('./middleware/authenticate')

let app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
