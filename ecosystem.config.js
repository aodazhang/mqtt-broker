/**
 * @description pm2 配置文件
 * @extends https://pm2.fenxianglu.cn/docs/general/configuration-file
 */

module.exports = {
  apps: [
    {
      // 1.公共
      name: 'mqtt-broker', // 进程名称
      script: './src/index.js', // 启动 js 脚本
      port: '1883', // 启动端口
      env: { NODE_ENV: 'production' }, // 环境变量

      // 2.集群
      exec_mode: 'cluster', // 启动进程模式：默认 fork
      instances: 1, // 启动进程实例数：32 位系统单个 node 进程在占内存 0.7G、64位系统单个 node 进程在占内存 1.4G，可以启动多个进程提高系统负载（0为pm2根据cpu状态启用的最大数量进程）
      source_map_support: true, // 启用源映射文件

      // 3.文件监控（变化后重启进程）
      watch: true, // true：启用监控、[]：启用监控的文件夹（注意重复 pm2 start ecosystem.config.js 会让文件监控重启无效）
      watch_delay: 60000, // 监听重启延迟 1min（确保文件传输完成再重启）
      ignore_watch: ['.DS_Store', 'logs'], // 忽略监控的文件夹

      // 4.日志
      time: true, // 是否为日志添加日期前缀
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // 日志时间格式
      out_file: './logs/pm2-access.log', // 正常日志位置
      error_file: './logs/pm2-error.log', // 异常日志位置

      // 5.控制
      autorestart: true, // 是否崩溃后自动重启
      max_restarts: 10, // 最大重启次数
      restart_delay: 5000 // 异常重启延迟 5s
    },
    {
      // 1.公共
      name: 'mqtt-broker-websocket', // 进程名称
      script: './src/index-websocket.js', // 启动 js 脚本
      port: '8083', // 启动端口
      env: { NODE_ENV: 'production' }, // 环境变量

      // 2.集群
      exec_mode: 'cluster', // 启动进程模式：默认 fork
      instances: 1, // 启动进程实例数：32 位系统单个 node 进程在占内存 0.7G、64位系统单个 node 进程在占内存 1.4G，可以启动多个进程提高系统负载（0为pm2根据cpu状态启用的最大数量进程）
      source_map_support: true, // 启用源映射文件

      // 3.文件监控（变化后重启进程）
      watch: true, // true：启用监控、[]：启用监控的文件夹（注意重复 pm2 start ecosystem.config.js 会让文件监控重启无效）
      watch_delay: 60000, // 监听重启延迟 1min（确保文件传输完成再重启）
      ignore_watch: ['.DS_Store', 'logs'], // 忽略监控的文件夹

      // 4.日志
      time: true, // 是否为日志添加日期前缀
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // 日志时间格式
      out_file: './logs/pm2-access.log', // 正常日志位置
      error_file: './logs/pm2-error.log', // 异常日志位置

      // 5.控制
      autorestart: true, // 是否崩溃后自动重启
      max_restarts: 10, // 最大重启次数
      restart_delay: 5000 // 异常重启延迟 5s
    }
  ]
}
