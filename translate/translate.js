const googleTranslateApi = require('google-translate-api')

let translate = (paragraphs, terms) => {
  if (paragraphs.constructor !== Array) {
    return Promise.reject('Data is not an array')
  }

  const replaceTerms = createReplaceTerms(terms)

  let transformed = paragraphs.map((string) => {
    if (typeof string === 'string') {
      return string.trim().replace(/yy|hh/g, '')
    } else {
      return string
    }
  }).filter((string) => string !== '')

  return Promise.all(transformed.map(paragraph => {
    if (typeof paragraph !== 'string') {
      return Promise.reject('This paragraph is not a string')
    }

    return googleTranslateApi(paragraph, {to: 'es'})
  })).then(results => {
    return results.map(result => result.text)
  }).then(results => {
    if (terms) {
      let replaceTerms = createReplaceTerms(terms)
      return results.map(replaceTerms)
    }
    return results
  })
}

function createReplaceTerms (terms) {
  return (string) => {
    return terms.reduce((string, term) => {
      let {find, replace} = term
      let pattern = '\b' + find + '\b'
      let regex = new RegExp(pattern, 'ig')

      return string.replace(regex, replace)
    }, string)
  }
}

module.exports = {translate}
