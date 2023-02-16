const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3001;
app.set("port", port);
app.get('/', function(req, res){
    res.send('server working')
});
const server = http.createServer(app);
server.listen(port, () => console.log("listening on port ", port));
