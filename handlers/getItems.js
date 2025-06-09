const fs = require("fs");
module.exports = (req, res) => {
  fs.readFile("items.json", "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  });
};
