const {createProxyMiddleware} = require('http-proxy-middleware');

const devBaseURl = "https://nspwechat-uat-2.nike.com";
const proBaseURL = "http://localhost:80";

const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURl : proBaseURL;

const BASE_URL_TAG = process.env.NODE_ENV === 'development' ? devBaseURl : proBaseURL;

const apiDimain = BASE_URL;

module.exports = function(app) {
    app.use('/api',createProxyMiddleware(
        {
            target: apiDimain,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/ambassador',createProxyMiddleware(
        {
            target: apiDimain,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/event',createProxyMiddleware(
        {
            target: apiDimain,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        },
    ));

    app.use('/article',createProxyMiddleware(
        {
            target: apiDimain,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/booking',createProxyMiddleware(
        {
            target: apiDimain,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/product',createProxyMiddleware(
        {
            target: apiDimain,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/fans',createProxyMiddleware(
        {
            target: apiDimain,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/auth',createProxyMiddleware(
        {
            target: apiDimain,
            changeOrigin: true,
            // secure: false, // 是否验证证书
            ws: true, // 启用websocket
        }
    ));

    app.use('/luckydraw',createProxyMiddleware(
        {
            target: apiDimain,
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