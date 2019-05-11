const generatorPolyfill = require('../lib/generatorPolyfill')
module.exports = [
  {
    method: 'get',
    ignoreActionName: true,
    action: async (ctx, next) => {
      const result = 'test'
      ctx.body = result
    }
  }
]
