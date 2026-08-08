# FIT5032 Lab 9.1 cloud function

The `count-books` folder is ready for Alibaba Cloud Function Compute. It uses a
Node.js custom runtime, starts with `node server.js`, and listens on port `9000`.

The function contains five books in JSON data and returns their count:

```json
{
  "count": 5,
  "message": "There are 5 books in the JSON data."
}
```

## Deployment

Upload `count-books-upload.zip` to the existing `countBooks` function and use:

```text
Runtime: Node.js 20 Custom Runtime
Start command: node server.js
Listening port: 9000
Request methods: GET, POST, OPTIONS
```

The response includes CORS headers and uses `Content-Type: text/html` while
returning a JSON body. Alibaba Cloud recommends this response type for quick
testing because its default public domain otherwise forces ordinary JSON
responses to download. The Vue page parses the returned JSON text before reading
the `count` field.

The Vue page uses this endpoint:

```text
https://countbooks-gtkhftqfhf.cn-hangzhou.fcapp.run
```
