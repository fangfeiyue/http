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