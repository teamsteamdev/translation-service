/* eslint-env mocha */
const expect = require('expect')
const request = require('supertest')

const {app} = require('./server')
const data = require('./../test-seed/seed.en.json')

describe('POST /', () => {
  it('should translate an array', () => {
    return request(app)
      .post('/translate')
      .send(data)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeAn(Array, 'res.body should be an Array')
        expect(res.body).toNotEqual(data.en, 'res.body should be different than the english')
      })
  })
})
