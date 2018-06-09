# 项目描述
掌握HTTP协议是Web开发最基础的一环，然而很多程序猿对于HTTP协议基本不了解，或者只了解其中狭小的一部分，导致很多程序猿无法快速成长，陷入重复coding的地狱。这个项目从原理到实践，用完整的例子展示HTTP协议的各个环节，包含网络分层模型、TCP和HTTP的关系、HTTP数据包构成、头行信息的定义、数据传输类型、缓存和资源校验、Cookie和Session、各种非常有意义的Header、Nginx使用和代理、缓存配置、HTTPS服务的意义和使用、HTTP2的定义和实现等，帮助您提高对HTTP内容的理解，快速成长。

## 内容介绍
![http请求的完整过程](https://github.com/fangfeiyue/http/blob/master/imgs/http.png)

## 五层网络模型介绍
![经典五层模型](https://github.com/fangfeiyue/http/blob/master/imgs/netmodel.png)
### 低三层
- 物理层主要作用是定义物理设备如何传输数据
- 数据链路层在通信的实体间建立数据链路连接
- 网络层为数据在结点之间传输创建逻辑链路
### 传输层
- 向用户提供可靠的端到端的服务
- 传输层向高层屏蔽了下层数据通信的细节
### 应用层
- 为应用软件提供了很多服务
- 构建于TCP协议之上
- 屏蔽了网络传输相关细节
## HTTP协议的发展历史
### HTTP/0.9
- 只有一个GET命令
- 没有HEADER等描述数据的信息
- 服务器发送完毕，就关闭TCP连接，注意：一个TCP连接可以对应多个HTTP请求
### HTTP/1.0
- 增加了很多命令
- 增加了status code和header
- 多字符集的支持、多部分发送、权限、缓存等
### HTTP/1.1
- 持久连接
- pipeline
- 增加host和其他一些命令
### HTTP/2
- 所有数据以二进制进行传输，HTTP1.1大部分数据是通过字符串传输的
- 同一个连接里面发送多个请求不再需要按照顺序来
- 头信息压缩以及推送等提高效率的功能
### HTTP的三次握手
![HTTP的三次握手](https://github.com/fangfeiyue/http/blob/master/imgs/tcpconnection.png)
HTTP不存在连接这个概念，它只要请求和响应这么一个概念，请求和响应都是数据包它们之间是要通过一个数据传输的通道的，就在TCP里面创建了一个从客户端发起到服务端的连接
![HTTP的三次握手](https://github.com/fangfeiyue/http/blob/master/imgs/three.png)

## 传说中的彩蛋
- Mac系统如何“剪切-粘贴”文件
想要“剪切-粘贴”文件，先选定要剪切的文件，按command+c，然后到要粘贴的文件夹中按option+command+v，就可以实现“剪切-粘贴”