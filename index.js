const http = require("http");
const router = require("./apiRouter.js");

const PORT = 4000;
const HOST = "localhost";

const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, HOST, () => {
  console.log("server is running");
});
