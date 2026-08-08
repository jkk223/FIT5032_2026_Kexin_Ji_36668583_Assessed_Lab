'use strict'

const http = require('node:http')

const port = Number(process.env.PORT) || 9000

const books = [
  { id: 1, title: 'Pride and Prejudice', author: 'Jane Austen' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'The Hobbit', author: 'J. R. R. Tolkien' },
  { id: 4, title: 'The Book Thief', author: 'Markus Zusak' },
  { id: 5, title: 'The Midnight Library', author: 'Matt Haig' }
]

const sendJson = (response, statusCode, body) => {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
    // Alibaba Cloud's default public domain forces JSON responses to download.
    // text/html keeps the test response browser-readable while the body remains JSON.
    'Content-Type': 'text/html; charset=utf-8'
  })
  response.end(JSON.stringify(body, null, 2))
}

const server = http.createServer((request, response) => {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {})
    return
  }

  if (!['GET', 'POST'].includes(request.method)) {
    sendJson(response, 405, { message: 'Method not allowed.' })
    return
  }

  sendJson(response, 200, {
    count: books.length,
    message: `There are ${books.length} books in the JSON data.`
  })
})

server.listen(port, '0.0.0.0', () => {
  console.log(`countBooks is listening on port ${port}`)
})
