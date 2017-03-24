/* eslint-env mocha */
const expect = require('expect')
const {translate} = require('./translate')

const {en, terms} = require('./../test-seed/seed.json')

describe('translate()', () => {
  let enText = [
    'In this case, it will have the corrections delimited with brackets.',
    'The language in which the text should be translated.'
  ]

  it('should return a promise', () => {
    let res = translate(enText)
    expect(res).toBeA(Promise, 'translate() should return a pending Promise')
  })

  it('should translate an array of strings', (done) => {
    translate(enText).then((array) => {
      expect(array).toBeAn(Array, 'should be an Array')
      expect(array.length).toBe(2, 'should be the same length as input')
      expect(array).toNotEqual(enText, 'should be different than input')
      array.forEach((element, index, array) => {
        expect(element).toBeA('string', `should be an array of strings: ${array}`)
      })
      done()
    }, err => done(err))
  })

  it('should reject a non-array value', (done) => {
    translate('not an array').catch((err) => {
      expect(err).toExist()
      done()
    })
  })

  it('should not translate non-string values', (done) => {
    translate(['string', {key: 'value'}]).catch((err) => {
      expect(err).toExist()
      done()
    })
  })

  it('should clean up translation input', (done) => {
    var dirtyArray = [
      '',
      'yyGroup Discussion: What was John’s clearly stated purpose in writing his Gospel?',
      '',
      'hhHe wrote so we would believe and have eternal life (John 20:31).'
    ]

    translate(dirtyArray).then((array) => {
      expect(array.length).toBe(2)
      expect(array[0]).toExclude('yy')
      expect(array[1]).toExclude('hh')
      done()
    }).catch((err) => done(err))
  })

  it('should replace the provided terms', (done) => {
    translate(en, terms).then((array) => {
      array.forEach((string) => {
        terms.forEach((term) => {
          let {find} = term

          expect(string).toNotContain(find, 'translate() should replace terms.find')
        })
      })
      done()
    }).catch((err) => done(err))
  })
})
