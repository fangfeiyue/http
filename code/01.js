const http = require('http')
const fs = require('fs')

http.createServer(((request, response) => {

    if (request.url == '/') {
        const html = fs.readFileSync('test.html', 'utf8')
        response.writeHead(200, {
            'Content-type': 'text/html'
        })

        response.end(html)
    }else if (request.url == '/script.js') {
        response.writeHead(200, {
            'Content-type': 'text/javascript',
            'Cache-Control': 'max-age=10'
        })

        response.end('console.log("script loaded")')
    }
})).listen(8888)

console.log('server listening on 8888')