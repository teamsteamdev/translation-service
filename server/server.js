require('./config/config')

// const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')

const {translate} = require('./../translate/translate')
const {createVocab} = require('./../replace/create-vocab.js')

let app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

// CREATE new translation
app.post('/translate', (req, res) => {
  let en = req.body.en ? req.body.en : req.body

  translate(en).then(es => {
    res.send(es)
  }).catch((err) => {
    if (err.message) {
      res.status(500).send(err.message)
    } else {
      res.status(400).send(err)
    }
  })
})

app.post('/replace', (req, res) => {
  let es = req.body.es ? req.body.es : req.body
  createVocab().then(useVocab => {
    return es.map(useVocab)
  }).then(es => {
    res.send(es)
  }).catch((err) => {
    console.log(err)
    res.status(400).send(err)
  })
})

app.listen(port, () => {
  // console.log(`Started on port ${port}`)
})

module.exports = {app}
