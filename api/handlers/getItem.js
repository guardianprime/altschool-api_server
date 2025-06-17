const { readFile } = require("fs");

module.exports = (req, res) => {
  const id = req.url.split("/").pop();

  readFile("items.json", "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
      return;
    }
    try {
      const items = JSON.parse(data);
      const item = items.find((item) => String(item.id) === id);
      if (item) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(item));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Item not found" }));
      }
    } catch (parseError) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Error parsing items" }));
    }
  });
};
