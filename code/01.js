const http = require('http')

http.createServer(((request, response) => {
    console.log(request.url)
    response.end('123')
})).listen(8888)

console.log('server listening on 8888')