const Koa = require('koa')
const Router = require('koa-router')
const componentList = require('./componentList')

const app = new Koa()
const router = new Router()

router.get('/componentList', async ctx => {
  ctx.body = componentList
})

app.use(router.routes())


app.use(router.allowedMethods({ 
  // throw: true, // 抛出错误，代替设置响应头状态
  // notImplemented: () => '不支持当前请求所需要的功能',
  // methodNotAllowed: () => '不支持的请求方式'
}))

app.listen(4321)

console.log('start http://localhost:4321')
