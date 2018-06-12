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
            'Content-type': "text/javascript",
            'Cache-Control': "max-age=100000, no-cache",
            'Last-Modified': "123",
            'Etag': "77777"
        })

        const etag = request.headers['If-none-match']
        if (etag === '77777') {
            response.writeHead(304, {
                'Content-type': "text/javascript",
                'Cache-Control': "max-age=100000, no-cache",
                'Last-Modified': "123",
                'Etag': "77777"
            })

            response.end('')
        }else {
            response.writeHead(200, {
                'Content-type': "text/javascript",
                'Cache-Control': "max-age=100000, no-cache",
                'Last-Modified': "123",
                'Etag': "77777"
            })

            response.end('console.log("script loaded")')
        }

    }
})).listen(8888)

console.log('server listening on 8888')