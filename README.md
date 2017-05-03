# socket.io  学习项目

>socket.io 是基于websocket实现的一种双工的TCP请求。减少了HTTP请求头的消耗。
所有请求都是事件完成，emit 出发，on监听，服务器可无障碍的相互发送

## 一、基本连接和数据的推送与接收
1. server 端 socket 的基础事件
    * Event:'connect' 客户端连接时触发
    * Event:'connection' 同上
    * Event:'disconnect' 客户端断开连接
    * Event:'error' 错误
    * Event:'disconnecting' 断开连接（当客户端断开连接，但是未离开房间）

2. client 端 socket 的基础事件
    * Event: 'connect_error' 连接错误
    * Event: 'connect_timeout' 连接超时
    * Event: 'reconnect' 成功重连
    * Event: 'reconnect_attempt' 尝试重连的时候
    * Event: 'reconnecting' 成功重连
    * Event: 'reconnect_error' 重连失败理由
    * Event: 'reconnect_failed'  Fired when couldn't reconnect within reconnectionAttempts
    * Event: 'ping'
    * Event: 'pong'
    
    
3. 自定义事件
    1. socket.emit(eventName,args,ack)
    2. socket.on(eventName,callback)

4. 简写请求
    1.socket.send([args][,ack]); 发送一个`message`事件

         
# 二、Rooms 和 NameSpaces 的组合（待续）



