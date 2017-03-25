/* eslint-env mocha */
const expect = require('expect')
const googleTranslateApi = require('google-translate-api')

const {translate} = require('./translate')
const {createReplaceTerms} = require('./create-replace-terms')

const {en, terms} = require('./../test-seed/seed.json')

describe('google-translate-api', () => {
  it('should translate a string', (done) => {
    var string = 'Hello world'
    googleTranslateApi(string, {to: 'es'}).then((res) => {
      expect(res.text).toExist('there should be a text property')
      expect(res.text).toBe('Hola Mundo')
      done()
    }).catch((err) => done(err))
  })
})

describe('translate()', () => {
  let enText = [
    'In this case, it will have the corrections delimited with brackets.',
    'The language in which the text should be translated.'
  ]

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

  it('should clean up translation input', () => {
    var dirtyArray = [
      '',
      'yyGroup Discussion: What was John’s clearly stated purpose in writing his Gospel?',
      '',
      'hhHe wrote so we would believe and have eternal life (John 20: 31).'
    ]

    return translate(dirtyArray).then((array) => {
      expect(array.length).toBe(2)
      expect(array[0]).toExclude('yy')
      expect(array[1]).toExclude('hh')
        .toInclude('20:31', `should fix ch:vv in "...${array[1].slice(-20)}"`)
    })
  })

  it('should replace the provided terms', () => {
    return translate(en, terms).then((strings) => {
      for (let string of strings) {
        for (let {find} of terms) {
          expect(string).toNotContain(find, `translate() did not replace ${find}`)
        }
      }
    })
  })
})

describe('createReplaceTerms()', () => {
  it('should return a function', () => {
    let replaceTerms = createReplaceTerms(terms)
    expect(replaceTerms).toBeA(Function)
  })
  // TODO: Add tests for replaceTerms()
})
