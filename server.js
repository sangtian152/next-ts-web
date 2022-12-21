const express = require('express')
const next = require('next')
const { parse } = require('url')
const createProxyMiddleware = require('http-proxy-middleware').createProxyMiddleware ;
 
const baseUrl='https://ygj.jzhangfang.com/'
 
const devProxy = {
    '/api': {
        target: baseUrl, // 端口自己配置合适的
        pathRewrite: {
            '^/api': '/'
        },
        changeOrigin: true
    }
}
 
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler();

(async () => {
    await app.prepare()
    const server = express()

    if (dev && devProxy) {
        Object.keys(devProxy).forEach((context)=> {
            server.use(createProxyMiddleware(context, devProxy[context]))
        })
    }
    
    server.all('*', (req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    })

    await server.listen(port)
    console.log(`> Ready on http://localhost:${port}`)
})()
