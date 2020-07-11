// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "init-data.json"));

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
    if (req.method === "POST" || req.method === "PUT") {
        req.body.slug = getUrlSlug(req.body.title);
    }
    next();
});

server.post("/posts/", function(req, res, next) {
    const error = validatePost(req.body);

    if(error) {
        res.status(400).send(error);
    } else {
        req.body.dateCreated = Date.now();
        next();
    }
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`API is running on port ${PORT}`);
});

// Source: https://stackoverflow.com/a/1054862
function getUrlSlug(url) {
    return url
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        .toLowerCase();
}

function getValidationFailedMessage(param) {
    return `${param} is required.`;
}

function validatePost(post) {
    if(!post.title) return getValidationFailedMessage("Title");
    if(!post.content) return getValidationFailedMessage("Content");
    return "";

}