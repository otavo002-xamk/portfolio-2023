const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/_api",
    createProxyMiddleware({
      target: `${process.env.REACT_APP_DBURL}`,
      changeOrigin: true,
    })
  );
};
