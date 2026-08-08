# FIT5032 Assessed Lab 9.1 完成与截图清单

本项目完成 Pass/Credit 等级的 Task 9.1。

## 已完成内容

- 已在阿里云 Function Compute 创建并部署 `countBooks`。
- 本地云函数源代码位于 `cloud-functions/count-books/server.js`。
- 可重新上传的压缩包为 `cloud-functions/count-books-upload.zip`。
- Vue 页面位于 `src/views/GetBookCountView.vue`，路由为 `/get-book-count`。
- 页面通过 Axios 调用阿里云函数，并显示 JSON 数据中的图书数量。

## 需要重新部署的原因

当前线上函数响应带有 `Content-Disposition: attachment`，浏览器会尝试下载
JSON。阿里云默认 `fcapp.run` 域名会拦截相关跳转，产生
`ExternalRedirectForbidden` 和 HTTP 400。

本地上传包已经按照阿里云测试方案将响应类型改为 `Content-Type: text/html`，
同时仍返回合法 JSON 文本。Vue 页面也已支持解析该文本。请在阿里云控制台
将 `cloud-functions/count-books-upload.zip` 重新上传至现有 `countBooks` 函数并
部署。

部署设置：

```text
Runtime: Node.js 20 Custom Runtime
Start command: node server.js
Listening port: 9000
Request methods: GET, POST, OPTIONS
```

重新部署后，在浏览器刷新以下地址：

```text
https://countbooks-gtkhftqfhf.cn-hangzhou.fcapp.run
```

正确结果应直接显示：

```json
{
  "count": 5,
  "message": "There are 5 books in the JSON data."
}
```

## 运行 Vue 项目

在 `FIT5032-Lab5` 文件夹运行：

```powershell
npm run dev
```

打开：

```text
http://localhost:5173/get-book-count
```

页面应显示数字 `5` 和信息 `There are 5 books in the JSON data.`。

## 最终截图清单

### Screenshot Set 1 - 云函数

1. 阿里云函数详情或触发器页面：清楚显示阿里云、函数名 `countBooks`、公网
   地址和右上角个人账号。
2. 阿里云在线测试成功页面：清楚显示“执行成功”、`count: 5` 和个人账号。

### Screenshot Set 2 - 运行项目

1. 浏览器完整窗口：地址栏、`Book Counter`、按钮、数字 `5` 和返回信息均
   清晰可见。
2. 可选增强证据：VS Code 显示 `GetBookCountView.vue` 的 Axios 调用，同时
   终端显示 Vite 项目正在运行。

截图中不要显示密码、访问密钥或其他敏感信息。所有最终截图完成后再生成
单一黑白 PDF 报告。
