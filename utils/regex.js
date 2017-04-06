const esMarks = `!¡?¿.,;:'"\\(\\)\\-`
const esLetters = `a-zA-ZÁÉÍÓÚáéíóúüñ`

const firstAndLast = new RegExp(`^([${esMarks}]+)|([${esMarks}]+)$`, 'gm')
const allMarks = new RegExp(`[\\-${esMarks}]`, 'g')
const allNoDash = new RegExp(`[${esMarks}]`, 'g')

const ol = new RegExp(`^(\\d{1,3})(?=\\s?[${esLetters}])`, 'gm')
// console.log(ol)

const footnote = /\d:(?!$)/

module.exports = {
  punct: {allMarks, allNoDash, firstAndLast},
  digits: {ol},
  footnote
}
