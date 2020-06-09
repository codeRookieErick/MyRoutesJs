module.exports = (server)=>{
    server.resetRoutes();
    server.post('/${user}:${password}/login', 
    (req, res, params, extras) => {
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end("you're epic!");
        console.log(extras);
    });

    server.error((req, res, params)=>{
        res.writeHead(200, {"Content-Type":"text/plain"});
        res.end("Page Not Found");
    });

};