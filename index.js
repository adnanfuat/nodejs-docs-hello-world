/* eslint-disable no-undef */
const http = require('http');

const server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hey Kader!!! Node.js CALISIYOR. USTELIK GitHub destegini de yanıma aldım");
});

const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
