const {createProxyMiddleware} = require('http-proxy-middleware');

const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PROXY_ALL : process.env.REACT_APP_PROXY;

const BASE_URL_TAG = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PROXY_ALL  : process.env.REACT_APP_PROXY_TAG;

module.exports = function(app) {
    app.use('/api',createProxyMiddleware(
        {
            target: BASE_URL,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/ambassador',createProxyMiddleware(
        {
            target: BASE_URL,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/event',createProxyMiddleware(
        {
            target: BASE_URL,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        },
    ));

    app.use('/article',createProxyMiddleware(
        {
            target: BASE_URL,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/booking',createProxyMiddleware(
        {
            target: BASE_URL,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/product',createProxyMiddleware(
        {
            target: BASE_URL,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/fans',createProxyMiddleware(
        {
            target: BASE_URL,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/auth',createProxyMiddleware(
        {
            target: BASE_URL,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/luckydraw',createProxyMiddleware(
        {
            target: BASE_URL,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/tag',createProxyMiddleware(
        {
            target: BASE_URL_TAG,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));
}