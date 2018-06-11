const http = require('http')

http.createServer((request, response) => {
    console.log(request.url);
    // response.writeHead(200, {
    //     'Access-Control-Allow-Origin': '*'
    // })
    response.end('2222')
}).listen(8887)

console.log('server listening 8887');