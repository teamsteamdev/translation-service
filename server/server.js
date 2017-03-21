require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')

const {translate} = require('./../translate/translate')

let app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

// CREATE new translation
app.post('/', (req, res) => {
  let en = req.body.en

  translate(en).then(es => {
    res.send({en, es})
  }).catch((err) => {
    res.status(400).send(err)
  })
})

app.listen(port, () => {
  console.log(`Started on port ${port}`)
})

module.exports = {app}
