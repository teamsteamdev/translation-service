const createReplaceTerms = function (terms) {
  return (string) => {
    // console.log(`Reducing terms on "${string.slice(0, 40)}..."`)
    return terms.reduce((string, term) => {
      let {find, replace} = term
      let pattern = '\\b' + find + '\\b'
      let regex = new RegExp(pattern, 'ig')

      return string.replace(regex, replace)
    }, string)
      .replace(/(\d:)\s\s?(\d)/g, '$1$2')
      .replace(/\u2014/g, '\u2013')
      .replace(/\bya\b/g, 'y a')
  }
}

module.exports = {createReplaceTerms}
