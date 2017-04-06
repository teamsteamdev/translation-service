/* eslint-env mocha */
const expect = require('expect')
const googleTranslateApi = require('google-translate-api')

const {translate} = require('./translate')

// const {en} = require('./../test-seed/seed.en.json')
// const {es} = require('./../test-seed/seed.es.json')

describe('google-translate-api', () => {
  it('should still work', () => {
    var string = 'Hello world'
    return googleTranslateApi(string, {to: 'es'}).then((res) => {
      expect(res.text).toExist('there should be a text property')
      expect(res.text).toBe('Hola Mundo', 'should translate to spanish')
    })
  })
})

describe('translate()', () => {
  let enText = [
    'In this case, it will have the corrections delimited with brackets.',
    'The language in which the text should be translated.'
  ]

  it('should translate an array of strings', () => {
    return translate(enText).then((array) => {
      expect(array).toBeAn(Array, 'should be an Array')
        .toNotEqual(enText, 'should be different than input')
      expect(array.length).toEqual(2, 'should be the same length as input')
      for (let element of array) {
        expect(element).toBeA('string', `should be an array of strings: ${array}`)
      }
    })
  })

  it('should reject a non-array value', () => {
    return translate('not an array').catch((err) => {
      expect(err).toExist()
    })
  })

  it('should not translate non-string values', () => {
    return translate(['string', {key: 'value'}]).catch((err) => {
      expect(err).toExist()
    })
  })

  it('should clean up translation input', () => {
    var dirtyArray = [
      '',
      'yyGroup Discussion: What was John’s clearly stated purpose in writing his Gospel?',
      '',
      'hhHe wrote so we would believe and have eternal life (John 20: 31).',
      '\u2014\u2014'
    ]

    return translate(dirtyArray).then((array) => {
      expect(array.length).toBe(3)
      expect(array[0]).toExclude('yy')
      expect(array[1]).toExclude('hh')
        .toInclude('20:31', `should fix ch:vv in "...${array[1].slice(-20)}"`)
      expect(array[2]).toExclude('\u2014\u2014').toInclude('\u2013\u2013')
    })
  })
})
