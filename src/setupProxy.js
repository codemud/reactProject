const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(createProxyMiddleware(process.env.REACT_APP_BASE_URL,{
        target:process.env.REACT_APP_TARGET_URL,
        changeOrigin:true,
        pathRewrite :{
            [`^${process.env.REACT_APP_BASE_URL}`]:''
        }
    }))
};
