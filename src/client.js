const mqtt = require('mqtt')

/**
 * 创建 mqtt 服务
 * - 开发：mqtt://localhost:8083
 * - 生产：mqtt://106.15.185.226:1883
 */
const client = mqtt.connect('mqtt://106.15.185.226:1883', {
  username: 'admin', // broker 用户名
  password: '123456', // broker 密码
  connectTimeout: 10 * 1000, // 连接超时：30-30s
  keepalive: 60, // 单次保持连接时长：0-禁用、60-60s
  reconnectPeriod: 10 * 1000 // 重连间隔：0-禁用、1000-1000ms
})

// [事件]首次、重新连接成功
client.on('connect', packet => {
  /**
   * packet：数据包
   */
  console.log('连接成功', {
    time: new Date().toLocaleString(),
    客户端id: client.options.clientId,
    是否连接服务端: client.connected,
    是否重连服务端: client.reconnecting,
    client,
    packet
  })

  /**
   * 订阅消息
   * @param topicObject 主题（可以是字符串、数组、对象）
   * @param opts 配置项
   * @param callback 回调函数
   * @returns 客户端 client
   */
  client.subscribe(
    ['msg1', 'msg2', 'msg3'],
    {
      qos: 0 // QoS 订阅级别：0-最多发一次、1-至少发一次、2-保证收一次（重要消息用 1 或 2）
    },
    (error, granted) => {
      /**
       * error：错误信息
       * granted：订阅结果 { topic, qos }[]
       */
      if (error) {
        console.log('订阅消息失败', {
          time: new Date().toLocaleString(),
          客户端id: client.options.clientId,
          是否连接服务端: client.connected,
          是否重连服务端: client.reconnecting,
          client,
          error,
          granted
        })
        return
      }
      console.log('订阅消息成功', {
        time: new Date().toLocaleString(),
        客户端id: client.options.clientId,
        是否连接服务端: client.connected,
        是否重连服务端: client.reconnecting,
        client,
        error,
        granted
      })
    }
  )
})

// [事件]重新连接中
client.on('reconnect', () => {
  console.log('重新连接中', {
    time: new Date().toLocaleString(),
    客户端id: client.options.clientId,
    是否连接服务端: client.connected,
    是否重连服务端: client.reconnecting,
    client
  })
})

// [事件]连接失败
client.on('error', error => {
  /**
   * error：错误信息
   */
  console.log('连接失败', {
    time: new Date().toLocaleString(),
    客户端id: client.options.clientId,
    是否连接服务端: client.connected,
    是否重连服务端: client.reconnecting,
    client,
    error
  })
})

// [事件]连接关闭
client.on('close', () => {
  console.log('连接关闭', {
    time: new Date().toLocaleString(),
    客户端id: client.options.clientId,
    是否连接服务端: client.connected,
    是否重连服务端: client.reconnecting,
    client
  })
})

// [事件]收到消息
client.on('message', (topic, payload, packet) => {
  /**
   * topic：消息主题
   * payload：消息内容二进制，需要转换字符串
   * packet：数据包
   */
  console.log('收到消息', {
    time: new Date().toLocaleString(),
    客户端id: client.options.clientId,
    是否连接服务端: client.connected,
    是否重连服务端: client.reconnecting,
    client,
    topic,
    payload: payload.toString(),
    packet
  })
})

setInterval(() => {
  /**
   * 发布消息
   * @param topic 主题
   * @param message 消息内容（可以是二进制）
   * @param opts 配置项
   * @param callback 回调函数
   * @returns 客户端 client
   */
  client.publish(
    'msg1',
    'hello mqtt',
    {
      qos: 0 // QoS 订阅级别：0-最多发一次、1-至少发一次、2-保证收一次（重要消息用 1 或 2）
    },
    (error, packet) => {
      /**
       * error：错误信息
       * packet：数据包
       */
      if (error) {
        console.log('发布消息失败', {
          time: new Date().toLocaleString(),
          客户端id: client.options.clientId,
          是否连接服务端: client.connected,
          是否重连服务端: client.reconnecting,
          client,
          error,
          packet
        })
        return
      }
      console.log('发布消息成功', {
        time: new Date().toLocaleString(),
        客户端id: client.options.clientId,
        是否连接服务端: client.connected,
        是否重连服务端: client.reconnecting,
        client,
        error,
        packet
      })
    }
  )
}, 20 * 1000)
