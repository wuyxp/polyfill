const Koa = require('koa')
const app = new Koa()
const port = process.env.PORT || 3344

app.use(require('koa-bodyparser')())

const router = require('./routers/index.js')

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
