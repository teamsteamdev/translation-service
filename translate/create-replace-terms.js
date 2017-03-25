const createReplaceTerms = function (terms) {
  return (string) => {
    // console.log(`Reducing terms on "${string.slice(0, 40)}..."`)
    return terms.reduce((string, term) => {
      let {find, replace} = term
      let pattern = '\\b' + find + '\\b'
      let regex = new RegExp(pattern, 'ig')
      let replaced = string.replace(regex, replace)
      // TODO: Remove spaces in ch:vv
      // TODO: Make sure it's doing its job
      return replaced
    }, string).replace(/(\d:)\s\s?(\d)/g, '$1$2')
  }
}

module.exports = {createReplaceTerms}
