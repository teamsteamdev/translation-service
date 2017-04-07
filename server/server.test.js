/* eslint-env mocha */
const expect = require('expect')
const request = require('supertest')

const {app} = require('./server')
const data = require('./../test-seed/seed.en.json')
let xl = require('./../test-seed/xl.en.json')

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

  it('should translate an extra long string', () => {
    return request(app)
      .post('/translate')
      .send([xl])
      .expect(200)
      .then((res) => {
        expect(res.body).toExist()
      })
  })
})
