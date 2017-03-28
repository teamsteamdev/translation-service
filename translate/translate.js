const fs = require('fs')
const googleTranslateApi = require('google-translate-api')

const {createReplaceTerms} = require('./create-replace-terms')

const defaultTerms = [{'find': '', 'replace': ''}]

let translate = (paragraphs, terms = defaultTerms) => {
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
  }).then(results => {
    // TODO: Fix this so that it successfully replaces the terms
    // console.log(`Replace terms: "${terms.slice(0, 25)}..."`)
    if (terms) {
      let replaceTerms = createReplaceTerms(terms)
      return results.map(replaceTerms)
    }
    return results
  })
}

module.exports = {translate}
