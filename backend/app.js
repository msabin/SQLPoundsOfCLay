const http = require("http");
const PORT = process.env.PORT || 5000;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.sqlite');
db.run("CREATE TABLE IF NOT EXISTS artists (artistId INT, name TEXT)");
db.close();

const server = http.createServer(async (req, res) => {
    //set the request route
    if(req.method === "GET") {
        getEndpoints(req,res);
    }
    else if(req.method === "POST") {
        postEndpoints(req,res);
    }
    else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Only POST and GET requests are supported at this time.");
    }
});

function getEndpoints(req,res) {
    switch(req.url) {
        case '/':
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write("Recurse is super cool!");
            res.end();
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Route not found");
            break;
    }
}

function postEndpoints(req,res) {
    switch(req.url) {
        case '/create/artist':
            const db = new sqlite3.Database('data.sqlite');
            db.run("INSERT INTO artists (artistId, name) VALUES (1, 'Pink Floyd')");
            db.close();
            console.log(req);

            res.writeHead(201, { "Content-Type": "text/plain" });
            res.write("saved pink floyd\n");
            res.end();
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Route not found");
            break;
    }
}

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});

