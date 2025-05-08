const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/_api", "/nasa_api"],
    createProxyMiddleware({
      target: `${process.env.REACT_APP_BACKEND_URL}`,
      changeOrigin: true,
    })
  );
};
