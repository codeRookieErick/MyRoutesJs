
let pattern = /\$\{([\w\d\_]+)\}/;
exports.testUrl = (url, candidate) =>{
    //console.log(url);
    let parts = [];
    let keys = [];
    let res = null;
    while((res = pattern.exec(url)) != null){
        parts[parts.length] = url.substring(0, res.index);
        url = url.substring(res.index+res[0].length);
        keys[keys.length] = res[1];
    }
    parts[parts.length] = url;

    if(parts.length == 0) return {'result' : false, 'params' : null};

    //console.log(parts);
    
    let result = {};
    let token = parts.shift();
    let tokenIndex = candidate.search(token);
    candidate = candidate.substring(tokenIndex + token.length);

    while(parts.length > 0 && keys.length > 0){
        if(tokenIndex == -1) return {'result' : false, 'params' : result};
        token = parts.shift();
        tokenIndex = candidate.search(token);
        result[keys.shift()] = candidate.substring(0, tokenIndex);
        candidate = candidate.substring(tokenIndex + token.length);
    }

    return {
        'result' : candidate.length == 0,
        'params' : result
    };    
};

//console.log(testUrl('/args', '/args'));