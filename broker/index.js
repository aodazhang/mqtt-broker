/**
 * @description mqtt 服务
 */
const Aedes = require('aedes')
const factory = require('aedes-server-factory')
const { createLog, LOG_TYPE } = require('./log')

// 实例化 aedes 对象
const aedes = new Aedes()
// 创建 tcp 服务
const server = factory.createServer(aedes)
// 启动 mqtt 服务
server.listen(1883, () => {
  createLog({
    type: LOG_TYPE.系统启动,
    brokerId: aedes.id,
    clientCount: aedes.connectedClients,
    message: '服务端已启动 mqtt://localhost:1883'
  })
})

aedes.authenticate = (client, username, password, callback) => {
  // 校验客户端是否合法
  const result = username === 'admin' && password.toString() === '123456'
  createLog({
    type: LOG_TYPE.系统认证,
    brokerId: aedes.id,
    clientId: client?.id,
    clientCount: aedes.connectedClients,
    message: result
  })
  if (!result) {
    const error = new Error('客户端认证失败')
    error.returnCode = 4
    callback(error, null)
    return
  }
  callback(null, true)
}

aedes.on('closed', () => {
  createLog({
    type: LOG_TYPE.系统关闭,
    brokerId: aedes.id,
    clientCount: aedes.connectedClients,
    message: '服务端已关闭'
  })
})

aedes.on('client', client => {
  createLog({
    type: LOG_TYPE.客户端链接,
    brokerId: aedes.id,
    clientId: client?.id,
    clientCount: aedes.connectedClients,
    message: '客户端已链接'
  })
})

aedes.on('clientDisconnect', client => {
  createLog({
    type: LOG_TYPE.客户端断开,
    brokerId: aedes.id,
    clientId: client?.id,
    clientCount: aedes.connectedClients,
    message: '客户端已断开'
  })
})

aedes.on('clientError', (client, error) => {
  createLog({
    type: LOG_TYPE.客户端异常,
    brokerId: aedes.id,
    clientId: client?.id,
    clientCount: aedes.connectedClients,
    message: `${error?.message} \n ${error?.stack}`
  })
})

aedes.on('publish', (packet, client) => {
  const { topic, payload } = packet
  const log = {
    brokerId: aedes.id,
    clientId: client?.id,
    clientCount: aedes.connectedClients
  }
  if (typeof topic !== 'string') {
    createLog({
      ...log,
      type: null,
      message: `未知发布事件 ${payload}`
    })
  } else if (topic.indexOf('/new/subscribes') > -1) {
    createLog({
      ...log,
      type: LOG_TYPE.客户端订阅,
      message: `客户端订阅事件 ${payload}`
    })
  } else if (topic.indexOf('/new/unsubscribes') > -1) {
    createLog({
      ...log,
      type: LOG_TYPE.客户端取消订阅,
      message: `客户端取消订阅事件 ${payload}`
    })
  } else if (client?.id) {
    createLog({
      ...log,
      type: LOG_TYPE.客户端发布,
      message: `客户端发布事件 ${topic} >>> ${payload}`
    })
  }
})
