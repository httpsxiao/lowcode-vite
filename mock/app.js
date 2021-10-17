const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const componentList = require('./componentList')
const savePath = __dirname + '/save.json'

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router.get('/componentList', async ctx => {
  ctx.body = componentList
})

router.get('/getproject', async ctx => {
  const body = fs.readFileSync(savePath, {
    encoding: 'utf-8'
  })
  ctx.body = body
})

router.post('/saveproject', async ctx => {
  const body = ctx.request.body

  fs.writeFileSync(savePath, JSON.stringify(body), {
    JSON: true,
    encoding: 'utf-8'
  })

  ctx.body = {
    code: 200
  }
})

app.use(router.routes())

app.use(router.allowedMethods({ 
  // throw: true, // 抛出错误，代替设置响应头状态
  // notImplemented: () => '不支持当前请求所需要的功能',
  // methodNotAllowed: () => '不支持的请求方式'
}))

app.listen(4321)

console.log('start http://localhost:4321')
