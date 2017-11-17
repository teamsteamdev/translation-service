// const fs = require('fs')
const googleTranslateApi = require('google-translate-api')
const getVocab = require('../replace/get-vocab')
// const googleTranslateApi = require('./../gta-hack/google-translation-api.js')

let translateParagraph = async (paragraph) => {
  try {
    const replaceTerms = await getVocab()
    const translated = await googleTranslateApi(paragraph, { to: 'es' })
    const replaced = replaceTerms(translated.text)
      .replace(/(\d:)\s\s?(\d)/g, '$1$2')
      .replace(/\u2014/g, '\u2013')
      .replace(/\bya\b/g, 'y a')

    // console.log(`No problem with this paragraph, it's ${paragraph.length} characters long.`)
    return replaced
  } catch (err) {
    console.log(`There was a problem with this paragraph.`)
    console.log(`It is ${paragraph.length} characters long.`)
    console.log(`"${paragraph.slice(0, 100)}"\n`)
    console.error(err)
  }
}

let validString = string => {
  return typeof string === 'string' && string !== ''
}

let cleanString = string => {
  return string.replace(/yy|hh/g, '').trim()
}

let translate = (paragraphs) => {
  if (paragraphs.constructor !== Array) {
    return Promise.reject('Data is not an array')
  }

  let transformed = paragraphs.filter(validString)
    .map(cleanString)
    .map(translateParagraph)

  return Promise.all(transformed)
    .catch((err) => {
      err.message = `"${err.code}" from google-translate-api`
      throw err
    })
}

module.exports = { translate }
