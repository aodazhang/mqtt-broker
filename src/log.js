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

/**
 * 创建日志
 * @param {*} params 日志参数
 * @param {*} isWs 是否为 websocket 协议
 * @returns 无
 */
function createLog(params, isWs) {
  /**
   * 日志格式：[时间戳] [类型] <服务端 id | 客户端 id | 当前客户端链接数> 内容
   */
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  const type = params.type || '未知类型'
  const brokerId = params.brokerId || null
  const clientId = params.clientId || null
  const clientCount = params.clientCount || 0
  const message = `[${time}] [${type}] <${brokerId} | ${clientId} | ${clientCount}> ${params.message}\n`

  /**
   * 写入日志
   * - websocket 协议：mqtt_ws_YYYY-MM-DD.log
   * - mqtt 协议：mqtt_YYYY-MM-DD.log
   */
  !fs.existsSync(logPath) && fs.mkdirSync(logPath)
  if (isWs === true) {
    const logFile = path.join(
      logPath,
      `mqtt_ws_${dayjs().format('YYYY-MM-DD')}.log`
    )
    fs.writeFileSync(logFile, message, { encoding: 'utf-8', flag: 'a' })
  } else {
    const logFile = path.join(
      logPath,
      `mqtt_${dayjs().format('YYYY-MM-DD')}.log`
    )
    fs.writeFileSync(logFile, message, { encoding: 'utf-8', flag: 'a' })
  }

  /**
   * 打印日志
   */
  process.env.NODE_ENV !== 'production' && console.log(message)
}

module.exports = { LOG_TYPE, createLog }
