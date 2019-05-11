const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const ROUTERS_PATH = './routers/'

function useRouter (customerRouters, controllerPath, prefix = '') {
  Object.keys(customerRouters).forEach(key => {
    let item = customerRouters[key]
    let method = item.method
    let action = item.action
    let uri = item.ignoreActionName ? `${prefix}` : `${prefix}/${action.name}`
    
    router[method](uri, async (ctx) => { 
      console.log(
        'make router succeed.',
        {
          'httpMethod': method,
          'routerPath': uri,
          'filePath': controllerPath,
          'actionName': action.name
        }
      )
      await action(ctx) 
    })
  })
}

function readAllRouterFileRecursive (routersPath = path.resolve(ROUTERS_PATH), prefix = '') {
  let list = fs.readdirSync(routersPath).filter(item => item !== 'index.js')

  list.forEach(item => {
    let resolvePath = routersPath + '/' + item
    let stat = fs.statSync(resolvePath)
    let isDir = stat.isDirectory()
    let isFile = stat.isFile()

    if (isDir) {
      readAllRouterFileRecursive(resolvePath, `${prefix}/${item}`)
    } else if (isFile) {
      useRouter(require(resolvePath), resolvePath, `${prefix}/${item}`)
    }
  })
}

readAllRouterFileRecursive()

module.exports = router
