const googleTranslateApi = require('google-translate-api')

let translate = (paragraphs) => {
  if (paragraphs.constructor !== Array) {
    return Promise.reject('Data is not an array')
  }

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
  })
}

module.exports = {translate}
