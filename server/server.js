require('./config/config')

// const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')

const {translate} = require('./../translate/translate')

let app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

// CREATE new translation
app.post('/', (req, res) => {
  let {en, terms} = req.body

  translate(en, terms).then(es => {
    res.send(es)
  }).catch((err) => {
    if (err.message) {
      res.status(500).send(err.message)
    } else {
      res.status(400).send(err)
    }
  })
})

app.listen(port, () => {
  // console.log(`Started on port ${port}`)
})

module.exports = {app}
