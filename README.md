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

为什么需要三次握手？

为了防止服务端开启一些无用的连接,造成浪费。因为网络传输是有延迟的。如果客户端发起连接请求服务端就直接创建了连接返回内容给客户端，但因为某种原因造成数据包丢失，客户端就会一直没有接受到服务器返回的数据，客户端可能设置了超时就关闭了，客户端再发起一个新的创建连接的请求，这个时候服务端是不知道客户端是否接受到服务端第一次返回的信息，服务端的端口就会一直开着等着客户端发送请求数据，这个时候服务端的开销就浪费了。
## URI、URL和URN
- URI 统一资源标志符，包含URL、URN
- URL 统一资源定位符
- URN 永久统一资源定位符
## HTTP报文格式
![HTTP的三次握手](https://github.com/fangfeiyue/http/blob/master/imgs/baowen.png)
### HTTP code 
- 定义服务器对请求的处理结果
- 各个区间的code有各自的语义
- 好的http服务可以通过code的判断结果
## 认识HTTP客户端
- curl命令是一个利用URL规则在命令行下工作的文件传输工具。它支持文件的上传和下载，所以是综合传输工具，但按传统，习惯称curl为下载工具。作为一款强力工具，curl支持包括HTTP、HTTPS、ftp等众多协议，还支持POST、cookies、认证、从指定偏移处下载部分文件、用户代理字符串、限速、文件大小、进度条等特征。做网页处理流程和数据检索自动化，curl可以祝一臂之力。
```
curl baidu.com
curl www.baidu.com
curl -v www.baidu.com
```
## CORS跨域请求的限制与解决
浏览器在发送请求的时候并不知道是否跨域，所以请求是可以发出的，也会接收服务端返回的内容，只不过浏览器在看到response header里没有Access-Control-Allow-Origin这个属性并且设置为允许，浏览器会把请求返回的内容忽略掉并且在console里面报错`No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8888' is therefore not allowed access.`

## CORS跨域限制以及预请求验证
### CORS跨域限制
- 默认允许的方法
    - GET
    - POST
    - HEAD
- 允许Content-Type
    - text/plain
    - multipart/from-data
    - application/x-www-form-urlencoded
- 其他限制
    - 请求头限制
    - XMLHttpRequestUpload对象均没有注册任何事件监听器
    - 请求中没有使用ReadableStream对象
- 突破跨域限制的几种方法
    - 'Access-Control-Allow-Origin': '*'
    - 'Access-Control-Allow-Headers': 'X-Test-Cors'
    - 'Access-Control-Allow-Methods': 'POST, PUT, Delete'
    - 'Access-Control-Max-Age': '100', //代表多少秒内以以上方式进行跨域请求操作不用再发送预请求进行验证

具体实例
```
const http = require('http')

http.createServer((request, response) => {
    console.log(request.url);
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Test-Cors',
        'Access-Control-Allow-Methods': 'POST, PUT, Delete',
        'Access-Control-Max-Age': '100', //代表多少秒
    })
    response.end('2222')
}).listen(8887)

console.log('server listening 8887');
```
### 预请求验证
跨域限制是为了保证服务端安全，浏览器在发送跨域请求时会先发送一个options请求来获得服务端允许的认可，然后再实际发送对应的请求(如post， get等)

![预请求](https://github.com/fangfeiyue/http/blob/master/imgs/options.png)

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。具体描述详见[HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

## 传说中的彩蛋
- Mac系统如何“剪切-粘贴”文件
想要“剪切-粘贴”文件，先选定要剪切的文件，按command+c，然后到要粘贴的文件夹中按option+command+v，就可以实现“剪切-粘贴”