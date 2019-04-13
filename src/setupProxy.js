const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  const filter = (pathname, req) => pathname === '/' && req.method === 'POST';
  app.use(proxy(filter, { target: 'http://localhost:3001/' }));
};
