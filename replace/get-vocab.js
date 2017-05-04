const axios = require('axios')
const {getWordSet} = require('./transform')

const getVocab = function () {
  const url = 'https://script.google.com/macros/s/AKfycbxjAfGxZxXz9adg7dm8V6Bejv2ts3MPtjxYy7sMo1FzRLEUja7z/exec'

  return new Promise(function (resolve, reject) {
    axios.get(url)
         .then((response) => {
           let terms = new Map()

           for (let {find, replace} of response.data) {
             terms.set(find, replace)
           }

          //  console.log(`Number of terms in Map: ${terms.size}`)
          //  console.log(`Number of terms in Array: ${response.data.length}`)

           resolve((string) => {
             let wordSet = getWordSet([string])

             for (let word of wordSet) {
               if (terms.has(word)) {
                 let find = new RegExp(word, 'gi')
                 let replace = terms.get(word)

                //  console.log(`Replacing "${word}" with "${replace}" in\n"${string}"\n`)
                // TODO: refactor out the nested
                 string = string.replace(find, (match) => {
                   let first = match.charAt(0)
                   if (first === first.toUpperCase()) {
                     let first = replace.charAt(0).toUpperCase()
                     return first + replace.slice(1)
                   } else {
                     return replace
                   }
                 })
               }
             }

             return string
           })
         })
  })
}

module.exports = {getVocab}
