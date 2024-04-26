# mqtt-broker

基于 [aedes](https://github.com/moscajs/aedes) 开发的 broker，可以快速部署到任意服务器，前端推荐 [mqtt.js](https://github.com/mqttjs/MQTT.js) 作为 mqtt 客户端。

## 一.开始

个人服务器部署的 mqtt broker 访问地址如下：

- mqtt 协议：mqtt://106.15.185.226:1883
- websocket 协议：ws://106.15.185.226:8083/mqtt

## 二.脚本指令

- `npm start`：启动 mqtt broker
- `npm run start:ws`：启动 mqtt broker（websocket 协议）
- `npm run start:client`：启动 mqtt client http://localhost:8080/client.html
- `npm run start:pm2`：通过 pm2 启动生产环境服务器（该指令仅执行一次，多次运行会导致 pm2 文件监听无效）
- `npm run lint`：prettier 格式化代码 + eslint 检查代码
- `npm run commit`：commitizen 提交代码到本地仓库
- `npm run prepare`：husky 初始化运行脚本

## 三.日志

目录结构如下：

```
logs
├── mqtt_YYYY-MM-DD.log # mqtt 协议日志（按日拆分）
├── ...
├── mqtt_ws_YYYY-MM-DD.log # websocket 协议日志（按日拆分）
└── ...
```

日志格式如下：

```
[时间戳] [类型] <服务端 id | 客户端 id | 当前客户端链接数> 内容
```
