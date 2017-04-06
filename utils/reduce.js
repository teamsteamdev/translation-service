const {punct, digits} = require('./regex')

const reduceToWords = function (array, text) {
  let words = text.split(/\s/g)
                  .map(string => {
                    return string
                    .replace(/\d/g, '')
                    .replace(punct.firstAndLast, '')
                    .toLowerCase()
                  }).filter(string => string.length > 1)
  return array.concat(words)
}

// TODO: Reduce lines to { number, text }
// IDEA: Split into verses? /^\d+\s/m
const reduceToVerses = (verses, string, index, array) => {
  if (/^\d+$/.test(string.trim())) {
    let number = Number(string.trim())
    let text = array[index + 1].trim().replace(/\s+/g, ' ')
    verses.push({ number, text })
  }
  return verses
}

module.exports = { reduceToWords, reduceToVerses }
