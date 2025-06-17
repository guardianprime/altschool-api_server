const fs = require("fs");
const http = require("http");
const url = require("url");

const port = 8000;
const page = fs.readFileSync(`${__dirname}/index.html`, "utf-8");
const notfound = fs.readFileSync(`${__dirname}/notfound.html`, "utf-8");
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);
  if (pathname === "/index.html") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(page);
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(notfound);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log("server is running smooth....");
});
