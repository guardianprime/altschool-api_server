const { parse } = require("url");
const getItems = require("./handlers/getItems.js");
const createItem = require("./handlers/createItem.js");
const deleteItem = require("./handlers/deleteItem.js");

module.exports = () => {
  const parsedUrl = parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  if (pathname === "/items" && method === "GET") {
    return getItems(req, res);
  } else if (pathname === "/items" && method === "POST") {
    return createItem(req, res);
  } else if (pathname === "/items" && method === "DELETE") {
    return deleteItem(req, res);
  } else if (pathname === "/items" && method === "PUT") {
    return updateItem(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
};
