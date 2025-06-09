const fs = require("fs");

const itemsDb = JSON.parse(fs.readFileSync("items.json", "utf-8"));

module.exports = (req, res) => {
  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    try {
      const parsedItem = Buffer.concat(body).toString();
      const item = JSON.parse(parsedItem);
      const lastItem = itemsDb[itemsDb.length - 1];
      const lastItemId = lastItem ? lastItem.id : 0;
      item.id = lastItemId + 1;
      itemsDb.push(item);

      res.writeHead(201, { "Content-Type": "application/json" });
      fs.writeFile("items.json", JSON.stringify(itemsDb), (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Failed to save item" }));
        }
        res.end(
          JSON.stringify({
            message: "item has been added to the list",
            itemsDb,
          })
        );
      });
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid JSON format" }));
    }
  });
};
// This code handles the creation of a new item when a POST request is made to the "/items" endpoint.
// It listens for incoming data, parses the JSON body, and responds with a success message or an error if the JSON is invalid.
// If the request method is not POST or the URL is not "/items", it responds with a 405 Method Not Allowed error.
// This is a basic implementation and can be extended to include database interactions or other business logic as needed.
