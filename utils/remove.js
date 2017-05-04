const {punct} = require('./regex')
const {conc} = require('../conc')

const removeChapterTitles = (line) => {
  let split = line.split(/\d+/g).map(x => x.trim())
  let [a, b] = split

  if (a.length > 0 && split.length > 1 && isTitle(a, b)) {
    return line.replace(a, '').trim()
  } else {
    return line
  }

  function isTitle (a, b) {
    let test1 = !punct.allMarks.test(a.charAt(a.length - 1))
    let test2 = b.charAt(0) === b.charAt(0).toUpperCase()
    return test1 && test2
  }
}

const removeFootnoteMarkers = (string) => {
  if (conc.has(string)) {
    return string
  }

  let [word, mark] = string.split(punct.allMarks)

  if (!mark || mark.length <= 1) {
    return stripMark(word)
  } else {
    return [stripMark(word), stripMark(mark)]
  }
}

const stripMark = (word) => {
  if (conc.has(word)) {
    return word
  } else if (conc.has(word.slice(0, -1))) {
    return word.slice(0, -1)
  } else {
    return word
  }
}

module.exports = {removeChapterTitles, removeFootnoteMarkers}
