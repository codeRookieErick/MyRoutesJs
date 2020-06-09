
module.exports = function(){
    this.modules = [];
    this.watch = (modulePath, callBack = null)=>{
        let moduleFullPath = require('path').resolve(`${modulePath}.js`)
        let checkForChanges = ()=>{
            if(!(this.modules[modulePath] === undefined)){
                //console.log(require.resolve(moduleFullPath))
                delete require.cache[require.resolve(moduleFullPath)];
            }
            let mod = require(moduleFullPath);
            this.modules[modulePath] = mod;
            if(callBack != null) callBack(mod);
        };
        
        require('fs').watchFile(moduleFullPath, {interval:1000}, (current, previows)=>{
            checkForChanges();
        });
        checkForChanges();
    };
}