import {createProxyMiddleware} from  'http-proxy-middleware';

// import {BASE_URL} from "src/server/config";

const apiDimain = "https://nspwechat-uat-2.nike.com";

module.exports = function(app) {
    // app.use(createProxyMiddleware('/api',
    //     {
    //         target: apiDimain,
    //         pathRewrite: {
    //             '^/api': `/api/`,
    //         },
    //         changeOrigin: true,
    //         // secure: false, // 是否验证证书
    //         ws: true, // 启用websocket
    //     }
    // ));
    //
    // app.use(createProxyMiddleware('/ambassador',
    //     {
    //         target: apiDimain,
    //         pathRewrite: {
    //             '^/ambassador': `${apiDomain}/ambassador/`,
    //         },
    //         changeOrigin: true,
    //         // secure: false, // 是否验证证书
    //         ws: true, // 启用websocket
    //     }
    // ));
    //
    // app.use(createProxyMiddleware('/event',
    //     {
    //         target: apiDimain,
    //         pathRewrite: {
    //             '^/event': `${apiDomain}/event/`,
    //         },
    //         changeOrigin: true,
    //         // secure: false, // 是否验证证书
    //         ws: true, // 启用websocket
    //     },
    // ));
    //
    // app.use(createProxyMiddleware('/article',
    //     {
    //         target: apiDimain,
    //         pathRewrite: {
    //             '^/article': `${apiDomain}/article/`,
    //         },
    //         changeOrigin: true,
    //         // secure: false, // 是否验证证书
    //         ws: true, // 启用websocket
    //     }
    // ));
    //
    // app.use(createProxyMiddleware('/booking',
    //     {
    //         target: apiDimain,
    //         pathRewrite: {
    //             '^/booking': `${apiDomain}/booking/`,
    //         },
    //         changeOrigin: true,
    //         // secure: false, // 是否验证证书
    //         ws: true, // 启用websocket
    //     }
    // ));
    //
    // app.use(createProxyMiddleware('/product',
    //     {
    //         target: apiDimain,
    //         pathRewrite: {
    //             '^/product': `${apiDomain}/product/`,
    //         },
    //         changeOrigin: true,
    //         // secure: false, // 是否验证证书
    //         ws: true, // 启用websocket
    //     }
    // ));

    app.use(createProxyMiddleware('/fans',
        {
            target: apiDimain,
            pathRewrite: {
                '/fans': '/fans/',
            },
            changeOrigin: true,
            // secure: false, // 是否验证证书
            // ws: true, // 启用websocket
        }
    ));

    // app.use(createProxyMiddleware('/auth',
    //     {
    //         target: apiDimain,
    //         pathRewrite: {
    //             '^/auth': `${apiDomain}/auth/`,
    //         },
    //         changeOrigin: true,
    //         // secure: false, // 是否验证证书
    //         ws: true, // 启用websocket
    //     }
    // ));

    // app.use(createProxyMiddleware('/luckydraw',
    //     {
    //         target: apiDimain,
    //         pathRewrite: {
    //             '^/luckydraw': `${apiDomain}/luckydraw/`,
    //         },
    //         changeOrigin: true,
    //         // secure: false, // 是否验证证书
    //         ws: true, // 启用websocket
    //     }
    // ));

    app.listen(3000);
}