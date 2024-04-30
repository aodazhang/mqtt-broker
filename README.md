# mqtt-broker

基于 [aedes](https://github.com/moscajs/aedes) 开发的 broker，可以快速部署到任意服务器，前端推荐 [mqtt.js](https://github.com/mqttjs/MQTT.js) 作为 mqtt 客户端。

## 一.开始

个人部署的 mqtt broker 访问地址如下：

- mqtt 协议：mqtt://106.15.185.226:1883
- websocket 协议：wss://api.aodazhang.com/mqtt

可通过在线 [client](https://project.aodazhang.com/mqtt-client/) 体验。

## 二.脚本指令

- `npm start`：启动 mqtt broker
- `npm run start:wss`：启动 mqtt broker（websocket 协议）
- `npm run start:client1`：启动 mqtt web client https://localhost:8080/client.html
- `npm run start:client2`：启动 mqtt node client
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

## 四.密码工具

### ssh-keygen

一般用于生成和管理 SSH 密钥对，可生成 RSA、DSA、ECDSA、Ed25519 密钥。

```shell
# 生成一个 ssh 密钥（默认输出在 ~/.ssh 目录，id_rsa.pub 公钥、id_rsa 私钥）
# -t：算法
# -c：个人标识
ssh-keygen -t rsa -C "aodazhang@qq.com"
```

### openssl

通用密码工具，可生成 SSL/TLS 证书、密钥、摘要和数字签名等。

```shell
# 生成 RSA 私钥 + 自签名 X.509 证书
# req: 使用 OpenSSL 的证书请求功能
# -newkey: 私钥算法与长度
# -new: 创建一个新的证书请求
# -nodes: 私钥不加密
# -x509: 生成自签名证书
# -days: 设置证书有效期
# -keyout: 指定私钥的输出文件名
# -out: 指定证书的输出文件名
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout ./cert/key.pem -out ./cert/cert.pem
```
