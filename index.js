const path = require("path");
const router = require("./router.js");

const PORT = 4000;
const HOST = "localhost";

const server = require("http").createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
