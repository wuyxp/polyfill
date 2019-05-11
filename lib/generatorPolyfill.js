const polyfillLibrary = require('polyfill-library')
module.exports = async (ctx, isMin) => {
  const { request, query } = ctx
  const { features } = query
  const { header } = request
  let fkey = []
  if (typeof features === 'string') {
    fkey.push(features)
  } else if (Array.isArray(features)) {
    fkey = [].concat(features)
  }
  let paramsFeatures = fkey.reduce((result, item) => {
    result[item] = {
      flags: ['gated']
    }
    return result
  }, {})
  // const uaString = 'Mozilla/4.0 (compatible; MSIE 5.0; Windows NT 6.1; Trident/4.0)'
  const uaString = header['user-agent']
  console.log('uaString----------------->')
  console.log(uaString)
  console.log('<-------------end uaString')
  console.log(paramsFeatures)
  const result = await polyfillLibrary.getPolyfillString({
    uaString: uaString,
    minify: isMin === 'min',
    features: paramsFeatures
  })
  fkey = []
  paramsFeatures = {}
  return result
}
