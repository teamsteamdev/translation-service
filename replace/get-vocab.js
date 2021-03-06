const axios = require('axios')
const _ = require('lodash')

const vocab = require('./vocab.json')
// console.log(typeof vocab)

// const { getWordSet } = require('./transform')

const getVocab = async function () {
  // const url = 'https://script.google.com/macros/s/AKfycbxjAfGxZxXz9adg7dm8V6Bejv2ts3MPtjxYy7sMo1FzRLEUja7z/exec'

  // const response = await axios.get(url)
  try {
    const response = { data: vocab }

    // Populate Map with key:find & value:replace
    const terms = new Map()
    for (let { find, replace } of response.data) {
      const trimFind = find.trim().toLowerCase()
      const trimReplace = replace.trim()
      terms.set(trimFind, trimReplace)
    }

    const replaceTerms = (string) => {
      terms.forEach((replace, find) => {
        let loString = string.toLowerCase()
        for (let i = loString.indexOf(find); i > -1; i = loString.indexOf(find, i + find.length)) {
          let before = string.charAt(i - 1) || ' '
          let after = string.charAt(i + find.length) || ' '

          // Continue if found is not part of a larger word
          if (/\W/.test(before) && /\W/.test(after)) {
            const found = string.slice(i, i + find.length)

            if (found !== find) {
              // found is not exact
              switch (true) {
                case found === find.toLowerCase():
                  // found is locase
                  replace = replace.toLowerCase()
                  break
                case found === _.capitalize(find):
                  // found is capitalized
                  replace = _.capitalize(replace)
                  break
                case found === find.toUpperCase():
                  // found is all caps
                  replace = replace.toUpperCase()
                  break
                default:
                // caps are complex, no attempt to match case
              }
            }

            const start = string.slice(0, i)
            const end = string.slice(i + find.length)
            string = start + replace + end
            loString = string.toLowerCase()
          }
        }
      })

      return string
    }

    return replaceTerms
  } catch (e) {
    console.error(e)
  }
}

module.exports = getVocab
