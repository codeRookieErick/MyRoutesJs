const MyRouter = require("./lib/MyRouter");
const MyModuleWatcher = require("./lib/MyModuleWatcher");

const watcher = new  MyModuleWatcher();

server = new MyRouter();
watcher.watch("app", (app) => app(server));
server.listen(8084);