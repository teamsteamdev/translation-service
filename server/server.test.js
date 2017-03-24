/* eslint-env mocha */
const expect = require('expect')
const request = require('supertest')
const fs = require('fs')

const {app} = require('./server')
const data = require('./test-seed/seed.json')

describe('POST /', () => {
  it('should translate an array', (done) => {
    request(app)
      .post('/')
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeAn(Array)
        expect(res.body).toNotEqual(data)
        done()
      }).catch((err) => done(err))
  })
})
