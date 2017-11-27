/* eslint-env mocha */
const expect = require('expect')
const request = require('supertest')

const {app} = require('./server')
const data = require('./../test-seed/seed.en.json')
const list = require('./../test-seed/list-seed.es')
const frequentEn = require('./../test-seed/samples.en')
const frequentEs = require('./../test-seed/samples.es')
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

  it('should replace terms in translation', () => {
    return request(app)
      .post('/translate')
      .send(frequentEn)
      .expect(200)
      .then((res) => {
        expect(res.body[2]).toExclude('Discusión grupal')
        expect(res.body[2]).toInclude('Discusión de grupo')
        expect(res.body[3]).toExclude('Distribuya la Hoja de trabajo')
        expect(res.body[3]).toInclude('Reparta la Hoja de ejercicios')
      })
      // .then((res) => done())
  })

  it('should replace terms in spanish', () => {
    return request(app)
      .post('/replace')
      .send(frequentEs)
      .expect(200)
      .then((res) => {
        expect(res.body[2]).toExclude('Discusión grupal')
        expect(res.body[2]).toInclude('Discusión de grupo')
        expect(res.body[3]).toExclude('Distribuya la Hoja de trabajo')
        expect(res.body[3]).toInclude('Reparta la Hoja de ejercicios')
      })
  })

  it('should replace every word in the list', () => {
    return request(app)
    .post('/replace')
    .send(list)
    .expect(200)
    .then((res) => {
      res.body.forEach((r) => {
        expect(list).toExclude(r)
      })
    })
  })
})
