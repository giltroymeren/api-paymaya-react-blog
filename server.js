// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('init-data.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.get('/echo', (req, res) => {
    res.jsonp(req.query);
})

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now();
    }
    // Continue to JSON Server router
    next();
})

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
    console.log('JSON Server is running...');
});

// Source: https://stackoverflow.com/a/1054862
function getUrlSlug(url) {
    return url
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        .toLowerCase();
}