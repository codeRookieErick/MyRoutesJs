const http = require('http');
const MyRouter = require("./lib/MyRouter");

let router = new MyRouter();

router.get('/test${user}/', (req, res, params, extras)=>{
    res.end('ok');
});

http.createServer((req, res)=>{
    router.handle(req, res);
}).listen(45050);