const fs = require("fs");

module.exports = (req, res) => {
  const id = req.url.split("/").pop();

  fs.readFile("items.json", "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ success: false, message: "Could not read file" })
      );
    }

    let items;
    try {
      items = JSON.parse(data);
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          success: false,
          message: "Invalid JSON in items.json",
        })
      );
    }

    const index = items.findIndex((i) => String(i.id) === id);

    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({ success: false, message: "Item not found" })
      );
    }

    const deleted = items.splice(index, 1)[0];

    fs.writeFile("items.json", JSON.stringify(items), (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ success: false, message: "Could not write file" })
        );
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, data: deleted }));
    });
  });
};
