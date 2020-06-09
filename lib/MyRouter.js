const qs = require('querystring');
const url = require('url');
const testUrl = require('./testUrl');


module.exports = function(){
    this.handleRequest = function(req, res, params){
        console.log(this.handlers);
        for(i in this.handlers){
            this.handlers[i](req, res, params);
        }
        let urls = Object.keys(this.routes).map(r => { return {'route':r, 'result':testUrl.testUrl(r, req.url)}; });
        let matchinUrls = urls.filter(u => u.result.result);
        let success = false;
        if(matchinUrls.length > 0){
            res.writeHead(200, {'Content-Type':'text/json'});
            this.routes[matchinUrls[0].route].handler(req, res, params, matchinUrls[0].result.params);
        }else{
            res.writeHead(404, {'Content-Type':'text/plain'});
            for(let index in this.errorRoutes){
                this.errorRoutes[index](req, res, params);
            }
            res.end();
        }
    };

    this.addHandler = (handler)=>{
        this.handlers[this.handlers.length] = handler;
    };

    this.handlers = [];
    this.routes = {};
    this.errorRoutes = [];

    this.resetRoutes = ()=>{
        this.handlers = [];
        this.routes = {};
        this.errorRoutes = [];
    };

    this.post = (path, handler)=>{
        this.routes[path] = {'method':'POST', 'handler':handler};
    };

    this.get = (path, handler)=>{
        this.routes[path] = {'method':'GET', 'handler':handler};
    };
    
    this.error = (handler)=>{
        this.errorRoutes[this.errorRoutes.length] = handler;
    };

    this.handle = function(req, res){
        let params = null;
        if(req.method == 'POST'){
            let data = '';
            req.on('data', (d)=>{
                data+=d;
            });
            req.on('end', ()=>{
                params = qs.parse(data);
                this.handleRequest(req, res, params);
            });   
        }else if(req.method == "GET"){
            req.on('data', (data)=>{});
            req.on('end', ()=>{
                params = url.parse(req.url, true).query;
                this.handleRequest(req, res, params);
            });
        }
    }
};

