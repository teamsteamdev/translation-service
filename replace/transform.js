const flatten = require('array-flatten')

// const {digits} = require('./../utils/regex')
const {reduceToWords, reduceToVerses} = require('./../utils/reduce')
// const {isNotAllCapsLine, isNotFootnoteLine} = require('./../utils/line')
// const {removeChapterTitles, removeFootnoteMarkers} = require('./../utils/remove')
//
// const getLines = (text) => {
//   return text.split(/\n/g)
//                   .filter(isNotAllCapsLine)
//                   .filter(isNotFootnoteLine)
//                   .map(removeChapterTitles)
// }
//
// const getVerses = (text) => {
//   return text.split(digits.ol)
//              .reduce(reduceToVerses, [])
// }
//
const getWordSet = (textArray) => {
  let words = textArray.reduce(reduceToWords, [])
                  // .map(removeFootnoteMarkers)

  return new Set(flatten(words))
}
//
// const getNonWords = (wordSet, conc) => {
//   return Array.from(wordSet)
//               .filter(word => !conc.has(word))
// }
//
module.exports = {getWordSet}
