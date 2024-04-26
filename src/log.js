const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
require('dayjs/locale/zh-cn')

dayjs.locale('zh-cn')

/** 日志类型 */
const LOG_TYPE = {
  系统启动: '系统启动',
  系统关闭: '系统关闭',
  系统认证: '系统认证',
  客户端链接: '客户链接',
  客户端断开: '客户断开',
  客户端异常: '客户异常',
  客户端订阅: '订阅事件',
  客户端取消订阅: '取订事件',
  客户端发布: '发布事件'
}

/** 日志文件夹 */
const logPath = path.resolve(__dirname, '../logs')
/** 当前日志文件 */
const logFile = path.join(logPath, `mqtt_${dayjs().format('YYYY-MM-DD')}.log`)
/** 当前日志文件（websocket 协议） */
const logWsFile = path.join(
  logPath,
  `mqtt_ws_${dayjs().format('YYYY-MM-DD')}.log`
)

/**
 * 创建日志
 * @param {*} params 日志参数
 * @param {*} isWs 是否为 websocket 协议
 * @returns 无
 */
function createLog(params, isWs) {
  !fs.existsSync(logPath) && fs.mkdirSync(logPath)

  /**
   * 日志格式：[时间戳] [类型] <服务端 id | 客户端 id | 当前客户端链接数> 内容
   */
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const type = params.type || '未知类型'
  const brokerId = params.brokerId || null
  const clientId = params.clientId || null
  const clientCount = params.clientCount || 0
  const message = `[${time}] [${type}] <${brokerId} | ${clientId} | ${clientCount}> ${params.message}\n`

  process.env.NODE_ENV !== 'production' && console.log(message)

  fs.writeFileSync(isWs === true ? logWsFile : logFile, message, {
    encoding: 'utf-8',
    flag: 'a'
  })
}

module.exports = { LOG_TYPE, createLog }
