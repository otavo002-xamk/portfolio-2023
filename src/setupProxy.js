const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const isDev =
    !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "development";

  isDev &&
    app.use(
      "/_api",
      createProxyMiddleware({
        target: `${process.env.REACT_APP_DBURL}`,
        changeOrigin: true,
      })
    );
};
