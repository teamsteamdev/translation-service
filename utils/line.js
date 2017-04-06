const {reduceToWords} = require('./reduce')
const {punct, digits, footnote} = require('./regex')

const isNotAllCapsLine = line => line !== line.toUpperCase()

const isNotFootnoteLine = line => !footnote.test(line)

module.exports = {isNotAllCapsLine, isNotFootnoteLine}
