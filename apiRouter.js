const getItems = require("./handlers/getItems");
const createItem = require("./handlers/createItem");

function router(req, res) {
  const method = req.method;
  const url = req.url;

  if (url === "/items" && method === "GET") {
    getItems(req, res);
  } else if (url === "/items" && method === "POST") {
    createItem(req, res);
  } else if (url.startsWith("/items/") && method === "PUT") {
    updateItem(req, res);
  } else if (url.startsWith("/items/") && method === "GET") {
    s;
    getItem(req, res);
  } else if (url.startsWith("/items/") && method === "DELETE") {
    deleteItem(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "ROUTE Not Found" }));
  }
}

module.exports = router;
