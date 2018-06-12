const fs = require('fs')
const http = require('http')

http.createServer(((request, response) => {
    if (request.url == '/') {
        const html = fs.readFileSync('index.html', 'utf8')
        response.writeHead(200, {
            'Content-type': 'text/html'
        })

        response.end(html)
    }else if (request.url == '/script.js') {
        response.writeHead(200, {
            'Content-type': 'text/javascript',
            'Cache-Control': 'max-age=10000'
        })
    }
})).listen(8888)

console.log('server listening on 8888')